import { Select } from 'antd'
import React from 'react'
import { slugify } from './utils'

export default function LocationSearch({ locationList, setLocationId, active, handleSetActiveInput }) {
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
            className={`rounded-full w-full h-full sb-location cursor-pointer ${active && 'active'}`}
            onClick={() => { handleSetActiveInput('location', true) }}
            onBlur={() => { handleSetActiveInput('location', false) }}
        />
    )
}
