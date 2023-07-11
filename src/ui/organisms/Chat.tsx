import { useSelector } from 'react-redux'
import {
    selectInvestigations,
} from '../../store/states/investigations'
import { Chat } from '../molecules/Chat'

export function ChatOrganism() {
    const state = useSelector(selectInvestigations)
    const viewId = state.viewId
    const investigation = state.data.find((i) => i.id === viewId)

    if (!viewId) return <></>

    return <Chat investigation={investigation!} />
}
