import { useSelector } from 'react-redux'
import {} from '../../store'
import { selectInvestigations } from '../../store/states/investigations'
import { Chat } from '../molecules/Chat'

export function ChatOrganism() {
    const state = useSelector(selectInvestigations)
    const viewId = state.viewId

    if (!viewId) return <></>

    const investigation = state.data.find((i) => i.id === viewId)

    return <Chat investigation={investigation!} />
}
