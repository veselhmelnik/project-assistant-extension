import React, { useEffect, useState } from 'react'
import { Box, ButtonGroup } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import './components.css'
import useInfo from '../utils/info.hook'
import useApi from '../utils/api.hook'
import AlertComponent, { alertType } from './AlertComponent';


const FetchButtons: React.FC = () => {
  const {loading, status, error, classError,classStatus, setDataToTable, setClassDataToTable} = useApi();
  const { getDataFromWebPage } = useInfo()
  const [isHidden, setIsHidden] = useState(true)
  const [isClassHidden, setIsClassHidden] = useState(true)
  const [severity, setSeverity] = useState<alertType>("error")
  const [classSeverity, setClassSeverity] = useState<alertType>("error")
  const [text, setText] = useState("");
  const [classText, setClassText] = useState("");


useEffect(() => {
  if (status==='ok') {
    showAlert("success", "Iнформацiю у таблицi REAL PROGRESS оновлено!")
  }
  if (classStatus==='ok') {
    showClassAlert("success", "Iнформацiю у таблицi CLASS QA оновлено!")
  }
  if (error && error.code===400) {
    showAlert("error", `ID проєкта вiдсутнiй у таблицi`)
  }
  if (error && error.code === 0) {
    showAlert("error", error.text)
  }
  if (classError) {
    showClassAlert("error", classError.text)
  }

},[status, error, classError, classStatus])

 const showAlert = (type:alertType, text:string) => {

    setSeverity(type)
    setText(text)
     setIsHidden(false)
 }
 const showClassAlert = (type:alertType, text:string) => {

  setClassSeverity(type)
  setClassText(text)
  setIsClassHidden(false)
}

  async function setData(workType)  {
    
    setIsHidden(true)

    await getDataFromWebPage().then((info) => {
        if (info.qaTime === undefined) {
          setIsHidden((prev) => prev === !prev)
            showAlert("error", "Спочатку вiдкрийте Project Tasks")
            
        } else {
            setDataToTable(info, workType)
            if (info.organization === 'Quicken Loans' && workType !== 'inProgress') {
              setIsClassHidden(true)
              setClassDataToTable(info, workType)
            }
        }
    })
    
  }


  return (
    <Box>
      <ButtonGroup orientation="vertical" className="fetch-buttons">
        <LoadingButton variant="contained" onClick={() => setData('inProgress')} loading={loading}>
          2D in Progress
        </LoadingButton>
        <LoadingButton loading={loading} onClick={() => setData('readyForQa')} variant="contained">Ready for QA</LoadingButton>
        <LoadingButton loading={loading} onClick={() => setData('qaAssigned')} variant="contained">QA Assigned</LoadingButton>
        <LoadingButton loading={loading} onClick={() => setData('finished')} variant="contained">Finished</LoadingButton>
      </ButtonGroup>
      <AlertComponent severity={severity} text={text} isHidden={isHidden}/>
      <AlertComponent severity={classSeverity} text={classText} isHidden={isClassHidden}/>
    </Box>
  )
}

export default FetchButtons
