import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'

export default function NormalSearchbar() {
    return (
        <div className='space-x-2 rounded-full shadow-lg py-1 px-5 flex items-center border-[1px] cursor-pointer'>
            <span>Địa điểm bất kì</span>
            <span className='border-l-[1px] border-r-[1px] border-gray-300 px-2'>tuần bất kì</span>
            <span>Thêm khách</span>
            <FontAwesomeIcon icon={faSearch} className='bg-[#ff385c] text-white hover p-2 rounded-full text-sm' />
        </div>
    )
}
