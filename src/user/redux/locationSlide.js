import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    list: []
}

const locationSlide = createSlice({
    name: "locationSlide",
    initialState,
    reducers: {
        setLocationList: (state, action) => { state.list = action.payload }
    }
});

export const { setLocationList } = locationSlide.actions

export default locationSlide.reducer