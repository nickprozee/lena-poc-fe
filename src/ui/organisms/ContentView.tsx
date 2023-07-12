import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { UploadDocumentOrganism } from './UploadDocument'
import { SummaryOrganism } from './Summary'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)
    return state.viewId ? <SummaryOrganism /> : <UploadDocumentOrganism />
}
