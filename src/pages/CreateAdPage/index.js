import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { Form, InputNumber, Select, Upload, Tooltip } from 'antd'
import ImgCrop from 'antd-img-crop'
import axios from 'axios'
import requester from '../../factories'

import './index.css'

const { Dragger } = Upload
const { Option } = Select

const AdPage = ({ history, isViewing }) => {
  const alert = useAlert()
  const [form] = Form.useForm()

  const [mainPhotoSrc, setMainPhotoSrc] = useState()
  const [mainPhotoFile, setMainPhotoFile] = useState()
  const [ad, setAd] = useState()

  const adId = history.location.pathname.split('/')[2]

  useEffect(() => {
    const backgroundImage = require('../../assets/images/settings-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  useEffect(() => {
    const fetchAd = async () => {
      const data = await requester(`GET`, `${process.env.REACT_APP_API_BACKEND_URL}/houses/${adId}`)

      if (!data) history.push('/404')

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
              <Form.Item
                name="location"
                rules={[{ required: true, message: renderTooltip('Location address is required') }]}
              >
                <input disabled={isViewing} type="text" placeholder="Add location" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[{ required: true, message: renderTooltip('Phone number is required') }]}
              >
                <input disabled={isViewing} type="text" placeholder="Add your phone number" />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[{ required: true, message: renderTooltip('Description is required') }]}
              >
                <input disabled={isViewing} type="text" placeholder="Add small description" />
              </Form.Item>
            </div>
          </div>
          <div className={`secondary-info ${isViewing && 'viewing-inputs'}`}>
            {!isViewing ? (
              <>
                <Form.Item
                  name="houseType"
                  rules={[{ required: true, message: renderTooltip('House type is required') }]}
                >
                  <Select placeholder="House type" allowClear>
                    <Option value="plot">Plot</Option>
                    <Option value="townhouse">Townhouse</Option>
                    <Option value="cottage">Cottage</Option>
                    <Option value="quadrex">Quadrex</Option>
                    <Option value="duplex">Duplex</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="squares" rules={[{ required: true, message: renderTooltip('Squares are required') }]}>
                  <InputNumber min={1} max={99999} placeholder="Squares" />
                </Form.Item>
                <Form.Item name="price" rules={[{ required: true, message: renderTooltip('Price is required') }]}>
                  <InputNumber
                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    min={1}
                    max={999999}
                    placeholder="Your price"
                  />
                </Form.Item>
              </>
            ) : (
              <div>
                <input value={`House type: ${ad?.houseType}`} readOnly />
                <input value={`Squares: ${ad?.squares}`} readOnly />
                <input value={`Price: ${ad?.price}$`} readOnly />
              </div>
            )}
          </div>
          {!isViewing && <button className="publicate-btn">{ad ? 'Change' : 'Publicate'}</button>}
        </div>
      </Form>
    </div>
  )
}

export default AdPage
