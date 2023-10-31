import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: []
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setLogin } = userSlice.actions
export default userSlice.reducer