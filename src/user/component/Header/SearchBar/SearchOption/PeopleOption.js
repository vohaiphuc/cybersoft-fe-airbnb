import { faMinus, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ConfigProvider, Input } from 'antd';
import React, { useEffect, useRef } from 'react'

export default function PeopleOption({ people, setPeople, handleSetActiveInput, handleSubmit, active }) {
    const refPeople = useRef()
    useEffect(() => {
        const handleClick = (e) => {

            if (refPeople.current.contains(e.target) == false) {
                console.log("people on click event");
                handleSetActiveInput('people', false)
            }
        }
        if (active) {
            document.addEventListener("mousedown", handleClick)
        }
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [active])

    return (
        <div className={`relative rounded-full px-5 py-2  w-full h-full flex items-center sb-people ${active && 'active'}`}>

            <div className='flex-1' onClick={() => { handleSetActiveInput('people', true); }} >
                <p className='text-sm text-gray-500 w-1/2'>Khách</p>
                <Input
                    value={people > 0 ? people + " khách" : ''}
                    placeholder='Thêm khách'
                    bordered={false}
                    readOnly
                />
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#fff",
                    }
                }}
            >

                <button className='bg-[#FF385C] text-white rounded-full h-full space-x-2 px-5' onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>Tìm kiếm</span>
                </button>
            </ConfigProvider>
            {active &&
                <div className="absolute w-28 h-12 px-5 bg-red-50 sb-people-popup rounded-3xl flex items-center justify-between"
                    tabIndex="0"
                    autoFocus
                    ref={refPeople}
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
