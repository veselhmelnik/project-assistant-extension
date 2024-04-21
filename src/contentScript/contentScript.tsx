import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../components/LoginForm'
import { Box } from '@mui/material'
import { Messages } from '../utils/messages'
import './contentScript.css'

const App: React.FC<{}> = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    document.body.addEventListener('click', (e) => {
      let x = e.clientX
      let screenWidth = document.body.clientWidth
      if (screenWidth - x > 350)
      setWidth(0)
     })
  },[])

  chrome.runtime.onMessage.addListener((msg) => {
    if (msg === Messages.TOGGLE_SIDE_PANEL) {
      toggleSidePanel()
    }
  })

  function toggleSidePanel() {
    setWidth(width === 0 ? 350 : 0)
  }

  return (
    <Box width={width} className="side-frame">
      <LoginForm></LoginForm>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
