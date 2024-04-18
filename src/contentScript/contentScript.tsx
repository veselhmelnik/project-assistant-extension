import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import LoginForm from '../components/LoginForm'
import { Box } from '@mui/material'
import { Messages } from '../utils/messages'


import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './contentScript.css'

const App: React.FC<{}> = () => {
    const [width, setWidth] = useState(0)
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg===Messages.TOGGLE_SIDE_PANEL) {
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
