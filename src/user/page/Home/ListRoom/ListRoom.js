import React from 'react'
import _ from 'lodash'
import { useSelector } from 'react-redux'
import ItemRoom from './ItemRoom'

export default function ListRoom() {
    const list = useSelector(state => state.homeSlice.listFiltered)
    const locationList = useSelector(state => state.locationSlide.list)
    const loading = useSelector(s => s.skeletonSlice.room)

    const renderRoom = () => {
        return list?.map((room, index) => {
            let idIndex = _.findIndex(locationList, (item) => item.id === room.maViTri)
            if (idIndex > -1) {
                room = {
                    ...room,
                    locationDetail: {
                        tenViTri: locationList[idIndex].tenViTri,
                        tinhThanh: locationList[idIndex].tinhThanh,
                    }
                }
            }
            return <ItemRoom key={index} room={room} loading={loading} keyIndex={index} />
        })
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
            {renderRoom()}
        </div>
    )
}
