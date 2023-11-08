import React from 'react'
import RoomItem from './RoomItem'

export default function RoomList({ list }) {
    const renderRoom = () => {
        return list?.map((room, index) => {
            return <RoomItem room={room} key={index} />
        })
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            {renderRoom()}
        </div>
    )
}
