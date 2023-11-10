import { Select } from 'antd'
import React from 'react'
import { slugify } from '../utils'
import useModalBg from '../../../Modal/useModalBg'

export default function LocationOption({ locationList, setLocationId, isActive, handleSetActiveInput }) {
    const { isOpenModal, openModal } = useModalBg()
    const active = isActive && isOpenModal

    const handleFilter = (inputValue, option) => {
        let label = slugify(option.label.toLowerCase())
        let input = slugify(inputValue.toLowerCase())
        return label.indexOf(input) > -1
    }

    return (
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
            open={active}
            className={`rounded-full w-full h-full sb-location cursor-pointer ${active && 'active'} z-30`}
            onClick={() => { handleSetActiveInput('location', true); openModal() }}
            onBlur={() => { handleSetActiveInput('location', false) }}
        />
    )
}
