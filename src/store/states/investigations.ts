import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InvestigationViewModel } from '../../types/Investigations'
import { investigationsApi } from '../../api/investigations'

interface State {
    data: InvestigationViewModel[]
}

const initialState: State = {
    data: []
}

const createInvestigation = createAsyncThunk(
    'investigations/start',
    async (args: File, thunkApi) => {
        const { id } = await investigationsApi.create();

        thunkApi.dispatch(investigationsSlice.actions.addInvestigation({
            id,
            title: args.name,
            state: 'PROCESSING',
        }));

        await investigationsApi.uploadDocument(id, args)
        await investigationsApi.summarize(id)
    }
)

const fetchInvestigation = createAsyncThunk(
    'investigations/fetch',
    async (id: string, thunkApi) => {
        const response = await investigationsApi.summarize(id)
        if (!response?.summary) return

        //@ts-expect-error
        const state: State = thunkApi.getState().investigations
        const investigation = state.data.find((i) => i.id === id)

        if (!investigation) return

        investigation.summary = response.summary
        investigation.state = 'PROCESSED'
        thunkApi.dispatch(investigationsSlice.actions.updateInvestigation(investigation));
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

        updateInvestigation: (
            state,
            action: PayloadAction<InvestigationViewModel>
        ) => {
            const index = state.data.findIndex(
                (inv) => inv.id === action.payload.id
            )

            if (index === -1) return

            state.data[index] = action.payload
        },
    },
})

export { createInvestigation, fetchInvestigation }
export default investigationsSlice.reducer
