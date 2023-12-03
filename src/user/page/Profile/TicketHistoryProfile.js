import React, { useEffect, useState } from 'react'
import { bookingRoomServ, roomServ } from '../../api/api'
import moment from 'moment';
import 'moment/locale/vi'
import { NavLink } from 'react-router-dom';
import { userRoute } from '../../route/userRoute';

export default function TicketHistoryProfile({ user }) {
    const [bookingList, setBookingList] = useState(null)
    const [roomList, setRoomList] = useState(null);

    useEffect(() => {
        bookingRoomServ.getList()
            .then((res) => {
                const list = res.data.content.filter(item => item.maNguoiDung === user.id)
                setBookingList(list)
            })
            .catch((err) => {
                console.log(err);
            });
        roomServ.get()
            .then((res) => {
                const list = res.data.content
                setRoomList(list)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user.id])

    bookingList?.forEach(booking => {
        const room = roomList?.filter(room => room.id === booking.maPhong)
        booking.roomDetail = room ? room[0] : null
    })

    const renderBooking = () => {
        return bookingList?.map(item => {
            const Ngay = () => {
                const ngayDen = moment(item.ngayDen).locale("vi")
                const ngayDi = moment(item.ngayDi).locale("vi")
                if (ngayDen.year() == ngayDi.year() && ngayDen.month() == ngayDi.month()) {
                    return <p className=''>{`${ngayDen.format("DD")}-${ngayDi.format("DD")} ${ngayDen.format("MMM")}, ${ngayDen.format("YYYY")}`}</p>
                } else {
                    return <>
                        <p className=''>Ngày đến: {moment(item.ngayDen).format("DD/MM/YYYY")}</p>
                        <p className=''>Ngày đi: {moment(item.ngayDi).format("DD/MM/YYYY")}</p>
                    </>
                }
            }

            return <div className="flex space-x-5" key={item.maPhong}>
                <NavLink to={userRoute.detail.id(item.maPhong)}>
                    <img src={item.roomDetail?.hinhAnh} alt="" className='rounded object-cover' style={{ width: 100, height: 100, maxWidth: 'unset' }} />
                </NavLink>
                <div className=''>
                    <NavLink to={userRoute.detail.id(item.maPhong)}>
                        <b>{item.roomDetail?.tenPhong}</b>
                    </NavLink>
                    <Ngay />
                </div>
            </div>
        })
    }

    return (
        <div className='my-5 space-y-5 max-w-md'>
            <p className='text-2xl font-semibold'>Lịch sử đặt vé</p>
            {renderBooking()}
        </div>
    )
}
