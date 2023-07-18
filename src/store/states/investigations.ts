import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InvestigationViewModel } from '../../types/Investigations'
import { investigationsApi } from '../../api/investigations'
import { RootState } from '..'
import { delay } from '../../utils/delay'
interface State {
    data: InvestigationViewModel[]
}

const initialState: State = {
    data: []
}

const createInvestigation = createAsyncThunk(
    'investigations/start',
    async (
        args: {
            files: File[]
            name: string
        },
        thunkApi
    ) => {
        const { files, name } = args
        const result = await investigationsApi.create()
        const { id } = result

        await investigationsApi.updateTitle(result.id, name)

        thunkApi.dispatch(
            investigationsSlice.actions.addInvestigation({
                ...result,
                title: name,
                state: 'PROCESSING',
            })
        )

        await investigationsApi.summarize(id, files)
        thunkApi.dispatch(fetchUntilProcessed(id))

        return result
    }
)

const fetchUntilProcessed = createAsyncThunk(
    'investigations/fetchUntilProcessed',
    async (id: string, thunkApi) => {
        await thunkApi.dispatch(fetchInvestigation(id))

        const state: RootState = thunkApi.getState() as RootState
        const result = state.investigations.data.some(
            (i) => i.id === id && i.state === 'PROCESSED'
        )

        console.log(`RESULT FOR ${id}: `, result)

        if (!result) {
            await delay(5000)
            thunkApi.dispatch(fetchUntilProcessed(id))
        }
    }
)

const fetchInvestigation = createAsyncThunk(
    'investigations/fetch',
    async (id: string, thunkApi) => {
        const response = await investigationsApi.getSummary(id)
        if (!response?.summary) return

        //@ts-expect-error
        const state: State = thunkApi.getState().investigations
        const investigation = state.data.find((i) => i.id === id)

        if (!investigation) return

        thunkApi.dispatch(
            investigationsSlice.actions.updateInvestigation({
                ...investigation,
                state: 'PROCESSED',
                title: investigation.title,
                summary: response,
            })
        )
    }
)

const fetchInvestigations = createAsyncThunk(
    'investigations/list',
    async (_, thunkApi) => {
        const response = await investigationsApi.list()
        const items = response.map(
            (i) =>
                ({
                    ...i,
                    state: 'PROCESSING',
                } as InvestigationViewModel)
        )

        for (const item of items)
            thunkApi.dispatch(fetchUntilProcessed(item.id))

        return items
    }
)

export const investigationsSlice = createSlice({
    name: 'investigations',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchInvestigations.fulfilled, (state, action) => {
            state.data = action.payload
        })
    },
    reducers: {
        addInvestigation: (
            state,
            action: PayloadAction<InvestigationViewModel>
        ) => {
            state.data.push(action.payload);    
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

export { createInvestigation, fetchInvestigations }
export const selectInvestigations = (state: RootState): State =>
    state.investigations
export default investigationsSlice.reducer
