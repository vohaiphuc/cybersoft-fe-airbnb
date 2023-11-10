import { Button, ConfigProvider, DatePicker, Input } from 'antd';
import React from 'react'
import DateInput from './DateInput';
import useModalBg from '../../../Modal/useModalBg';

const { RangePicker } = DatePicker
const startDate = 'startDate'
const endDate = 'endDate'

export default function DateOption({ activeInput, handleSetActiveInput, date, setDate }) {

    const { isOpenModal } = useModalBg()
    const active = (activeInput.startDate || activeInput.endDate) && isOpenModal

    const handleCalendarChange = ([start, end]) => {
        if (activeInput[startDate] && start) {
            setDate([start, end])
            handleSetActiveInput(endDate, true)
        }
        else if (activeInput[endDate] && end) {
            setDate([start, end])
        }
    }

    return (
        <>
            <DateInput dateInfo={startDate} title="Nhận phòng"
                activeInput={activeInput} date={date}
                handleSetActiveInput={handleSetActiveInput}
            />
            <DateInput dateInfo={endDate} title="Trả phòng"
                activeInput={activeInput} date={date}
                handleSetActiveInput={handleSetActiveInput}
            />

            {active &&
                <div className="absolute bottom-0 left-0 w-full -z-10">
                    <ThemeRangePicker>
                        <RangePicker
                            open={active}
                            format='DD/MM/YYYY'
                            style={{ width: "100%", border: 0 }}
                            onCalendarChange={handleCalendarChange}
                            value={date}
                            activePickerIndex={activeInput.startDate ? 0 : 1}
                            renderExtraFooter={() =>
                                <Button className='float-right my-2 '
                                    onClick={() => { handleSetActiveInput(startDate, true); setDate(null) }}
                                >Xóa tất cả</Button>
                            }
                        />
                    </ThemeRangePicker>
                </div>
            }
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
