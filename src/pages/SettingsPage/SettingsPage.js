import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Upload, notification, Input } from 'antd'
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'
import { setNewUserPhoto } from '../../actions/userFlow'

import './SettingsPage.css'

const SettingsPage = () => {
  const user = useSelector(({ userInfo }) => userInfo)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const backgroundImage = require('../../assets/images/settings-background.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

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
    <div className="settings-main">
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
            <img alt="" src={user.photoUrl} style={{ width: '150px', height: '150px' }} />
          </div>
        </Upload>
        <div className="settings-header-text ">
          <Input defaultValue={`${user.name} ${user.surname}`} />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
