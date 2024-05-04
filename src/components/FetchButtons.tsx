import React from "react"
import { Button, ButtonGroup } from "@mui/material"
import './components.css'
import useInfo from "../utils/info.hook"

const FetchButtons: React.FC = () => {
    const {info} = useInfo();

    

    const a = () => {
        console.log(info)
    }
    return (
        <ButtonGroup orientation='vertical' className='fetch-buttons'>
          <Button variant='contained' onClick={a}>2D in Progress</Button>
          <Button variant='contained'>Ready for QA</Button>
          <Button variant='contained' >QA Assigned</Button>
          <Button variant='contained'>Finished</Button>
        </ButtonGroup>
    )
}

export default FetchButtons