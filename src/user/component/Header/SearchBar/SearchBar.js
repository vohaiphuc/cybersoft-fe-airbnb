import React, { useState } from 'react'
import LocationOption from './SearchOption/LocationOption';
import PeopleOption from './SearchOption/PeopleOption';
import DateOption from './SearchOption/DateOption';
import { useSelector } from 'react-redux';
import useModalBg from '../../Modal/useModalBg';
import { useEffect } from 'react';
import { useRef } from 'react';
import useActiveInput from './SearchOption/useActiveInput';

export const activeInputSlug = {
    location: 'location',
    startDate: 'startDate',
    endDate: 'endDate',
    people: 'people',
}

export default function SearchBar() {
    const locationList = useSelector(state => state.locationSlide.list)
    const [locationId, setLocationId] = useState("");
    const [date, setDate] = useState("");
    const [people, setPeople] = useState(0);
    const { isOpenModal, closeModal } = useModalBg()
    const { activeIndex, setActiveIndex } = useActiveInput()

    const handleSubmit = () => {
        const input = {
            locationId,
            dateStart: date[0],
            dateEnd: date[1],
            people
        }
        console.log(input)
        setActiveIndex(null)
        closeModal()
    }

    const transitionEffect = isOpenModal ? 'h-16 opacity-100' : 'h-0 opacity-0'
    const bgColor = activeIndex == null ? 'bg-white' : 'bg-[#e7e7e7]'
    const zIndex = isOpenModal && 'relative z-30'

    return (
        <div className={`border-2 rounded-full flex items-center transition-all ${transitionEffect} ${zIndex} ${bgColor}`}>
            <div className='relative rounded-full h-full w-1/4 cursor-pointer'>
                <LocationOption
                    locationList={locationList}
                    setLocationId={setLocationId}
                />
            </div>
            <div className='rounded-full h-full w-1/2 relative flex flex-wrap sb-date-container'>
                <DateOption
                    date={date}
                    setDate={setDate}
                />
            </div>
            <div className="rounded-full h-full w-1/4 cursor-pointer">
                <PeopleOption
                    people={people}
                    setPeople={setPeople}
                    handleSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}