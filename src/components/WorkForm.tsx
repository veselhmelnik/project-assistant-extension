import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { grey, teal} from "@mui/material/colors"
import React, { useEffect, useState } from "react"
import './components.css'
import { getUserInfo } from "../utils/storage";

const WorkForm: React.FC<{}> = () => {
    const [nickName, setNickName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        getUserInfo().then((info) => {
            setNickName(info.nickName)
            setEmail(info.email)
        })
    },[])
    return (
        <Card sx={{maxWidth: '90%', margin: '100px auto'}}>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: teal[500]}}>{nickName[0]}</Avatar>
                }    
                action={
                    <IconButton aria-label="settings"><MoreVertIcon /></IconButton>
                }
                title={
                    <Typography sx={{fontSize: '1.7rem'}}>{nickName}</Typography>
                }
                subheader={
                    <Typography sx={{fontSize: '1.1rem', color: grey[500]}}>{email}</Typography>
                }
            />
            <CardContent>
                <Typography>'asdfasdfasdf'asdf'asdf</Typography>
            </CardContent>
        </Card>
    )
}

export default WorkForm