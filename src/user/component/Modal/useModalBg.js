import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import modalSlice, { openModal } from '../../redux/modalSlice'

export default function useModalBg() {
    const dispatch = useDispatch()
    const isOpenModal = useSelector(s => s.modalSlice.open)

    return {
        isOpenModal,
        openModal: () => { dispatch(openModal(true)) },
        closeModal: () => { dispatch(openModal(false)) },
    }
}
