import { Autocomplete, Box, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import { emailList, nickList } from '../utils/teamList'
import './components.css'

const LoginForm: React.FC<{}> = () => {
  return (
    <Box>
      <Typography variant="h5">Login</Typography>
      <Autocomplete
      options={nickList.sort()}
      renderInput={(params) => <TextField {...params} label="NickName"/>}/>
      <Autocomplete
      options={emailList.sort()}
      renderInput={(params) => <TextField {...params} label="Service Email"/>}/>
    </Box>
  )
}

export default LoginForm
