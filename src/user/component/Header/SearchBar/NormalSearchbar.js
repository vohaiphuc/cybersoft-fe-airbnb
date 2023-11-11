import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import React from 'react'
import useModalBg from '../../Modal/useModalBg'
import useActiveInput from './SearchOption/useActiveInput'

export default function NormalSearchbar() {
    const { openModal } = useModalBg()
    const { setActiveIndex } = useActiveInput()
    const handleClick = () => {
        openModal()
        setActiveIndex(3)
    }

    return (
        <div className='space-x-2 rounded-full shadow-lg py-1 px-5 flex items-center border-[1px] cursor-pointer'>
            <span onClick={() => { openModal(); setActiveIndex(0) }}>Địa điểm bất kì</span>
            <span onClick={() => { openModal(); setActiveIndex(1) }} className='border-l-[1px] border-r-[1px] border-gray-300 px-2'>tuần bất kì</span>
            <span onClick={() => { openModal(); setActiveIndex(3) }}>Thêm khách</span>
            <FontAwesomeIcon icon={faSearch} className='bg-[#ff385c] text-white hover p-2 rounded-full text-sm' />
        </div>
    )
}
