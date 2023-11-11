import { Button, ConfigProvider, DatePicker, Input } from 'antd';
import React from 'react'
import DateInput from './DateInput';
import useModalBg from '../../../Modal/useModalBg';
import useActiveInput from './useActiveInput';
import { useEffect } from 'react';
import { useState } from 'react';

const { RangePicker } = DatePicker
const startDate = 'startDate'
const endDate = 'endDate'

export default function DateOption({ date, setDate }) {

    const { isOpenModal } = useModalBg()
    const { activeIndex, setActiveIndex } = useActiveInput()
    const key1 = 1
    const key2 = 2
    const active = (activeIndex == key1 || activeIndex == key2) && isOpenModal

    const handleCalendarChange = ([start, end]) => {
        if (activeIndex == key1 && start) {
            setDate([start, end])
            handleChangeActiveIndex(key2)
        }
        else if (activeIndex == key2 && end) {
            setDate([start, end])
        }
    }

    const handleChangeActiveIndex = (key) => {
        setActiveIndex(key)
    }

    return (
        <>
            <DateInput dateInfo={startDate} title="Nhận phòng"
                indexKey={key1} date={date}
            />
            <DateInput dateInfo={endDate} title="Trả phòng"
                indexKey={key2} date={date}
            />
            <div className="w-full -z-10 -translate-y-full">
                <ThemeRangePicker>
                    <RangePicker
                        open={active}
                        format='DD/MM/YYYY'
                        style={{ width: "100%", border: 0 }}
                        onCalendarChange={handleCalendarChange}
                        value={date}
                        activePickerIndex={activeIndex == 1 ? 0 : 1}
                        renderExtraFooter={() =>
                            <Button className='float-right my-2 '
                                onClick={() => {
                                    handleChangeActiveIndex(key1)
                                    setDate(null)
                                }}
                            >Xóa tất cả</Button>
                        }
                    />
                </ThemeRangePicker>
            </div>
        </>
    )
}

const ThemeRangePicker = ({ children }) => {
    return <ConfigProvider
        theme={{
            components: {
                DatePicker: {
                    cellActiveWithRangeBg: "#f6f6f6",
                    cellHoverWithRangeBg: "#f6f6f6",
                    cellRangeBorderColor: "#000"
                },
            },
            token: {
                colorPrimary: "#000",
            }
        }}
    >
        {children}
    </ConfigProvider>
}
