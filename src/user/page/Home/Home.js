import React, { useEffect, useState } from 'react'
import { roomServ } from '../../api/api'
import RoomList from './RoomList'
import OptionSlider from './OptionSlider';
import "./asset/style.scss"

export default function Home() {
    const [roomListAll, setRoomListAll] = useState(null);
    const [roomListFilter, setRoomListFilter] = useState(null);

    useEffect(() => {
        roomServ.get()
            .then((res) => {
                const list = res.data.content
                setRoomListAll(list)
                setRoomListFilter(list)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleFilterRoom = (listFilter) => {
        setRoomListFilter(listFilter ? listFilter : roomListAll)
    }

    return <div className='space-y-3 lg:space-y-5 mb-3 lg:my-5'>
        <OptionSlider list={roomListAll} handleFilterRoom={handleFilterRoom} />
        <RoomList list={roomListFilter} />
    </div>
}