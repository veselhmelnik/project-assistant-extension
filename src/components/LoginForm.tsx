import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { emailList, nickList } from '../utils/teamList'
import './components.css'
import { UserInfo } from '../utils/storage'

const LoginForm: React.FC<{
  handleLoginButtonClick: (info: UserInfo) => void
}> = ({ handleLoginButtonClick }) => {
  const [nickName, setNickName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const dataList = (list: string[], optionId: string) => {
    list.sort()
    return (
      <datalist id={optionId}>
        {list.map((item, i) => {
          return <option key={i}>{item}</option>
        })}
      </datalist>
    )
  }

  return (
    <Box
      height="60vh"
      display="flex"
      gap={1}
      flexDirection="column"
      mx={3}
      justifyContent="center"
    >
      <Typography
        className="login"
        variant="h2"
        margin="0 auto"
        fontWeight="bold"
      >
        Login
      </Typography>
      <input
        onChange={(e) => setNickName(e.target.value)}
        className="form-control form-username"
        list="nickListOptions"
        placeholder="Select Nickname"
      />
      {dataList(nickList, 'nickListOptions')}
      <input
        onChange={(e) => setEmail(e.target.value)}
        className="form-control form-useremail"
        list="emailListOptions"
        placeholder="Select service Email"
      />
      {dataList(emailList, 'emailListOptions')}
      <Button
        id="submit-btn"
        onClick={() => handleLoginButtonClick({ nickName, email })}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  )
}

export default LoginForm
