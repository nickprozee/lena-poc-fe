import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
    data: {
        title: string
    }[]
}
const initialState: State = {
    data: [
        { title: 'Sessie 10' },
        { title: 'Sessie 20' },
        { title: 'Sessie 30' },
    ],
}

export const sessionsSlice = createSlice({
    name: 'sessions',
    initialState,
    reducers: {
        addSession: (state, action: PayloadAction<string>) => {
            state.data.push({ title: action.payload })
        },
    },
})

// Action creators are generated for each case reducer function
export const { addSession } = sessionsSlice.actions
export default sessionsSlice.reducer
