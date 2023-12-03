import { faStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { userRoute } from "../../../route/userRoute";
import { Skeleton } from 'antd'

export default function ItemRoom({ room, loading, keyIndex }) {
    const { id, hinhAnh, tenPhong, giaTien, locationDetail } = room
    const [componentLoading, setComponentLoading] = useState(loading);
    const [opacity, setOpacity] = useState(0);

    if (loading) {
        setTimeout(() => {
            setComponentLoading(false)
        }, 1000 + keyIndex * 100);
    }

    useEffect(() => {
        if (!componentLoading) { setOpacity(1) }
    }, [componentLoading])


    const CustomSkeleton = ({ children }) => {
        return !componentLoading ? children : (
            <div className='w-fit'>
                <div className='w-fit h-0 opacity-0 whitespace-nowrap'>
                    {children}
                </div>
                <Skeleton.Button active block style={{ height: 22 }} />
            </div>
        )
    }
    const CustomSkeletonImage = ({ children }) => {
        return !componentLoading ? children : (
            <Skeleton.Button active block rootClassName='aspect-[4/3] rounded-2xl transition-all' style={{ height: "100%", transition: 'all 1s', }} />
        )
    }

    return (
        <NavLink to={userRoute.detail.id(id)}>
            <CustomSkeletonImage>
                <div className='rounded-2xl' style={{
                    width: "100%",
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    transition: 'all 1s',
                    opacity: opacity,

                }}>
                    <img src={hinhAnh} alt=""
                        className='h-full'
                        style={{ width: '200%', maxWidth: 'unset' }}
                    />
                </div>
            </CustomSkeletonImage>
            <div className="flex items-center justify-between">
                <CustomSkeleton>
                    <p className="font-bold truncate">{tenPhong.slice(0, 20)}</p>
                </CustomSkeleton>
                <CustomSkeleton>
                    <div className='space-x-2'>
                        <FontAwesomeIcon icon={faStar} />
                        <span>{Math.round(Math.random() * 100) / 10}</span>
                    </div>
                </CustomSkeleton>
            </div>
            <div className='font-light'>
                <CustomSkeleton>
                    {`${locationDetail?.tenViTri}, ${locationDetail?.tinhThanh}`}
                </CustomSkeleton>
            </div>
            <div>
                {giaTien > 0 &&
                    <CustomSkeleton>
                        <p className='font-bold'>{"$" + giaTien.toLocaleString()} / đêm</p>
                    </CustomSkeleton>
                }
            </div>
        </NavLink>
    )
}
