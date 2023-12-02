import "./asset/style.scss"
import React, { useEffect, useState } from 'react'
import { roomServ } from '../../api/api'
import OptionSlider from './OptionSlider/OptionSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomListAll } from "../../redux/homeSlice"
import ListRoom from './ListRoom/ListRoom';

export default function Home() {
    const dispatch = useDispatch()

    useEffect(() => {
        roomServ.get()
            .then((res) => {
                dispatch(setRoomListAll(res.data.content))
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    return <div className='space-y-3 lg:space-y-5 mb-3 lg:my-5'>
        <OptionSlider />
        <ListRoom />
    </div>
}