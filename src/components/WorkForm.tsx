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
import { UserInfo } from '../utils/storage'
import FetchButtons from './FetchButtons'

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
        <Box mt={3}>
          <Button variant="outlined" className="check-button">
            Check Rooms
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

const TimeStampTextField = () => {
  const [color, setColor] = useState('success')
  useEffect(() => {
    const currentDate = new Date()
  }, [])
  return (
    <TextField
    focused
    value="15n"
    variant="outlined"
    color="warning"
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
