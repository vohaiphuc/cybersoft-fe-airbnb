import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import React from 'react'
import useModalBg from '../../../Modal/useModalBg';
import useActiveInput from './useActiveInput';
import { useEffect } from 'react';
import { useState } from 'react';

export default function PeopleOption({ people, setPeople, handleSubmit }) {
    const { isOpenModal, openModal } = useModalBg()
    const { activeIndex, setActiveIndex } = useActiveInput()
    const key = 3
    const active = (activeIndex == key && isOpenModal) ? 'active' : ''

    const handleOnclick = () => {
        setActiveIndex(key);
    }

    const [height, setHeight] = useState(0);
    useEffect(() => {
        setHeight(active ? 12 : 0)
    }, [active])

    return (
        <div className={`relative rounded-full px-5 py-2  w-full h-full flex items-center sb-people ${active}`}>

            <div className='flex-1' onClick={handleOnclick} >
                <p className='text-sm w-1/2 font-medium'>Khách</p>
                <Input
                    value={people > 0 ? people + " khách" : ''}
                    placeholder='Thêm khách'
                    bordered={false}
                    readOnly
                />
            </div>

            <button className='bg-[#FF385C] text-white rounded-full h-full space-x-2 px-5' onClick={handleSubmit}>
                <FontAwesomeIcon icon={faSearch} />
                <span>Tìm kiếm</span>
            </button>

            {active &&
                <div className={`absolute w-28 h-${height} transition-all px-5 bg-white shadow-2xl sb-people-popup rounded-3xl flex items-center justify-between z-30`}
                    tabIndex="0"
                    autoFocus
                >
                    <p>Người lớn</p>
                    <div className="flex items-center justify-between space-x-3" >
                        <FontAwesomeIcon icon={faMinus} className='people-option-icon' onClick={() => { people > 0 && setPeople(people - 1) }} />
                        <span className='w-5 text-center'>{people}</span>
                        <FontAwesomeIcon icon={faPlus} className='people-option-icon' onClick={() => { setPeople(people + 1); }} />
                    </div>
                </div>
            }
        </div>

    )
}
