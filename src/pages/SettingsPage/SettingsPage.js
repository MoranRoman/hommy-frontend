import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import requester from "../../factories";
import { useHistory } from "react-router-dom";
import { Upload, Button, notification, Input } from 'antd';
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons';
import "./SettingsPage.css"
import Avatar from "antd/lib/avatar/avatar";
import axios from "axios"

const SettingsPage = ({ signOut }) => {
    const user = useSelector(({ userInfo }) => userInfo);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {

        let backgroundImage = require("../../assets/images/settings-background.jpg");
        document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`;

    }, [])
    const uploadProps = {
        action: process.env.REACT_APP_API_BACKEND_URL + "/dsadas/dchangeProfilePhoto",
        headers: { "Authorization": JSON.parse(localStorage.getItem('tokens')).accessToken },
        name: "avatar",
        method: 'PATCH',
        multiple: false,
    };
    const [avatarLocal, setAvatarLocal] = useState(user.photoUrl || require("../../assets/images/default-photo.jpg"));
    const handleUploadChange = ({ info }) => {
        if (info.file.status === 'done') {
            setAvatarLocal(`${info.file.response}?t=${Date.now()}`)
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

    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = {
            headers: { "content-type": "multipart/form-data", "Authorization": JSON.parse(localStorage.getItem('tokens')).accessToken },
            onUploadProgress: event => {
                setLoading(true);
            }
        };
        fmData.append("image", file);
        try {
            const res = await axios.patch(
                process.env.REACT_APP_API_BACKEND_URL + "/users/changeProfilePhoto",
                fmData,
                config
            );
            
            onSuccess("Ok");
            setAvatarLocal(res.data);
            setLoading(false);
        } catch (err) {
            setAvatarLocal(require("../../assets/images/default-photo.jpg"));
            console.log("Eroor: ", err);
            const error = new Error("Some error");
            onError({ err });
        }
    };
    return (
        <div className="settings-main">
            <div className="settings-header">

                <Upload accept="image/*"
                    accept="image/*"
                    customRequest={uploadImage} onChange={(info) => handleUploadChange({ info })}>
                    <div className="avatar">
                        <CameraOutlined />
                        {loading && <LoadingOutlined />}
                        <img src={avatarLocal} style={{ width: "150px", height: "150px" }} />
                    </div>
                </Upload>

                <div className="settings-header-text ">
                    <Input defaultValue={`${user.name} ${user.surname}`} />
                </div>
            </div>
        </div >
    )
}

export default SettingsPage