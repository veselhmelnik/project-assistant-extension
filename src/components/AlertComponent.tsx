import { Alert } from "@mui/material"
import React from "react"

export type alertType = "error" | "success"

const AlertComponent:React.FC<{
    severity: alertType,
    text: string,
    isHidden: boolean
}> = ({ severity, text, isHidden }) => {
  
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

  export default AlertComponent

