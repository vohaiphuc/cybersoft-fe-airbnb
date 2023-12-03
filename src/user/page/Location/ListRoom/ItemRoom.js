import { faStar, faStarHalf, faUser } from '@fortawesome/free-regular-svg-icons'
import { faBed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { userRoute } from '../../../route/userRoute'

export default function ItemRoom({ room, locationInfo }) {
    const { id, hinhAnh, tenPhong, giaTien, moTa, giuong, khach } = room
    return (
        <NavLink to={userRoute.detail.id(id)}>
            <div className='rounded-2xl' style={{
                width: "100%",
                aspectRatio: '4/3',
                overflow: 'hidden'
            }}>
                <img src={hinhAnh} alt=""
                    className='h-full'
                    style={{ width: '200%', maxWidth: 'unset' }}
                />
            </div>
            <div className="flex items-center justify-between">
                <p className='font-bold truncate w-3/4'>
                    {tenPhong}
                    {/* Phòng tại {locationInfo.tenViTri} */}
                </p>
                <div className='space-x-2'>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{Math.round(Math.random() * 100) / 10}</span>
                </div>
            </div>
            <div className='font-light truncate'>
                {moTa}
            </div>
            <div className='font-light flex justify-between items-center w-full'>
                {giuong > 0 ?
                    <div className='flex items-center space-x-3'>
                        <FontAwesomeIcon icon={faBed} />
                        <p>{giuong} giường</p>
                    </div>
                    : null}
                {khach > 0 ?
                    <div className='flex items-center space-x-3'>
                        <FontAwesomeIcon icon={faUser} />
                        <p>{khach} khách</p>
                    </div>
                    : null}

            </div>
            <div>
                {giaTien > 0 && <p>
                    <span className='font-bold'>{"$" + giaTien.toLocaleString()}</span> / đêm
                </p>}
            </div>
        </NavLink>
    )
}
