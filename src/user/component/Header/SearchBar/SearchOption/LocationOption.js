import { Select } from 'antd'
import React from 'react'
import { slugify } from '../utils'
import useModalBg from '../../../Modal/useModalBg'
import useActiveInput from './useActiveInput'
import { useRef } from 'react'
import { useEffect } from 'react'

export default function LocationOption({ locationList, setLocationId }) {
    const ref = useRef()
    const { isOpenModal } = useModalBg()
    const { activeIndex, setActiveIndex } = useActiveInput()

    const key = 0
    const active = (activeIndex == key && isOpenModal)

    if (active) {
        ref.current.focus()
    }

    const handleFilter = (inputValue, option) => {
        let label = slugify(option.label.toLowerCase())
        let input = slugify(inputValue.toLowerCase())
        return label.indexOf(input) > -1
    }

    const handleOnclick = () => {
        setActiveIndex(key)
        ref.current.focus()
    }

    return (
        <div className={`rounded-full w-full h-full flex flex-col sb-location pl-5 pt-2 pb-1 ${active && 'active'}`}
            onClick={handleOnclick}
        >
            <span className='text-sm font-medium'>Địa điểm</span>
            <Select
                ref={ref}
                open={active}
                className='pb-1'
                dropdownAlign={{ offset: [-10, 15] }}
                placeholder="Tìm kiếm điểm đến"
                suffixIcon={null} bordered={false} showSearch allowClear
                optionFilterProp="label"
                filterOption={handleFilter}
                options={locationList?.map(l => (
                    {
                        value: l.id,
                        label: l.tenViTri.trim() + ", " + l.tinhThanh.trim(),
                    }
                ))}
                onChange={(city) => { setLocationId(city) }}
            />
        </div>
    )
}
