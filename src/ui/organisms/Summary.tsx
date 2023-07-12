import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { Summary, SummaryLoader } from '../molecules/Summary'
import { Container } from '@mui/material'
import { ChatInputMolecule } from '../molecules'
import moment from 'moment'

export function SummaryOrganism() {
    const state = useSelector(selectInvestigations)
    const viewId = state.viewId
    const investigation = state.data.find((i) => i.id === viewId)

    if (!investigation) return

    const title = investigation.title ?? 'Samenvatten...'
    const summary = investigation.summary
    const createdAt =
        moment(investigation.summary?.createdAt).fromNow() ??
        'Vewerken...'

    return (
        <Container
            sx={{
                flexDirection: 'column',
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: '80vh',
                mt: 'auto',
            }}>
            {summary ? (
                <Summary
                    title={title}
                    summary={summary.summary}
                    createdAt={createdAt}
                />
            ) : (
                <SummaryLoader title={title} />
            )}

            <ChatInputMolecule />
        </Container>
    )
}
