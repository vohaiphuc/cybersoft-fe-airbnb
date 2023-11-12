import { faStar, faStarHalf } from '@fortawesome/free-regular-svg-icons'
import { faStarAndCrescent, faStarHalfAlt, faStarHalfStroke, faStarOfDavid, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { userRoute } from "../../route/userRoute";

export default function RoomItem({ room }) {
    const { id, hinhAnh, tenPhong, giaTien, locationDetail } = room
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
                <p className='font-bold truncate'>{tenPhong.slice(0, 20)}</p>
                {/* rating */}
                <div className='space-x-2'>
                    <FontAwesomeIcon icon={faStar} />
                    <span>{Math.round(Math.random() * 100) / 10}</span>
                </div>
            </div>
            <div className='font-light'>
                {`${locationDetail?.tenViTri}, ${locationDetail?.tinhThanh}`}
            </div>
            <div>
                {giaTien > 0 && <p>
                    <span className='font-bold'>{"$" + giaTien}</span> / đêm
                </p>}
            </div>
        </NavLink>
    )
}
