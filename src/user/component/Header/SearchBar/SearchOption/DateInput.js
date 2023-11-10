import React from 'react'
import useModalBg from '../../../Modal/useModalBg'
import moment from 'moment'
import { Input } from 'antd'

export default function DateInput({ activeInput, handleSetActiveInput, date, dateInfo, title }) {
    const { isOpenModal, openModal } = useModalBg()
    const activePickerIndex = dateInfo == 'startDate' ? 0 : 1
    const active = (activeInput[dateInfo] && isOpenModal) ? 'active' : ''

    return <div
        className={`relative h-full w-1/2 z-10 sb-date rounded-full px-5 py-2 text-sm ${active}`}
        onClick={() => { handleSetActiveInput(dateInfo, true); openModal() }}
    >
        <p className='text-gray-500 w-1/2'>{title}</p>
        <Input
            className='absolute w-full h-full top-0 left-0 pl-5 pt-6'
            readOnly
            bordered={false}
            placeholder="DD/MM/YYYY"
            value={(date && date[activePickerIndex])
                ? moment(new Date(date[activePickerIndex])).format("DD/MM/YYYY")
                : null}
        />
    </div>
}
