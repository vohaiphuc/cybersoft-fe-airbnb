import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: false,
    room: false,
}

const skeletonSlice = createSlice({
    name: 'skeletonSlice',
    initialState,
    reducers: {
        setSkeletonLocation: (state, action) => { state.location = action.payload },
        setSkeletonRoom: (state, action) => { state.room = action.payload },
    }
});

export const { setSkeletonLocation, setSkeletonRoom } = skeletonSlice.actions

export default skeletonSlice.reducer