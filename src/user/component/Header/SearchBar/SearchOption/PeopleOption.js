import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from 'antd';
import React from 'react'
import useModalBg from '../../../Modal/useModalBg';

export default function PeopleOption({ people, setPeople, handleSetActiveInput, handleSubmit, isActive }) {
    const { isOpenModal, openModal } = useModalBg()
    const active = (isActive && isOpenModal) ? 'active' : ''

    return (
        <div className={`relative rounded-full px-5 py-2  w-full h-full flex items-center sb-people ${active}`}>

            <div className='flex-1' onClick={() => { handleSetActiveInput('people', true); openModal() }} >
                <p className='text-sm text-gray-500 w-1/2'>Khách</p>
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

            {active && isOpenModal &&
                <div className="absolute w-28 h-12 px-5 bg-white shadow-2xl sb-people-popup rounded-3xl flex items-center justify-between z-30"
                    tabIndex="0"
                    autoFocus
                >
                    <p>Người lớn</p>
                    <div className="flex items-center justify-between space-x-5" >
                        <FontAwesomeIcon icon={faMinus} onClick={() => { people > 0 && setPeople(people - 1) }} />
                        <span className='w-5 text-center'>{people}</span>
                        <FontAwesomeIcon icon={faPlus} onClick={() => { setPeople(people + 1); }} />
                    </div>
                </div>
            }
        </div>

    )
}
