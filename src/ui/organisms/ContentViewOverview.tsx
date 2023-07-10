import { useSelector } from 'react-redux'
import { Chat } from '../molecules/Chat'
import { selectInvestigations } from '../../store/states/investigations'
import { UploadDocumentOrganism } from './UploadDocument'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)
    return state.viewId ? <Chat /> : <UploadDocumentOrganism />
}
