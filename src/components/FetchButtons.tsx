import React, { useState } from 'react'
import { Box, ButtonGroup } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import './components.css'
import useInfo from '../utils/info.hook'
import useApi from '../utils/api.hook'
import AlertComponent, { alertType } from './AlertComponent';


const FetchButtons: React.FC = () => {
  const {loading, setDataToTable} = useApi();
  const { getDataFromWebPage } = useInfo()
  const [isHidden, setIsHidden] = useState(true)
  const [severity, setSeverity] = useState<alertType>("error")
  const [text, setText] = useState("");



 const showAlert = (type:alertType, text:string) => {
    setSeverity(type)
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
            setDataToTable(info).then(() => {
              showAlert("success", "Iнформацiю у таблицi realProgress оновлено!")
            })
        }
    })
    
  }


  return (
    <Box>
      <ButtonGroup orientation="vertical" className="fetch-buttons">
        <LoadingButton variant="contained" onClick={inProgress} loading={loading}>
          2D in Progress
        </LoadingButton>
        <LoadingButton loading={loading} variant="contained">Ready for QA</LoadingButton>
        <LoadingButton loading={loading} variant="contained">QA Assigned</LoadingButton>
        <LoadingButton loading={loading} variant="contained">Finished</LoadingButton>
      </ButtonGroup>
      <AlertComponent severity={severity} text={text} isHidden={isHidden}/>
    </Box>
  )
}

export default FetchButtons
