import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../components/LoginForm'
import WorkForm from '../components/WorkForm'
import { Box } from '@mui/material'
import { Messages } from '../utils/messages'
import { UserInfo, getUserInfo } from '../utils/storage'
import './contentScript.css'

const PANEL_WIDTH = 400

const App: React.FC<{}> = () => {
  const [width, setWidth] = useState<number>(0)
  const [info, setInfo] = useState<UserInfo>({ nickName: '', email: '' })

  if (!chrome.runtime.onMessage.hasListeners()) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_SIDE_PANEL) {
        toggleSidePanel()
      }
    })
  }

  useEffect(() => {
    getUserInfo().then((info) => setInfo({ ...info }))
  }, [])

  useEffect(() => {
    document.body.addEventListener('click', (e) => hidePanel(e.clientX))
  }, [])

  const hidePanel = (coordinate: number) => {
    let screenWidth = document.body.clientWidth
    if (screenWidth - coordinate > PANEL_WIDTH) setWidth(0)
  }

  function toggleSidePanel() {
    setWidth((prev) => (prev === 0 ? PANEL_WIDTH : 0))
  }

  return (
    <Box width={width} className="side-frame">
      {info.nickName === '' ? <LoginForm /> : <WorkForm />}
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
