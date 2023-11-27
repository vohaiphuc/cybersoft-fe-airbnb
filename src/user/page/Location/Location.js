import React, { useEffect, useState } from 'react'
import "./asset/style.scss"
import { useParams } from 'react-router-dom'
import { roomServ, viTriServ } from '../../api/api';
import ListRoom from './ListRoom/ListRoom';
import MapLocation from './MapLocation/MapLocation';

export default function Location() {

    const locationId = useParams().id
    const [roomList, setRoomList] = useState(null);
    const [locationInfo, setLocationInfo] = useState(null);

    useEffect(() => {
        roomServ.getAsLocation(locationId)
            .then((res) => {
                const list = res.data.content
                setRoomList(list)
            })
            .catch((err) => {
                console.log(err)
            })
        viTriServ.getDetail(locationId)
            .then((res) => {
                let location = res.data.content
                setLocationInfo(location)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return (
        <div className='flex space-x-5 justify-between'>
            <div className="w-full lg:w-1/2">
                <ListRoom list={roomList} locationInfo={locationInfo} />
            </div>
            <div className="relative w-1/2 hidden lg:block">
                <MapLocation locationInfo={locationInfo} />
            </div>
        </div>
    )
}
