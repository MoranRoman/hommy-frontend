import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Form, Select, Upload, Tooltip, Modal, Input } from 'antd'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'

import requester from '../../factories'
import MapPicker from '../../components/MapPicker'

import './index.css'

const { Dragger } = Upload
const { Option } = Select

const AdPage = ({ history, isViewing }) => {
  const alert = useAlert()
  const [form] = Form.useForm()

  const [mainPhotoSrc, setMainPhotoSrc] = useState()
  const [mainPhotoFile, setMainPhotoFile] = useState()
  const [ad, setAd] = useState()
  const [location, setLocation] = useState('Location')
  const [currentPos, setCurrentPos] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const adId = history.location.pathname.split('/')[2]

  useEffect(() => {
    const backgroundImage = require('../../assets/images/settings-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  useEffect(() => {
    const fetchAd = async () => {
      const data = await requester(`GET`, `${process.env.REACT_APP_API_BACKEND_URL}/houses/${adId}`)

      if (!data) history.push('/404')

      setLocation(data?.location)
      setAd(data)
    }

    if (adId) fetchAd()
    else setAd(null)
    // eslint-disable-next-line
  }, [adId])

  useEffect(() => {
    if (ad) form.setFieldsValue(ad)
    else form.resetFields()
  }, [ad, form])

  const handleSubmit = async (e) => {
    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: JSON.parse(localStorage.getItem('tokens')).accessToken,
        },
      }

      const formData = new FormData()
      formData.append('housePhoto', mainPhotoFile)
      formData.append('waterSupply', e.waterSupply)
      formData.append('heating', e.heating)
      formData.append('warming', e.warming)
      formData.append('description', e.description)
      formData.append('houseType', e.houseType)
      formData.append('location', e.location)
      formData.append('phoneNumber', e.phoneNumber)
      formData.append('price', e.price)
      formData.append('squares', e.squares)

      if (ad) await axios.patch(`${process.env.REACT_APP_API_BACKEND_URL}/houses/${adId}`, formData, config)
      else {
        await axios.post(`${process.env.REACT_APP_API_BACKEND_URL}/houses`, formData, config)
        history.push('/my-advertisements')
      }

      alert.success('Success')
    } catch (e) {
      console.log(e)
      alert.error('Something went wrong')
    }
  }

  const renderTooltip = (message) => <Tooltip visible title={message} />

  const handleOkModal = async () => {
    const address = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPos[0]},${currentPos[1]}&key=${process.env.REACT_APP_GOOGLE_API_KEY}&result_type=street_address`,
    )
    const mainAddress = address?.data?.results[0]?.address_components
    const country = mainAddress?.filter((e) => e.types.includes('country'))[0]?.long_name
    const state = mainAddress?.filter(
      (e) => e.types.includes('administrative_area_level_1') || e.types.includes('administrative_area_level_2'),
    )[0]?.long_name
    const city = mainAddress?.filter((e) => e.types.includes('locality'))[0]?.long_name
    const district = mainAddress?.filter(
      (e) => e.types.includes('sublocality_level_1') || e.types.includes('sublocality_level_2'),
    )[0]?.long_name
    const street = mainAddress?.filter((e) => e.types.includes('route'))[0]?.long_name
    const houseNumber = mainAddress?.filter((e) => e.types.includes('street_number'))[0]?.long_name
    if (!country || !state || !city || !street || !houseNumber) {
      alert.error('Location invalid. Try again')
    } else {
      setLocation([country, state, city, district, street, houseNumber].join(', '))
      setIsModalVisible(false)
    }
    form.setFieldsValue({ location: [country, state, city, district, street, houseNumber].join(', ') })
  }

  const handleCancelModal = () => {
    setIsModalVisible(false)
  }
  const addLocation = () => {
    if (!isViewing) setIsModalVisible(true)
  }

  const props = {
    name: 'mainPhoto',
    multiple: false,
    fileList: [],
    beforeUpload: (file) => {
      const reader = new FileReader()

      reader.onload = ({ target }) => {
        setMainPhotoSrc(target.result)
        setMainPhotoFile(file)
      }

      reader.readAsDataURL(file)
      return false
    },
  }

  return (
    <div className={`add-ad-global ${window.innerWidth <= 1100 ? 'ad-add-main-sm' : 'ad-add-main'}`}>
      <Modal title="Add location" visible={isModalVisible} onOk={handleOkModal} onCancel={handleCancelModal}>
        <MapPicker currentPos={currentPos} setCurrentPos={setCurrentPos} />
      </Modal>
      <h2 className="ad-add-title">
        {isViewing ? 'View an advertisement' : ad ? 'Update an advertisement' : 'Create an advertisement'}
      </h2>
      <Form form={form} onFinish={handleSubmit} style={{ width: '90%', height: '90%' }}>
        <div className="ad-add-content">
          <div className="main-photo-main-info">
            <div
              className={`main-photo ${
                isViewing ? '' : !ad?.photoUrl?.length && !mainPhotoSrc ? 'border-5px' : 'main-photo-border-hover'
              } ${window.innerWidth <= 800 && 'width-100-percent'}`}
            >
              {!isViewing ? (
                <ImgCrop rotate>
                  <Dragger {...props}>
                    {!ad?.photoUrl?.length && !mainPhotoSrc ? (
                      <>
                        <img src={require('../../assets/images/union.svg')} width="60" height="60" alt="" />
                        <h2>Add a main photo</h2>
                      </>
                    ) : (
                      <img alt="" className="main-photo-img" src={mainPhotoSrc || ad?.photoUrl[0]} />
                    )}
                  </Dragger>
                </ImgCrop>
              ) : (
                <img
                  alt=""
                  className="main-photo-img"
                  src={ad?.photoUrl[0] || require('../../assets/images/home_house_3526.ico')}
                />
              )}
            </div>
            <div className={`main-info ${window.innerWidth <= 800 && 'width-100-percent'}`}>
              <div className="main-info-input" onClick={addLocation}>
                <div>
                  <img src={require('../../assets/images/red-plus.svg')} width="30" height="30" alt="" />
                </div>
                <Form.Item
                  name="location"
                  rules={[{ required: true, message: renderTooltip('Location address is required') }]}
                >
                  <Tooltip title={location}>
                    <div className="text-location">
                      <span>{location}</span>
                    </div>
                  </Tooltip>
                </Form.Item>
              </div>
              <div className="main-info-input">
                <div>
                  <img src={require('../../assets/images/red-plus.svg')} width="30" height="30" alt="" />
                </div>
                <Form.Item
                  name="phoneNumber"
                  rules={[{ required: true, message: renderTooltip('Phone number is required') }]}
                >
                  <input disabled={isViewing} type="text" placeholder="Phone number" />
                </Form.Item>
              </div>
              <div className="main-info-input">
                <div>
                  <img src={require('../../assets/images/red-plus.svg')} width="30" height="30" alt="" />
                </div>
                <Form.Item
                  name="description"
                  rules={[{ required: true, message: renderTooltip('Description is required') }]}
                >
                  <input disabled={isViewing} type="text" placeholder="Description" />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className="secondary-info">
            <Form.Item name="houseType" rules={[{ required: true, message: renderTooltip('House type is required') }]}>
              <Select placeholder="House type" allowClear disabled={isViewing}>
                <Option value="Plot">Plot</Option>
                <Option value="Townhouse">Townhouse</Option>
                <Option value="Cottage">Cottage</Option>
                <Option value="Quadrex">Quadrex</Option>
                <Option value="Duplex">Duplex</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="waterSupply"
              rules={[{ required: true, message: renderTooltip('Water supply is required') }]}
            >
              <Select placeholder="Water supply" allowClear disabled={isViewing}>
                <Option value="Centralized">Centralized</Option>
                <Option value="Individual">Individual</Option>
              </Select>
            </Form.Item>
            <Form.Item name="heating" rules={[{ required: true, message: renderTooltip('Heating is required') }]}>
              <Select placeholder="Heating" allowClear disabled={isViewing}>
                <Option value="A Gas Boiler">A Gas Boiler</Option>
                <Option value="Solid fuel Boiler">Solid fuel Boiler</Option>
              </Select>
            </Form.Item>
            <Form.Item name="warming" rules={[{ required: true, message: renderTooltip('Warming is required') }]}>
              <Select placeholder="Warming" allowClear disabled={isViewing}>
                <Option value="Thermoblock">Thermoblock</Option>
                <Option value="Basalt Wool">Basalt Wool</Option>
                <Option value="Styrofoam">Styrofoam</Option>
              </Select>
            </Form.Item>
            <Form.Item name="squares" rules={[{ required: true, message: renderTooltip('Squares are required') }]}>
              <Input placeholder="Squares" disabled={isViewing} />
            </Form.Item>
            <Form.Item name="price" rules={[{ required: true, message: renderTooltip('Price is required') }]}>
              <Input placeholder="Your price" disabled={isViewing} />
            </Form.Item>
          </div>
          {!isViewing && <button className="publicate-btn">{ad ? 'Update' : 'Publicate'}</button>}
        </div>
      </Form>
    </div>
  )
}

export default AdPage
