import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { UploadDocumentOrganism } from './UploadDocument'
import { SummaryOrganism } from './Summary'
import { ChatInputMolecule } from '../molecules'
import { ChatLayout } from '../layouts/ChatLayout'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)
    return state.viewId ? (
        <ChatLayout
            content={<SummaryOrganism />}
            footer={<ChatInputMolecule />}
        />
    ) : (
        <UploadDocumentOrganism />
    )
}
