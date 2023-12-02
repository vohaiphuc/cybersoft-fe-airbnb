import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listAll: [],
    listFiltered: [],
    options: {
        rangeGiaTien: { start: 0, end: 0 },
        phongNgu: 0,
        giuong: 0,
        phongTam: 0,
        wifi: false,
        mayGiat: false,
        dieuHoa: false,
        bep: false,
        banUi: false,
        hoBoi: false,
    },
    modalKey: Math.random(),
}

const getGiaTien = (list) => {
    let giaTienList = list.map(item => item.giaTien).filter(item => item > 0)
    let max = giaTienList.reduce((prev, current) => current > prev ? current : prev, 0)
    let min = giaTienList.reduce((prev, current) => current < prev ? current : prev, max)
    return { start: min, end: max }
}

const homeSlice = createSlice({
    name: 'homeSlice',
    initialState,
    reducers: {
        setRoomListAll: (state, action) => {
            state.listAll = action.payload
            state.listFiltered = action.payload
            state.options = { ...state.options, rangeGiaTien: getGiaTien(action.payload) }
        },
        setRoomListFiltered: (state, action) => { state.listFiltered = action.payload },
        setRoomFilteredOptions: (state, action) => { state.options = action.payload },
        resetRoomFilter: (state) => {
            state.options = {
                ...initialState.options,
                rangeGiaTien: getGiaTien(state.listAll)
            }
            state.modalKey = Math.random()
            state.listFiltered = state.listAll
        },
    }
});

export const { setRoomListAll, setRoomListFiltered, setRoomFilteredOptions, resetRoomFilter } = homeSlice.actions

export default homeSlice.reducer