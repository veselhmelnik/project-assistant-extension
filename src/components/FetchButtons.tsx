import React, { useEffect, useState } from 'react'
import { Alert, Box, Button, ButtonGroup } from '@mui/material'
import './components.css'
import useInfo from '../utils/info.hook'

const FetchButtons: React.FC = () => {
  const { getDataFromWebPage } = useInfo()
  const [isHidden, setIsHidden] = useState(true)
  const [severity, setSeverity] = useState("error")
  const [text, setText] = useState("");

 const showAlert = (alertType:string, text:string) => {
    setSeverity(alertType)
    setText(text)
     setIsHidden(false)
        const timeId = setTimeout(() => {
            setIsHidden(true)
        }, 20000)    
        return () => {
          clearTimeout(timeId)
        }
 }

  async function inProgress()  {
    await getDataFromWebPage().then((info) => {
        if (info.qaTime === undefined) {
            showAlert("error", "Спочатку вiдкрийте Project Tasks")
        } else {
            showAlert("success", "Iнформацiю у таблицi realProgress оновлено!")
        }
    })
    
  }


  return (
    <Box>
      <ButtonGroup orientation="vertical" className="fetch-buttons">
        <Button variant="contained" onClick={inProgress}>
          2D in Progress
        </Button>
        <Button variant="contained">Ready for QA</Button>
        <Button variant="contained">QA Assigned</Button>
        <Button variant="contained">Finished</Button>
      </ButtonGroup>
      <AlertComponent severity={severity} text={text} isHidden={isHidden}/>
    </Box>
  )
}

const AlertComponent = ({ severity, text, isHidden }) => {
  
  return (
    <Alert
      hidden={isHidden}
      severity={severity}
      sx={{ fontSize: '1.3rem', marginTop: '10px' }}
    >
      {text}
    </Alert>
  )
}

export default FetchButtons
