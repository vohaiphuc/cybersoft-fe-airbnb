import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, ConfigProvider, Input, InputNumber, Modal, Slider } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react'

export default function FilterModal({ list, handleFilterRoom, resetModal }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fitlerResult, setFitlerResult] = useState(null)

    const [rangeGiaTien, setRangeGiaTien] = useState({ start: 0, end: 0 })
    const [phongNgu, setPhongNgu] = useState(0);
    const [giuong, setGiuong] = useState(0);
    const [phongTam, setPhongTam] = useState(0);

    const [wifi, setWifi] = useState(false);
    const [mayGiat, setMayGiat] = useState(false);
    const [dieuHoa, setDieuHoa] = useState(false);
    const [bep, setBep] = useState(false);
    const [banUi, setBanUi] = useState(false);
    const [hoBoi, setHoBoi] = useState(false);

    useEffect(() => {
        if (list) {
            setRangeGiaTien({ start: minGiaTien, end: maxGiaTien })
            setFitlerResult(list)
        }
    }, [list])

    useEffect(() => {
        // UPDATE FITLER RESULT
        if (list) {
            updateFilterResult()
        }
    }, [rangeGiaTien,
        phongNgu, giuong, phongTam,
        wifi,
        mayGiat,
        dieuHoa,
        bep,
        banUi,
        hoBoi,])

    const updateFilterResult = () => {
        let filter = [...list]

        // gia tien
        filter = filter.filter(item =>
            item.giaTien >= rangeGiaTien.start && item.giaTien <= rangeGiaTien.end
        )

        filter = (phongNgu > 0) ? filter.filter(item => item.phongNgu == phongNgu) : filter
        filter = (giuong > 0) ? filter.filter(item => item.giuong == giuong) : filter
        filter = (phongTam > 0) ? filter.filter(item => item.phongTam == phongTam) : filter

        // tien nghi

        filter = (wifi) ? filter.filter(item => item.wifi) : filter
        filter = (mayGiat) ? filter.filter(item => item.mayGiat) : filter
        filter = (dieuHoa) ? filter.filter(item => item.dieuHoa) : filter
        filter = (bep) ? filter.filter(item => item.bep) : filter
        filter = (banUi) ? filter.filter(item => item.banUi) : filter
        filter = (hoBoi) ? filter.filter(item => item.hoBoi) : filter

        setFitlerResult(filter)
    }


    const getGiaTien = () => {
        let giaTienList = list?.map(item => item.giaTien).filter(item => item > 0)
        let max = giaTienList?.reduce((prev, current) => current > prev ? current : prev, 0)
        let min = giaTienList?.reduce((prev, current) => current < prev ? current : prev, max)
        return [min, max]
    }
    const [minGiaTien, maxGiaTien] = getGiaTien()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        if (fitlerResult.length > 0) {
            handleFilterRoom(fitlerResult)
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const buttonPhong = (setPhongFn, phong) => {
        const buttonList = [1, 2, 3, 4, 5, 6, 7, 8]
        return <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000',
                },
            }}
        >
            <Button
                type={phong == 0 ? 'primary' : 'default'}
                ghost={phong == 0}
                onClick={() => { setPhongFn(0) }}
            >Bất kì
            </Button>
            {buttonList.map(item =>
                <Button
                    type={phong == item ? 'primary' : 'default'}
                    ghost={phong == item}
                    key={item} onClick={() => { setPhongFn(item) }}>{item}</Button>
            )}
        </ConfigProvider>
    }


    return (
        <>
            <div className='flex items-center space-x-3 border-[1px] px-5 py-4 rounded-lg cursor-pointer'
                onClick={showModal}>
                <FontAwesomeIcon icon={faSliders} />
                <span className='text-xs'>Bộ lọc</span>
            </div>

            <Modal title="Bộ lọc" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} key={list}
                footer={
                    <div className='flex items-center justify-between'>
                        <a className='font-semibold text-black underline'
                            onClick={() => { resetModal(); updateFilterResult() }}>Xóa tất cả</a>
                        <Button onClick={handleOk}>Hiển thị {fitlerResult && fitlerResult.length + " nhà"}</Button>
                    </div>
                }
            >
                <div className='mb-5'>
                    <p className='text-xl font-semibold'>Khoảng giá</p>
                    <Slider range
                        min={minGiaTien} max={maxGiaTien}
                        value={[rangeGiaTien.start, rangeGiaTien.end]}
                        onChange={(value) => setRangeGiaTien({ start: value[0], end: value[1] })}
                    />
                    <div className="flex items-center justify-between space-x-5">
                        <InputNumber
                            controls={false}
                            defaultValue={minGiaTien}
                            value={rangeGiaTien.start}
                            min={minGiaTien} max={rangeGiaTien.end}
                            onChange={(value) => setRangeGiaTien({ ...rangeGiaTien, start: value })}
                        />
                        <InputNumber
                            controls={false}
                            defaultValue={maxGiaTien}
                            value={rangeGiaTien.end}
                            min={rangeGiaTien.start} max={maxGiaTien}
                            onChange={(value) => setRangeGiaTien({ ...rangeGiaTien, end: value })}
                        />
                    </div>
                </div>
                <div className='mb-5'>

                    <p className='text-xl font-semibold'>Phòng và phòng ngủ</p>
                    <div>
                        <p className='text-lg font-semibold'>Phòng ngủ</p>
                        <div className="flex items-center justify-between">
                            {buttonPhong(setPhongNgu, phongNgu)}
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Giường</p>
                        <div className="flex items-center justify-between">
                            {buttonPhong(setGiuong, giuong)}
                        </div>
                    </div>
                    <div>
                        <p className='text-lg font-semibold'>Phòng tắm</p>
                        <div className="flex items-center justify-between">
                            {buttonPhong(setPhongTam, phongTam)}
                        </div>
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='text-xl font-semibold'>Tiện nghi</p>
                    <p className='text-lg font-semibold'>Đồ dùng thiết yếu</p>
                    <div className='grid grid-cols-2'>
                        <Checkbox onChange={(e) => setWifi(e.target.checked)}>Wifi</Checkbox>
                        <Checkbox onChange={(e) => setMayGiat(e.target.checked)}>Máy giặt</Checkbox>
                        <Checkbox onChange={(e) => setDieuHoa(e.target.checked)}>Điều hòa</Checkbox>
                        <Checkbox onChange={(e) => setBep(e.target.checked)}>Bếp</Checkbox>
                        <Checkbox onChange={(e) => setBanUi(e.target.checked)}>Bàn ủi</Checkbox>
                        <Checkbox onChange={(e) => setHoBoi(e.target.checked)}>Hồ bơi</Checkbox>
                    </div>
                </div>
            </Modal>
        </>
    )
}
