import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../store'
import {
    fetchInvestigation,
    selectInvestigations,
} from '../../store/states/investigations'
import { Chat } from '../molecules/Chat'
import { useEffect } from 'react'

let interval: any

export function ChatOrganism() {
    const state = useSelector(selectInvestigations)
    const dispatch = useAppDispatch()
    const viewId = state.viewId
    const investigation = state.data.find((i) => i.id === viewId)

    useEffect(() => {
        clearInterval(interval);

        if (!viewId || investigation?.summary) return

        interval = setInterval(() => {
            dispatch(fetchInvestigation(viewId))
        }, 3000)

        return () => clearInterval(interval)
    }, [dispatch, viewId, investigation?.summary])

    if (!viewId) return <></>

    return <Chat investigation={investigation!} />
}
