import React, { useEffect, useRef, useState } from 'react'
import { Button, ConfigProvider, Input, InputNumber, Select } from 'antd'
import { DatePicker, Space } from 'antd';
import { viTriServ } from '../../../api/api';
import { slugify } from './utils';
import moment from 'moment/moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
const { RangePicker } = DatePicker;

export default function SearchBar() {
    const [locationList, setLocationList] = useState(null);
    const [locationId, setLocationId] = useState("");
    const [date, setDate] = useState("");
    const [people, setPeople] = useState(0);
    const [datePopup, setDatePopup] = useState(false);

    const [activeInput, setActiveInput] = useState({
        location: false,
        startDate: false,
        endDate: false,
        people: false,
    });

    const handleSetActiveInput = (input) => {
        console.log("🚀 ~ file: SearchBar.js:27 ~ handleSetActiveInput ~ input:", activeInput[input])
        setActiveInput({
            ...activeInput,
            [input]: !activeInput[input],
        })
    }

    const refStartDate = useRef()
    const refEndDate = useRef()
    const refPeople = useRef()

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

    const handleFilter = (inputValue, option) => {
        let label = slugify(option.label.toLowerCase())
        let input = slugify(inputValue.toLowerCase())
        return label.indexOf(input) > -1
    }

    return (
        <div className='border-2 rounded-full h-16 flex items-center'>
            <div className='rounded-full h-full overflow-hidden w-1/4 cursor-pointer'
                onClick={() => { handleSetActiveInput('location') }}
            >
                <Select
                    showSearch
                    placeholder="Địa điểm"
                    optionFilterProp="label"
                    filterOption={handleFilter}
                    onChange={(city) => { setLocationId(city) }}
                    allowClear
                    bordered={false}
                    options={locationList?.map(l => (
                        {
                            value: l.id,
                            label: l.tenViTri,
                        }
                    ))}
                    open={activeInput.location}
                    className={`rounded-full w-full h-full sb-location cursor-pointer ${activeInput.location && 'active'}`}
                    onBlur={() => { handleSetActiveInput('location') }}
                />
            </div>
            <div className='rounded-full h-full w-1/2 relative flex '>
                <div
                    className={`h-full w-1/2 z-10 sb-date rounded-full px-5 py-2 text-sm ${activeInput.startDate && 'active'}`}
                    onClick={() => { refStartDate.current.focus(); handleSetActiveInput('startDate') }}
                >
                    <p className='text-gray-500 w-1/2'>Nhận phòng</p>
                    <Input
                        onBlur={() => { handleSetActiveInput('startDate') }}
                        ref={refStartDate}
                        value={date ? moment(new Date(date[0])).format("DD/MM/YYYY") : "DD/MM/YYYY"}
                        readOnly
                        bordered={false}
                    />
                </div>
                <div
                    className={`h-full w-1/2 z-10 sb-date rounded-full px-5 py-2 text-sm ${activeInput.endDate && 'active'}`}
                    onClick={() => { refEndDate.current.focus(); handleSetActiveInput('endDate') }}
                >
                    <p className='text-gray-500 w-1/2'>Trả phòng</p>
                    <Input
                        onBlur={() => { handleSetActiveInput('endDate') }}
                        ref={refEndDate}
                        value={date ? moment(new Date(date[1])).format("DD/MM/YYYY") : "DD/MM/YYYY"}
                        readOnly
                        bordered={false}
                    />
                </div>

                <div className="absolute bottom-0 left-0 w-full -z-10">
                    <RangePicker

                        open={activeInput.startDate}
                        format='DD/MM/YYYY'
                        bordered={false}
                        style={{ width: "100%", border: 0 }}
                        onChange={(date) => { setDate(date) }}
                        separator={null}
                        onBlur={() => { setDatePopup(false) }}
                    />
                </div>
            </div>
            <div className={`relative rounded-full h-full w-1/4 px-5 py-2 flex items-center cursor-pointer sb-people ${activeInput.people && 'active'}`}
            >
                <div className='flex-1'
                    onClick={() => { handleSetActiveInput('people') }}
                >
                    <p className='text-sm text-gray-500 w-1/2'>Khách</p>
                    <Input
                        value={people > 0 ? people + " khách" : ''}
                        placeholder='Thêm khách'
                        bordered={false}
                        readOnly
                    />

                </div>
                <Button className='bg-red-700 text-white rounded-full' onClick={handleSubmit}>Tìm kiếm</Button>
                {activeInput.people &&
                    <div className="absolute w-28 h-12 px-5 bg-red-50 sb-people-popup rounded-3xl flex items-center justify-between" tabIndex="0" ref={refPeople} autoFocus onBlur={() => { handleSetActiveInput('people'); }}>
                        <p>Người lớn</p>
                        <div className="flex items-center justify-between space-x-5" >
                            <FontAwesomeIcon icon={faMinus} onClick={() => { people > 0 && setPeople(people - 1) }} />
                            <span className='w-5 text-center'>{people}</span>
                            <FontAwesomeIcon icon={faPlus} onClick={() => { setPeople(people + 1); }} />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}