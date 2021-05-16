import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Upload, notification, Input, Select, Form } from 'antd'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'

import { setNewUserPhoto, signOut } from '../../actions/userFlow'
import requester from '../../factories'

import './index.css'

const { TextArea } = Input
const { Option } = Select

const SettingsPage = () => {
  const [form] = Form.useForm()
  const alert = useAlert()
  const user = useSelector(({ userInfo }) => userInfo)
  const dispatch = useDispatch()
  const history = useHistory()

  const [currentCountry, setCurrentCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [valueBio, setValueBio] = useState(user.bio || '')
  const [loading, setLoading] = useState(false)

  async function fetchStates(country) {
    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states`, {
      headers: { 'X-CSCAPI-KEY': process.env.REACT_APP_API_COUNTRY_KEY },
    })
    setStates(response.data)
  }

  async function fetchCities(state, country) {
    const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`, {
      headers: { 'X-CSCAPI-KEY': process.env.REACT_APP_API_COUNTRY_KEY },
    })
    setCities(response.data)
  }

  const onCountryChange = (country) => {
    form.setFieldsValue({ region: '' })
    form.setFieldsValue({ city: '' })
    const iso2 = countries.filter((x) => x.name === country)
    setCurrentCountry(iso2[0].iso2)
    fetchStates(iso2[0].iso2)
  }

  const onStateChange = (state) => {
    form.setFieldsValue({ city: '' })
    const iso2 = states.filter((x) => x.name === state)
    fetchCities(iso2[0].iso2, currentCountry)
  }

  useEffect(() => {
    const backgroundImage = require('../../assets/images/settings-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`

    async function fetchCountries() {
      const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
        headers: { 'X-CSCAPI-KEY': process.env.REACT_APP_API_COUNTRY_KEY },
      })
      setCountries(response.data)
      if (user.country) {
        const iso2 = response.data.filter((x) => x.name === user.country)
        setCurrentCountry(iso2[0].iso2)
        const statesRes = await axios.get(`https://api.countrystatecity.in/v1/countries/${iso2[0].iso2}/states`, {
          headers: { 'X-CSCAPI-KEY': process.env.REACT_APP_API_COUNTRY_KEY },
        })
        setStates(statesRes.data)
        if (user.region) {
          const iso2State = statesRes.data.filter((x) => x.name === user.region)
          fetchCities(iso2State[0].iso2, iso2[0].iso2)
        }
      }
    }
    fetchCountries()
  }, [user.country, user.region])

  const handleUploadChange = ({ info }) => {
    if (info.file.status === 'done') {
      setLoading(false)
      notification.success({
        message: `${info.file.name} file uploaded successfully`,
      })
    } else if (info.file.status === 'error') {
      notification.error({
        message: `${info.file.name} file upload failed`,
      })
      setLoading(false)
    } else if (info.file.status === 'uploading') {
      setLoading(true)
    }
  }

  const onBioChange = ({ value }) => {
    setValueBio(value)
  }

  const onFinish = (values) => {
    requester(
      'patch',
      `${process.env.REACT_APP_API_BACKEND_URL}/users/my-profile`,
      values,
      () => dispatch(signOut()),
      history,
    ).then(() => {
      alert.success('Profile successfully updated')
    })
  }

  const uploadImage = async (options) => {
    const { onSuccess, onError, file } = options

    const fmData = new FormData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: JSON.parse(localStorage.getItem('tokens')).accessToken,
      },
    }

    fmData.append('image', file)

    try {
      const res = await axios.patch(`${process.env.REACT_APP_API_BACKEND_URL}/users/changeProfilePhoto`, fmData, config)

      dispatch(setNewUserPhoto(res.data))
      onSuccess('Ok')
      setLoading(false)
    } catch (err) {
      console.log('Eroor: ', err)
      onError({ err })
    }
  }
  return (
    <Form form={form} initialValues={{ ...user, nameSurname: `${user.name} ${user.surname}` }} onFinish={onFinish}>
      <div className={window.innerWidth <= 900 ? 'div-settings-main-sm' : 'settings-main'}>
        <div className="settings-header">
          <Upload
            fileList={[]}
            accept="image/*"
            customRequest={uploadImage}
            onChange={(info) => handleUploadChange({ info })}
          >
            <div className="avatar">
              <CameraOutlined />
              {loading && <LoadingOutlined />}
              <img alt="" src={user.photoUrl} className="div-settings-main-avatar" />
            </div>
          </Upload>
          <div className="settings-header-text ">
            <div className="settings-header-text-name">
              <Form.Item name="nameSurname">
                <Input defaultValue={`${user.name} ${user.surname}`} />
              </Form.Item>
            </div>
            <div className="settings-header-text-others">
              <div>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d)">
                    <path
                      d="M23.4755 14.678L20.6786 11.8869C19.6797 10.8901 17.9816 11.2889 17.582 12.5847C17.2823 13.4818 16.2834 13.9802 15.3844 13.7808C13.3866 13.2824 10.6896 10.6907 10.1901 8.59745C9.89045 7.70029 10.4898 6.70348 11.3888 6.40448C12.6874 6.00576 13.0869 4.31119 12.088 3.31438L9.2911 0.523323C8.49198 -0.174441 7.29329 -0.174441 6.59406 0.523323L4.69614 2.41725C2.79823 4.41087 4.89592 9.69394 9.59077 14.3789C14.2856 19.0639 19.5798 21.2569 21.5776 19.2633L23.4755 17.3693C24.1748 16.5719 24.1748 15.3757 23.4755 14.678Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d"
                      x="0"
                      y="0"
                      width="28"
                      height="28"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                  </defs>
                </svg>

                <Form.Item name="mobilePhone">
                  <Input placeholder="Mobile phone" />
                </Form.Item>
              </div>

              <div>
                <svg width="28" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.75 0H6.25C2.79875 0 0 2.79875 0 6.25V13.75C0 17.2013 2.79875 20 6.25 20H13.75C17.2013 20 20 17.2013 20 13.75V6.25C20 2.79875 17.2013 0 13.75 0ZM18.125 13.75C18.125 16.1625 16.1625 18.125 13.75 18.125H6.25C3.8375 18.125 1.875 16.1625 1.875 13.75V6.25C1.875 3.8375 3.8375 1.875 6.25 1.875H13.75C16.1625 1.875 18.125 3.8375 18.125 6.25V13.75Z"
                    fill="white"
                  />
                  <path
                    d="M10 5C7.23875 5 5 7.23875 5 10C5 12.7613 7.23875 15 10 15C12.7613 15 15 12.7613 15 10C15 7.23875 12.7613 5 10 5ZM10 13.125C8.2775 13.125 6.875 11.7225 6.875 10C6.875 8.27625 8.2775 6.875 10 6.875C11.7225 6.875 13.125 8.27625 13.125 10C13.125 11.7225 11.7225 13.125 10 13.125Z"
                    fill="white"
                  />
                  <path
                    d="M15.375 5.29124C15.743 5.29124 16.0412 4.99295 16.0412 4.62499C16.0412 4.25703 15.743 3.95874 15.375 3.95874C15.007 3.95874 14.7087 4.25703 14.7087 4.62499C14.7087 4.99295 15.007 5.29124 15.375 5.29124Z"
                    fill="white"
                  />
                </svg>
                <Form.Item name="instProfile">
                  <Input placeholder="Instagram" />
                </Form.Item>
              </div>

              <div>
                <svg width="28" height="28" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d)">
                    <path
                      d="M22.125 0H21.5H6.5H5.875C4.84 0 4 0.84 4 1.875V2.5V12.5V13.125C4 14.16 4.84 15 5.875 15H6.5H21.5H22.125C23.16 15 24 14.16 24 13.125V12.5V2.5V1.875C24 0.84 23.16 0 22.125 0ZM19.9175 1.25L14 5.9225L8.0825 1.25H19.9175ZM21.5 13.75H6.5V3.3075L14 9.07625L21.5 3.30625V13.75Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d"
                      x="0"
                      y="0"
                      width="28"
                      height="23"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
                    </filter>
                  </defs>
                </svg>
                <Form.Item name="mail">
                  <Input placeholder="E-mail" />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="div-settings-main-line">
          <hr style={{ height: '0.3vh', backgroundColor: 'white', borderWidth: '0' }} />
        </div>
        <Form.Item name="bio">
          <TextArea
            value={valueBio}
            onChange={onBioChange}
            placeholder="Write something about yourself..."
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <div className="picker-place">
          <Form.Item name="country">
            <Select showSearch placeholder="Select a country" onChange={onCountryChange}>
              {countries.map((item) => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="region">
            <Select showSearch className="central-select" placeholder="Select a state" onChange={onStateChange}>
              {states.map((item) => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="city">
            <Select showSearch placeholder="Select a city">
              {cities.map((item) => (
                <Option key={item.name}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item>
          <button className="div-submit-settings">Save</button>
        </Form.Item>
      </div>
    </Form>
  )
}

export default SettingsPage
