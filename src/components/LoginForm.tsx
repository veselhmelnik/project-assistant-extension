import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { emailList, nickList } from '../utils/teamList'
import './components.css'
import { getUserInfo, setUserInfo } from '../utils/storage'

const LoginForm: React.FC<{}> = () => {
  const [nickName, setNickName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleLoginDataClick = () => {
    const info = { nickName, email }
    setUserInfo(info)
  }
  // const a = () => {
  //   getUserInfo().then((res) => console.log(res))
  // }

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
        onClick={handleLoginDataClick}
        variant="contained"
      >
        Submit
      </Button>
      {/* <Button onClick={a}>asdf</Button> */}
    </Box>
  )
}

export default LoginForm
