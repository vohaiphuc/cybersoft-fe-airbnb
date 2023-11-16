import React from 'react'
import RoomItem from './RoomItem'
import _ from 'lodash'
import { useSelector } from 'react-redux'

export default function RoomList({ list }) {
    const locationList = useSelector(state => state.locationSlide.list)

    const renderRoom = () => (
        list?.map((room, index) => {
            let idIndex = _.findIndex(locationList, (item) => item.id == room.maViTri)
            if (idIndex > -1) {
                room.locationDetail = {
                    tenViTri: locationList[idIndex].tenViTri,
                    tinhThanh: locationList[idIndex].tinhThanh,
                }
            }
            return <RoomItem room={room} key={index} />
        })
    )

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {renderRoom()}
        </div>
    )
}
