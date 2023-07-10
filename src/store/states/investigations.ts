import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InvestigationViewModel } from '../../types/Investigations'

interface State {
    data: InvestigationViewModel[]
    state: 'fetching' | 'finished'
}

const initialState: State = {
    state: 'finished',
    data: [],
}

const startInvestigation = createAsyncThunk(
    'investigations/start',
    async (args: File, thunkApi) => {

    }
)

export const investigationsSlice = createSlice({
    name: 'investigations',
    initialState,
    reducers: {
        addInvestigation: (
            state,
            action: PayloadAction<InvestigationViewModel>
        ) => {
            state.data.push(action.payload)
        },
    },
})

// Action creators are generated for each case reducer function
export const { addInvestigation } = investigationsSlice.actions
export default investigationsSlice.reducer
