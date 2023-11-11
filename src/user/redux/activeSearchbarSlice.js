import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    index: null,
}

const activeSearchbarSlice = createSlice({
    name: 'activeSearchbarSlice',
    initialState,
    reducers: {
        setActiveIndex: (state, action) => { state.index = action.payload }
    }
});

export const { setActiveIndex } = activeSearchbarSlice.actions

export default activeSearchbarSlice.reducer