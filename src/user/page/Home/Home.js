import React, { useEffect, useState } from 'react'
import { roomServ, viTriServ } from '../../api/api'
import RoomList from './RoomList'
import "./asset/style.scss"
import OptionSlider from './OptionSlider';
import { setLocationList } from '../../redux/locationSlide';
import { useDispatch } from 'react-redux';
import { slugify } from './asset/utils';

export default function Home() {
    const dispatch = useDispatch()
    const [roomList, setRoomList] = useState(null);
    const [roomListSlider, setRoomListSlider] = useState(null);
    const [locationLt, setLocationLt] = useState(null);

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

        viTriServ.get()
            .then((res) => {
                let list = res.data.content.map(item => {
                    return {
                        ...item,
                        slugTenViTri: slugify(item.tenViTri),
                    }
                })
                console.log("🚀 ~ file: Home.js:35 ~ locationList ~ locationList:", list)
                setLocationLt(list)
                dispatch(setLocationList(list))
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
        <RoomList list={roomListSlider} locationList={locationLt} />
    </div>
}
