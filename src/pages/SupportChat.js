import React, { useState } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'

const SupportChat = ({ id, name, role }) => {
  const [socket, setSocket] = useState()
  const [msg, setMsg] = useState([])

  function handleConnect(e) {
    e.preventDefault()
    role === 'user' &&
      setSocket(
        io('http://localhost:3002', {
          query: {
            id,
            name,
            role,
          },
        }),
      )
  }

  function handleMessage(e) {
    e.preventDefault()
    const msg = e.target.message.value
    msg && socket.send(msg)
    e.target.message.value = ''
  }

  socket &&
    socket.on('message', (message) => {
      setMsg([...msg, message])
    })

  return (
    <>
      {socket ? (
        <>
          <ul id="messages">{msg && msg.map((item, index) => <li key={index}>{item}</li>)}</ul>
          <form onSubmit={(e) => handleMessage(e)}>
            <input name="message" />
            <button>Send</button>
          </form>
        </>
      ) : (
        <button onClick={(e) => handleConnect(e)}>Connect me</button>
      )}
    </>
  )
}

function mapStateToProps({ userInfo }) {
  return {
    name: userInfo.name,
    id: userInfo.id,
    role: userInfo.role,
  }
}

export default connect(mapStateToProps)(SupportChat)
