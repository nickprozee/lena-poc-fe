import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InvestigationViewModel } from '../../types/Investigations'
import { investigationsApi } from '../../api/investigations'
import { RootState } from '..'
import { delay } from '../../utils/delay'

interface State {
    data: InvestigationViewModel[]
    viewId?: string
}

const initialState: State = {
    data: [],
}

const createInvestigation = createAsyncThunk(
    'investigations/start',
    async (args: File[], thunkApi) => {
        const { id } = await investigationsApi.create()

        thunkApi.dispatch(
            investigationsSlice.actions.addInvestigation({
                id,
                title: args[0].name,
                state: 'PROCESSING',
            })
        )

        thunkApi.dispatch(investigationsSlice.actions.setViewId(id))

        await investigationsApi.uploadDocuments(id, args)
        await thunkApi.dispatch(fetchUntilProcessed(id))
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
        const response = await investigationsApi.summarize(id)
        if (!response?.summary) return

        //@ts-expect-error
        const state: State = thunkApi.getState().investigations
        let investigation = state.data.find((i) => i.id === id)

        if (!investigation) return

        thunkApi.dispatch(
            investigationsSlice.actions.updateInvestigation({
                id,
                state: 'PROCESSED',
                title: investigation.title,
                summary: response.summary,
            })
        )
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

        clearViewId: (state) => {
            state.viewId = undefined
        },

        setViewId: (state, action: PayloadAction<string>) => {
            state.viewId = action.payload
        },
    },
})

export { createInvestigation }
export const { setViewId, clearViewId } = investigationsSlice.actions
export const selectInvestigations = (state: RootState): State =>
    state.investigations
export default investigationsSlice.reducer
