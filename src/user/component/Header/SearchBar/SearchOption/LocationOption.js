import { Select } from 'antd'
import React from 'react'
import { slugify } from '../utils'
import useModalBg from '../../../Modal/useModalBg'
import useActiveInput from './useActiveInput'

export default function LocationOption({ locationList, setLocationId }) {
    const { isOpenModal, openModal } = useModalBg()

    const { activeIndex, setActiveIndex } = useActiveInput()

    const key = 0
    const active = (activeIndex == key && isOpenModal)

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
            onClick={() => { setActiveIndex(key); openModal() }}
            onBlur={() => { setActiveIndex(null); }}
        />
    )
}
