import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { grey, teal } from '@mui/material/colors'
import React, { useEffect, useState } from 'react'
import './components.css'
import { UserInfo, getTimeStamp, setTimeStamp } from '../utils/storage'
import FetchButtons from './FetchButtons'
import CheckRoomsList from './CheckRoomsList'


const WorkForm: React.FC<{
  info: UserInfo
  handleLogoutButtonClick: () => void
}> = ({ info, handleLogoutButtonClick }) => {
  
  return (
    <Card sx={{ maxWidth: '90%', margin: ' 20px auto', minHeight: '95%' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: teal[500] }}>{info.nickName[0]}</Avatar>}
        action={
          <>
            <IconButton onClick={handleLogoutButtonClick} aria-label="settings">
              <LogoutIcon />
            </IconButton>
          </>
        }
        title={
          <Typography sx={{ fontSize: '1.7rem' }}>{info.nickName}</Typography>
        }
        subheader={
          <Typography sx={{ fontSize: '1.1rem', color: grey[500] }}>
            {info.email}
          </Typography>
        }
      />
      <Divider />
      <Box width="25%" margin="10px auto">
        <TimeStampTextField/>
      </Box>

      <Divider />
      <CardContent className="content-container">
        <Box mb={3}>
          <FetchButtons />
        </Box>
        <Divider />
        
        <Box>
          <CheckRoomsList/>
        </Box>
      </CardContent>
    </Card>
  )
}

const TimeStampTextField = () => {
  type colorType = 'success' | 'error'
  const [value, setValue] = useState('') 
  const [color, setColor] = useState<colorType>('success')

  useEffect(() => {
    getTimeStamp().then(timeStamp => setValue(timeStamp))
  }, [])

  useEffect(() => {
    let day = +value.slice(0, -1)
    let dateNow = new Date()
    let checkingDate = new Date (dateNow.getFullYear(), dateNow.getMonth(),day, value.slice(-1) === 'n' ? 20 : 8, 30)
    let diff = dateNow.getTime()-checkingDate.getTime()
    if (diff < 0 || diff > 43200000) {
      setColor('error')
  } else {
    setColor('success')
  }
  }, [value])

  const handleChange = (e) => {
    setValue(e.target.value)
    setTimeStamp(e.target.value)
  }


  return (
    <TextField
    focused
    onChange={handleChange}
    value={value}
    variant="outlined"
    color={color}
    InputProps={{
      startAdornment: (
        <InputAdornment 
        style={{paddingTop: 2, fontSize: 25}}
        position="start"
        >UA</InputAdornment>
      ),
      style: {fontSize: 15, color: 'gray'}
    }}
  />
  )
}

export default WorkForm
