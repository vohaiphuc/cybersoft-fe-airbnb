import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: []
}

const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setLogin } = adminSlice.actions
export default adminSlice.reducer