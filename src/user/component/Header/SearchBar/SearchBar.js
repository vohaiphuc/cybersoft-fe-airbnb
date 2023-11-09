import React, { useEffect, useState } from 'react'
import { viTriServ } from '../../../api/api';
import { slugify } from './utils';
import LocationOption from './SearchOption/LocationOption';
import PeopleOption from './SearchOption/PeopleOption';
import DateOption from './SearchOption/DateOption';

export const activeInputSlug = {
    location: 'location',
    startDate: 'startDate',
    endDate: 'endDate',
    people: 'people',
}

export default function SearchBar() {
    const [locationList, setLocationList] = useState(null);
    const [locationId, setLocationId] = useState("");
    const [date, setDate] = useState("");
    const [people, setPeople] = useState(0);

    const [activeInput, setActiveInput] = useState({
        location: false,
        startDate: false,
        endDate: false,
        people: false,
    });

    const handleSetActiveInput = (input, state) => {
        console.log(activeInput[input], state);

        if (activeInput[input] && state == true) {
            return
        }

        let newActiveInput = {
            location: false,
            startDate: false,
            endDate: false,
            people: false,
        }

        // đang tắt, muốn bật -> bật
        // đang tắt, muốn tắt -> tắt hết
        // đang bật, muốn tắt -> tắt hết
        // đang bật, muốn bật -> giữ nguyên
        // if (!activeInput[input] && state == true) {
        //     newActiveInput[input] = true
        //     setActiveInput(newActiveInput)
        //     console.log(1);

        // } else if (state == false) {
        //     setActiveInput(newActiveInput)
        //     console.log(2);
        // }

        newActiveInput[input] = state
        setActiveInput(newActiveInput)
    }

    useEffect(() => {
        viTriServ.get()
            .then((res) => {
                console.log(res.data.content);
                let list = res.data.content.map(item => {
                    return {
                        ...item,
                        slugTenViTri: slugify(item.tenViTri),
                    }
                })
                setLocationList(list)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

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
        <div className='border-2 rounded-full h-16 flex items-center'>
            <div className='rounded-full h-full w-1/4 overflow-hidden cursor-pointer'>
                <LocationOption
                    locationList={locationList}
                    setLocationId={setLocationId}
                    active={activeInput.location}
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
                    active={activeInput.people}
                    handleSetActiveInput={handleSetActiveInput}
                />
            </div>
        </div>
    )
}