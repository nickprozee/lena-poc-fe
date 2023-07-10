import { useSelector } from 'react-redux'
import { DocumentUpload } from '../molecules'
import { Chat } from '../molecules/Chat'
import { selectInvestigations } from '../../store/states/investigations'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)

    return state.viewId ? <Chat /> : <DocumentUpload />
}
