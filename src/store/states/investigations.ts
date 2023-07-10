import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InvestigationViewModel } from '../../types/Investigations'
import { investigationsApi } from '../../api/investigations'

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
        const { id } = await investigationsApi.create()
        await investigationsApi.uploadDocument(id, args)
        await investigationsApi.summarize(id)

        thunkApi.dispatch(
            investigationsSlice.actions.addInvestigation({
                id,
                state: 'PROCESSING',
                title: args.name,
            })
        )
    }
)

const fetchInvestigation = createAsyncThunk(
    'investigations/fetch',
    async (args: string, thunkApi) => {
            const response = await investigationsApi.summarize(args)
            if (!response?.summary) return

            //@ts-expect-error
            const state: State = thunkApi.getState().investigations;
            const investigation = state.data.find(i => i.id === args);

            investigation!.summary = response.summary;
            investigation!.state = 'PROCESSED';
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

export { startInvestigation, fetchInvestigation }
export default investigationsSlice.reducer
