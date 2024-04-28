import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { grey, teal} from '@mui/material/colors'
import React from 'react'
import './components.css'
import { UserInfo, getToken } from '../utils/storage'

const WorkForm: React.FC<{
  info: UserInfo
  handleLogoutButtonClick: () => void
}> = ({ info, handleLogoutButtonClick }) => {

  const inProgress =  () => {
    {getToken().then((t) => console.log(t))}
  }

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
      <CardContent className='content-container'>
        <Box mb={3}>
        <ButtonGroup orientation='vertical' className='fetch-buttons'>
          <Button variant='contained' onClick={inProgress}>2D in Progress</Button>
          <Button variant='contained'>Ready for QA</Button>
          <Button variant='contained' >QA Assigned</Button>
          <Button variant='contained'>Finished</Button>
        </ButtonGroup>
        </Box>
        <Divider />
        <Box mt={3}>
            <Button variant='outlined' className='check-button'>Check Rooms</Button>
        </Box>
        
      </CardContent>
    </Card>
  )
}

export default WorkForm
