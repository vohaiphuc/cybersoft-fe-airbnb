import React, { useEffect, useState } from 'react'
import { roomServ } from '../../api/api'
import RoomList from './RoomList'
import "./asset/style.scss"
import OptionSlider from './OptionSlider';

export default function Home() {
    const [roomList, setRoomList] = useState(null);
    const [roomListSlider, setRoomListSlider] = useState(null);

    useEffect(() => {
        roomServ.get()
            .then((res) => {
                console.log(res.data.content);
                setRoomList(res.data.content)
                setRoomListSlider(res.data.content)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleFilterRoom = (filteredList) => {
        setRoomListSlider(filteredList ? filteredList : roomList)
    }

    return <div className='space-y-5'>
        <OptionSlider list={roomList} handleFilterRoom={handleFilterRoom} />
        <RoomList list={roomListSlider} />
    </div>
}
