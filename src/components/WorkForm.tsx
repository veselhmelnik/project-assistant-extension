import {
  Avatar,
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
import { grey, teal } from '@mui/material/colors'
import React from 'react'
import './components.css'
import { UserInfo } from '../utils/storage'

const WorkForm: React.FC<{
  info: UserInfo
  handleLogoutButtonClick: () => void
}> = ({ info, handleLogoutButtonClick }) => {
  return (
    <Card sx={{ maxWidth: '90%', margin: '100px auto' }}>
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
      <CardContent>
        <ButtonGroup orientation='vertical' className='fetch-buttons'>
          <Button variant='contained'>2D in Progress</Button>
          <Button variant='contained'>Ready for QA</Button>
          <Button variant='contained'>QA Assigned</Button>
          <Button variant='contained'>Finished</Button>
        </ButtonGroup>
      </CardContent>
    </Card>
  )
}

export default WorkForm
