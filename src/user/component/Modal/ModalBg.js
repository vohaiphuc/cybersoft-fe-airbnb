import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../redux/modalSlice'

export default function ModalBg() {
    const dispatch = useDispatch()
    const open = useSelector(state => state.modalSlice.open)
    const ref = useRef()

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                closeModal()
            }
        }

        const closeModal = () => {
            dispatch(openModal(false))

        }

        document.addEventListener("click", handleClick)
        document.addEventListener("scroll", closeModal)

        return () => {
            document.removeEventListener("click", handleClick)
            document.removeEventListener("scroll", closeModal)
        }

    }, [])


    return open && (
        <div ref={ref} className='w-screen h-screen fixed top-0 left-0 bg-neutral-500 opacity-50 z-20'></div>
    )
}