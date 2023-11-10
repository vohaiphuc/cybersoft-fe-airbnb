import React, { useState } from 'react'
import LocationOption from './SearchOption/LocationOption';
import PeopleOption from './SearchOption/PeopleOption';
import DateOption from './SearchOption/DateOption';
import { useSelector } from 'react-redux';
import useModalBg from '../../Modal/useModalBg';

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
    const { isOpenModal } = useModalBg()


    const [activeInput, setActiveInput] = useState({
        location: false,
        startDate: false,
        endDate: false,
        people: false,
    });

    const handleSetActiveInput = (input, state) => {
        if (activeInput[input] && state == true) {
            return
        }

        let newActiveInput = {
            location: false,
            startDate: false,
            endDate: false,
            people: false,
        }

        newActiveInput[input] = state
        setActiveInput(newActiveInput)
    }

    const handleSubmit = () => {
        const input = {
            locationId,
            dateStart: date[0],
            dateEnd: date[1],
            people
        }
        console.log(input);
    }

    return (
        <div className={`bg-white border-2 rounded-full h-16 flex items-center ${isOpenModal && 'relative z-30'}`}>
            <div className='rounded-full h-full w-1/4 overflow-hidden cursor-pointer'>
                <LocationOption
                    locationList={locationList}
                    setLocationId={setLocationId}
                    isActive={activeInput.location}
                    handleSetActiveInput={handleSetActiveInput}
                />
            </div>
            <div className='rounded-full h-full w-1/2 relative flex'>
                <DateOption
                    date={date}
                    setDate={setDate}
                    activeInput={activeInput}
                    handleSetActiveInput={handleSetActiveInput}
                />
            </div>
            <div className="rounded-full h-full w-1/4 cursor-pointer">
                <PeopleOption
                    people={people}
                    setPeople={setPeople}
                    handleSubmit={handleSubmit}
                    isActive={activeInput.people}
                    handleSetActiveInput={handleSetActiveInput}
                />
            </div>
        </div>
    )
}