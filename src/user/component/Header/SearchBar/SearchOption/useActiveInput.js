import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveIndex } from '../../../../redux/activeSearchbarSlice'

export default function useActiveInput() {
    const dispatch = useDispatch()
    const activeIndex = useSelector(s => s.activeSearchbarSlice.index)
    return {
        activeIndex,
        setActiveIndex: (index) => { dispatch(setActiveIndex(index)) }
    }
}
