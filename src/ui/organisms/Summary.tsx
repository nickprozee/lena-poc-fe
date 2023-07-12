import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { Summary, SummaryLoader } from '../molecules/Summary'
import { Container } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'

let timeout: any
const createTimeMessage = (investigation?: InvestigationViewModel) =>
    investigation
        ? moment(investigation.summary?.createdAt).fromNow()
        : 'Vewerken...'

export function SummaryOrganism() {
    const { viewId, data } = useSelector(selectInvestigations)
    const findInvestigation = () => data.find((i) => i.id === viewId)
    const investigation = findInvestigation()
    const [timeMsg, setTimeMsg] = useState(createTimeMessage(investigation))

    useEffect(() => {
        timeout = setTimeout(() =>
            setTimeMsg(createTimeMessage(findInvestigation())),
            1000
        )

        return () => clearTimeout(timeout);
    }, [timeMsg, viewId])

    if (!investigation) return

    const title = investigation.title ?? 'Samenvatten...'
    const summary = investigation.summary;

    return (
        <Container
            sx={{
                flexDirection: 'column',
                mt: 2,
            }}>
            {summary ? (
                <Summary
                    title={title}
                    summary={summary.summary}
                    createdAt={timeMsg}
                />
            ) : (
                <SummaryLoader title={title} />
            )}
        </Container>
    )
}
