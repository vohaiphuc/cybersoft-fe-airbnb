import React, { useEffect, useRef } from 'react'
import useModalBg from './useModalBg'
import { useDispatch } from 'react-redux'
import { setActiveIndex } from '../../redux/activeSearchbarSlice'

export default function ModalBg() {
    const { isOpenModal, openModal, closeModal } = useModalBg()
    const ref = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClick = (e) => {
            if (ref.current && ref.current.contains(e.target)) {
                handleCloseModal()
            }
        }

        const handleCloseModal = () => {
            closeModal()
            dispatch(setActiveIndex(null))
        }

        document.addEventListener("click", handleClick)
        document.addEventListener("scroll", handleCloseModal)

        return () => {
            document.removeEventListener("click", handleClick)
            document.removeEventListener("scroll", handleCloseModal)
        }

    }, [])


    return isOpenModal && (
        <div ref={ref} className='w-screen h-screen fixed top-0 left-0 bg-neutral-500 opacity-50 z-20'></div>
    )
}