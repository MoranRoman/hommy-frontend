import React, { useState } from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'

const AdminPanel = ({ name, role }) => {
  const [socket, setSocket] = useState()
  const [msg, setMsg] = useState([])
  const [helpRequests, setHelpRequests] = useState([])
  const [userId, setUserId] = useState([])

  function handleConnect(e) {
    e.preventDefault()
    setSocket(
      io('http://localhost:3002', {
        query: {
          id: 'helpersRoom',
          name,
          role,
        },
      }),
    )
  }

  function handleRoomConnect(e) {
    e.preventDefault()
    setSocket(
      io('http://localhost:3002', {
        query: {
          id: userId,
          name,
          role,
        },
      }),
    )
    setHelpRequests([])
    setMsg([])
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

  socket &&
    socket.on('helpRequest', (message) => {
      setUserId(message.split(' ')[5])
      console.log(message)
      setHelpRequests([...helpRequests, message])
    })

  return (
    <>
      {socket ? (
        <>
          <ul id="helpRequests">
            {helpRequests &&
              helpRequests.map((item, index) => (
                <>
                  <li key={index}>{item}</li>
                  <button onClick={(e) => handleRoomConnect(e)}>Help</button>
                </>
              ))}
          </ul>
          <ul>
            {msg &&
              msg.map((item, index) => (
                <>
                  <li key={index}>{item}</li>
                </>
              ))}
          </ul>
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
    role: userInfo.role,
  }
}

export default connect(mapStateToProps)(AdminPanel)
