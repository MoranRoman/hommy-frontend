import React, { useEffect } from 'react'
import { Result, Button } from 'antd'

const NotFoundPage = ({ history }) => {
  useEffect(() => {
    const backgroundImage = require('../../assets/images/homepage.jpg')
    document.querySelector('body').style.backgroundImage = `url("${backgroundImage}")`
  }, [])

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => history.push('/')}>Back Home</Button>}
    />
  )
}

export default NotFoundPage
