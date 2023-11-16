import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Skeleton } from 'antd'
import React from 'react'
import useModalBg from '../../Modal/useModalBg'
import useActiveInput from './SearchOption/useActiveInput'
import { useSelector } from 'react-redux'

export default function NormalSearchbar() {
    const { openModal } = useModalBg()
    const loading = useSelector(s => s.skeletonSlice.location)
    const { activeIndex, setActiveIndex } = useActiveInput()
    const handleClick = (index) => {
        openModal()
        setActiveIndex(index)
    }
    const isActiveInput = (index) => {
        return activeIndex == index ? 'font-semibold' : ''
    }

    const CustomSkeleton = ({ children }) => {
        return !loading ? children : (
            <div>
                <div className='h-0 opacity-0 whitespace-nowrap'>
                    {children}
                </div>
                <Skeleton.Button active block style={{ height: 29 }} />
            </div>
        )
    }

    return (
        <div className='space-x-2 rounded-full shadow-lg py-1 px-2 lg:px-5 flex items-center justify-center border-[1px] cursor-pointer text-sm lg:text-base'>
            <CustomSkeleton>
                <p onClick={() => { handleClick(0) }} className={`${isActiveInput(0)}`}>Địa điểm bất kì</p>
            </CustomSkeleton>

            <div className='border-l-[1px] border-r-[1px] border-gray-300 px-2'>
                <CustomSkeleton>
                    <p onClick={() => { handleClick(1) }} className={`${(activeIndex == 1 || activeIndex == 2) ? 'font-semibold' : ''} `}>tuần bất kì</p>
                </CustomSkeleton>
            </div>

            <CustomSkeleton>
                <div className="flex items-center space-x-2">
                    <span onClick={() => { handleClick(3) }} className={`${isActiveInput(3)}`}>Thêm khách</span>
                    <FontAwesomeIcon icon={faSearch} className='bg-[#ff385c] text-white hover p-2 rounded-full text-sm' />
                </div>
            </CustomSkeleton>

            {/* Without skeleton */}
            {/*
                    <span onClick={() => { handleClick(0) }} className={`${isActiveInput(0)}`}>Địa điểm bất kì</span>
                    <span onClick={() => { handleClick(1) }} className={`${(activeIndex == 1 || activeIndex == 2) ? 'font-semibold' : ''} border-l-[1px] border-r-[1px] border-gray-300 px-2`}>tuần bất kì</span>
                    <span onClick={() => { handleClick(3) }} className={`${isActiveInput(3)}`}>Thêm khách</span>
                    <FontAwesomeIcon icon={faSearch} className='bg-[#ff385c] text-white hover p-2 rounded-full text-sm' />
            */}
        </div>
    )
}

