import { Button, ConfigProvider, DatePicker, Input } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react'

const { RangePicker } = DatePicker

export default function DateOption({ activeInput, handleSetActiveInput, date, setDate }) {

    useEffect(() => {
        let calendar = document.getElementsByClassName("calendar-dropdown")[0]

        const handleClick = (e) => {
            console.log("Enddate on click event");
            if (calendar.contains(e.target) == false) {
                handleSetActiveInput('startDate', false)
            }
        }
        if (activeInput.endDate || activeInput.startDate) {
            document.addEventListener("mousedown", handleClick)
        }
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [activeInput.startDate, activeInput.endDate])


    const handleCalendarChange = ([startDate, endDate]) => {
        if (activeInput.startDate && startDate) {
            setDate([startDate, endDate])
            handleSetActiveInput('endDate', true)
        }
        else if (activeInput.endDate && endDate) {
            setDate([startDate, endDate])
        }
    }


    return (
        <>
            <div
                className={`relative h-full w-1/2 z-10 sb-date rounded-full px-5 py-2 text-sm ${activeInput.startDate && 'active'}`}
                onClick={() => { handleSetActiveInput('startDate', true) }}
            >
                <p className='text-gray-500 w-1/2'>Nhận phòng</p>
                <Input
                    className='absolute w-full h-full top-0 left-0 pl-5 pt-6'
                    onBlur={() => { handleSetActiveInput('startDate', false) }}
                    placeholder="DD/MM/YYYY"
                    value={(date && date[0]) ? moment(new Date(date[0])).format("DD/MM/YYYY") : null}
                    readOnly
                    bordered={false}
                    key={date}
                />
            </div>
            <div
                className={`relative h-full w-1/2 z-10 sb-date rounded-full px-5 py-2 text-sm ${activeInput.endDate && 'active'}`}
                onClick={() => { handleSetActiveInput('endDate', true) }}
            >
                <p className='text-gray-500 w-1/2'>Trả phòng</p>
                <Input
                    className='absolute w-full h-full top-0 left-0 pl-5 pt-6'
                    onBlur={() => { console.log(123); handleSetActiveInput('endDate', false) }}
                    placeholder="DD/MM/YYYY"
                    value={(date && date[1]) ? moment(new Date(date[1])).format("DD/MM/YYYY") : null}
                    readOnly
                    bordered={false}
                    key={date}
                />

            </div>

            <div className="absolute bottom-0 left-0 w-full -z-10">
                <ConfigProvider
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
                    <RangePicker
                        open={activeInput.startDate || activeInput.endDate}
                        format='DD/MM/YYYY'
                        style={{ width: "100%", border: 0 }}
                        onCalendarChange={handleCalendarChange}
                        value={date}
                        activePickerIndex={activeInput.startDate ? 0 : 1}
                        popupClassName='calendar-dropdown'
                        renderExtraFooter={() =>
                            <Button className='float-right my-2 '
                                onClick={() => { handleSetActiveInput('startDate', true); setDate(null) }}
                            >Xóa tất cả</Button>
                        }
                    />

                </ConfigProvider>
            </div>
        </>
    )
}
