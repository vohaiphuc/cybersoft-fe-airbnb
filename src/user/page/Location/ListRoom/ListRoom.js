import React from 'react'
import ItemRoom from './ItemRoom'

export default function ListRoom({ list, locationInfo }) {
    const renderRooms = () => {
        return list?.map((item, index) => {
            return <ItemRoom room={item} key={index} locationInfo={locationInfo} />
        })
    }
    return (
        <div className='my-5 space-y-5'>
            <p className='font-semibold'>Hơn 1.000 chỗ ở</p>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                {renderRooms()}
            </div>
        </div>
    )
}
