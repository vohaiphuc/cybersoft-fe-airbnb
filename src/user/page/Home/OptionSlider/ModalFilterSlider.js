import { Button, Checkbox, ConfigProvider, InputNumber, Modal, Slider } from 'antd';
import React, { useEffect, useState } from 'react'
import useDevice from '../../../hook/useDevice';
import { useDispatch, useSelector } from 'react-redux';
import { resetRoomFilter, setRoomFilteredOptions, setRoomListFiltered } from '../../../redux/homeSlice';
import { usePopup } from '../../../component/Popup/hook/usePopup';

export default function ModalFilterSlider() {
    const popup = usePopup()
    const dispatch = useDispatch()
    const list = useSelector(s => s.homeSlice.listAll)
    const [modalSearch, setModalSearch] = useState(list);

    const { options } = useSelector(state => state.homeSlice)
    const [rangeGiaTien, setRangeGiaTien] = useState(options.rangeGiaTien)
    const [phongNgu, setPhongNgu] = useState(options.phongNgu)
    const [giuong, setGiuong] = useState(options.giuong)
    const [phongTam, setPhongTam] = useState(options.phongTam)
    const [wifi, setWifi] = useState(options.wifi)
    const [mayGiat, setMayGiat] = useState(options.mayGiat)
    const [dieuHoa, setDieuHoa] = useState(options.dieuHoa)
    const [bep, setBep] = useState(options.bep)
    const [banUi, setBanUi] = useState(options.banUi)
    const [hoBoi, setHoBoi] = useState(options.hoBoi)

    const checkboxInfo = [
        { checked: wifi, changeState: setWifi, title: "Wifi" },
        { checked: mayGiat, changeState: setMayGiat, title: "Máy giặt" },
        { checked: dieuHoa, changeState: setDieuHoa, title: "Điều hòa" },
        { checked: bep, changeState: setBep, title: "Bếp" },
        { checked: banUi, changeState: setBanUi, title: "Bàn ủi" },
        { checked: hoBoi, changeState: setHoBoi, title: "Hồ bơi" },
    ]

    const getGiaTien = () => {
        let giaTienList = list.map(item => item.giaTien).filter(item => item > 0)
        let max = giaTienList.reduce((prev, current) => current > prev ? current : prev, 0)
        let min = giaTienList.reduce((prev, current) => current < prev ? current : prev, max)
        return [min, max]
    }
    const [minGiaTien, maxGiaTien] = getGiaTien()

    useEffect(() => {
        if (list) {
            const filter = filterOption()
            setModalSearch(filter)
        }
    }, [rangeGiaTien.start, rangeGiaTien.end, phongNgu, giuong, phongTam, wifi, mayGiat, dieuHoa, bep, banUi, hoBoi])
    const filterOption = () => {
        let filter = [...list]

        filter = filter.filter(item =>
            item.giaTien >= rangeGiaTien.start && item.giaTien <= rangeGiaTien.end
        )

        let phongList = { phongNgu, giuong, phongTam }
        for (var phong in phongList) {
            filter = (phongList[phong] > 0) ? filter.filter(item => item[phong] === phongList[phong]) : filter
        }

        let tienNghiList = { wifi, mayGiat, dieuHoa, bep, banUi, hoBoi }
        for (var tienNghi in tienNghiList) {
            filter = (tienNghiList[tienNghi]) ? filter.filter(item => item[tienNghi]) : filter
        }

        return filter
    }

    const handleOk = () => {
        if (modalSearch.length > 0) {
            dispatch(setRoomListFiltered(modalSearch))
            handleCancel()
        }
    };
    const handleCancel = () => {
        dispatch(setRoomFilteredOptions({
            rangeGiaTien, phongNgu, giuong, phongTam, wifi, mayGiat, dieuHoa, bep, banUi, hoBoi
        }))
        popup.close()
    }
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#000000'
                },
            }}
        >
            <Modal title="Bộ lọc" open onOk={handleOk} onCancel={handleCancel} wrapClassName="modal-filter-home" width={300}
                footer={
                    <div className='flex items-center justify-between'>
                        <a className='font-semibold text-black underline'
                            onClick={() => dispatch(resetRoomFilter())}
                        >Xóa tất cả</a>
                        <Button onClick={handleOk}>
                            Hiển thị {modalSearch && modalSearch.length + " nhà"}
                        </Button>
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
                            // defaultValue={minGiaTien}
                            value={rangeGiaTien.start}
                            min={minGiaTien} max={rangeGiaTien.end}
                            onChange={(value) => setRangeGiaTien({ ...rangeGiaTien, start: value })}
                        />
                        <InputNumber
                            controls={false}
                            // defaultValue={maxGiaTien}
                            value={rangeGiaTien.end}
                            min={rangeGiaTien.start} max={maxGiaTien}
                            onChange={(value) => setRangeGiaTien({ ...rangeGiaTien, end: value })}
                        />
                    </div>
                </div>
                <div className='mb-5'>
                    <p className='text-xl font-semibold'>Phòng và phòng ngủ</p>
                    <ButtonPhong title="Phòng ngủ" phong={phongNgu} setPhong={setPhongNgu} />
                    <ButtonPhong title="Giường" phong={giuong} setPhong={setGiuong} />
                    <ButtonPhong title="Phòng tắm" phong={phongTam} setPhong={setPhongTam} />
                </div>
                <div className='mb-5'>
                    <p className='text-xl font-semibold'>Tiện nghi</p>
                    <p className='text-lg font-semibold'>Đồ dùng thiết yếu</p>
                    <div className='grid grid-cols-2 space-y-1'>
                        {checkboxInfo.map(({ checked, title, changeState }) => (
                            <Checkbox key={title} checked={checked} className='items-center'
                                onChange={e => changeState(e.target.checked)}
                            >{title}
                            </Checkbox>
                        ))}
                    </div>
                </div>
            </Modal>
        </ConfigProvider>
    )
}

const ButtonPhong = ({ title, phong, setPhong }) => {
    const { isMobile } = useDevice()
    const buttonList = isMobile ? [1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div>
            <p className='text-lg font-semibold'>{title}</p>
            <div className="flex items-center justify-between">
                <Button
                    type={phong == 0 ? 'primary' : 'default'}
                    ghost={phong == 0}
                    onClick={() => { setPhong(0) }}
                >
                    Bất kì
                </Button>
                {buttonList.map(item =>
                    <Button
                        type={phong == item ? 'primary' : 'default'}
                        ghost={phong == item}
                        key={item} onClick={() => { setPhong(item) }}
                    >
                        {item}
                    </Button>
                )}
            </div>
        </div>
    )
}