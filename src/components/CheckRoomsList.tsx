import { Alert, Box, Button } from '@mui/material'
import React, { useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';

type List = {
  incorrectList: any[],
  isCurbShotExist: boolean,
  roomList: any[],
  title: string
}

const CheckRoomsList: React.FC = () => {
    const [roomList, setRoomList] = useState<List>(null)

    const roomsChecker = () => {
      setRoomList(null)
        const rooms = document.querySelectorAll("#room-name-change-dropdown");
        let allRoomList = [];
        let repeatedRoomsList = [];
        let incorrectRoomNumberList = [];
        for (let i = 0; i < rooms.length; i++) {
          if (!rooms[i].innerHTML.includes('Complex Wall')) {
            allRoomList.push(rooms[i].innerHTML.replace('<span class="caret"></span>', '').trim());
          }
        }
        allRoomList.map((room) => {
          if (!isNumberCorrect(room, allRoomList)) {
            incorrectRoomNumberList.push(room);
          }
          if (allRoomList.filter(item => item === room).length > 1) {
            repeatedRoomsList.push(room);
          } 
        })
        repeatedRoomsList = repeatedRoomsList.filter(function(item, pos) {
          return repeatedRoomsList.indexOf(item) == pos;
        })
        incorrectRoomNumberList = incorrectRoomNumberList.filter(function(item, pos) {
          return incorrectRoomNumberList.indexOf(item) == pos;
        })
        setRoomList({ title: document.title, roomList: repeatedRoomsList, incorrectList: incorrectRoomNumberList, isCurbShotExist: isCurbShot(allRoomList)})
        
      }

      function isCurbShot(list) {
        if (list.filter(str => str.includes('Curb Shot')).length > 0) return true;
        else return false
      }

      function isNumberCorrect (room, list) {
        let number = room.substring(room.length - 1);
       if (number > 1) {
        let newRoom = `${room.substring(0, room.length-1)}${number - 1}`;
        return list.includes(newRoom);
       } else {
        return true
       }
      }
  return (
    <>
    <Box mt={3}>
          <Button variant="outlined" className="check-button" onClick={roomsChecker}>
            Check Rooms
          </Button>
         {roomList ? <ShowList list={roomList}></ShowList> : <></>}
        </Box>
    </>
  )
}

const ShowList: React.FC<{list: List}> = ({list}) => {
  function showRooms (repeatedRooms) {
    return repeatedRooms.map((room, key) => {
      return <Alert variant="outlined" key={key} sx={{text: 'center', my: 1, fontSize: '1.5rem'}} icon={false} severity='error'>{room}</Alert>
    })
  }
    if (!list.isCurbShotExist && list.incorrectList.length===0 && list.roomList.length===0) {
      return <Box sx={{backgroundColor: '#edf7ed',borderRadius: '10px'}} width='95%' display='flex' justifyContent='center' m='0 auto' mt={3} mb={1} borderRadius={15}><DoneAllIcon sx={{fontSize: 70,  color: 'green',padding: '20px', }}></DoneAllIcon></Box>
    }
    return <>
    {list.isCurbShotExist ? <Alert variant="outlined" icon={false} sx={{text: 'center', marginTop: 3, marginBottom: 1, fontSize: '1.5rem'}} severity='error'>CurbShot не видалено</Alert> : ''}
    {list.roomList.length>0 ? <>
      <h4>Повторні кімнати</h4>
      {showRooms(list.roomList)}
    </> : ''}
    {list.incorrectList.length>0 ? <>
      <h4>Непослідовні номери кімнат</h4>
      {showRooms(list.incorrectList)}
    </> : ''}
    </>
  
}

export default CheckRoomsList