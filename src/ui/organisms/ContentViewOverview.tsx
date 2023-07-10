import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { UploadDocumentOrganism } from './UploadDocument'
import { ChatOrganism } from './Chat'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)
    return state.viewId ? <ChatOrganism /> : <UploadDocumentOrganism />
}
