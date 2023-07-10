import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface State {
    data: {
        title: string
    }[]
}
const initialState: State = {
    data: [
        { title: 'Investigation 10' },
        { title: 'Investigation 20' },
        { title: 'Investigation 30' },
    ],
}

export const investigationsSlice = createSlice({
    name: 'investigations',
    initialState,
    reducers: {
        addInvestigation: (state, action: PayloadAction<string>) => {
            state.data.push({ title: action.payload })
        },
    },
})

// Action creators are generated for each case reducer function
export const { addInvestigation } = investigationsSlice.actions
export default investigationsSlice.reducer
