import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { Summary, SummaryLoader } from '../molecules/Summary'
import { Container } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { useParams } from 'react-router-dom'

let timeout: any
const createTimeMessage = (investigation?: InvestigationViewModel) =>
    investigation ? moment(investigation.created_at).fromNow() : 'Vewerken...'

export function SummaryOrganism() {
    const { data } = useSelector(selectInvestigations)
    const { id } = useParams()

    const findInvestigation = () => data.find((i) => `${i.id}` === `${id}`)
    const investigation = findInvestigation()
    const [timeMsg, setTimeMsg] = useState(createTimeMessage(investigation))

    useEffect(() => {
        timeout = setTimeout(
            () => setTimeMsg(createTimeMessage(findInvestigation())),
            1000
        )
        return () => clearTimeout(timeout)
    }, [timeMsg])

    useEffect(() => {
        setTimeMsg(createTimeMessage(findInvestigation()))
    }, [id])

    if (!investigation) return

    const title = investigation.title ?? 'Samenvatten...'
    const summary = investigation.summary

    debugger

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
