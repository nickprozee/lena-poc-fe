import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { Summary, SummaryLoader } from '../molecules/Summary'
import { Container } from '@mui/material'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { useParams } from 'react-router-dom'

let timeout: any
const createTimeMessage = (investigation?: InvestigationViewModel) => {
    return investigation
        ? moment(investigation.created_at).fromNow()
        : 'Verwerken...'
}

export function SummaryOrganism() {
    const { data } = useSelector(selectInvestigations)
    const { id } = useParams()

    const findInvestigation = () => data.find((i) => `${i.id}` === `${id}`)
    const investigation = findInvestigation()
    const [timeMsg, setTimeMsg] = useState(createTimeMessage(investigation))
    const [toggler, setToggler] = useState(false)

    useEffect(() => {
        timeout = setTimeout(() => {
            const msg = createTimeMessage(findInvestigation())
            setTimeMsg(msg)
            setToggler(!toggler)
        }, 30 * 1000) 
        return () => clearTimeout(timeout)
    }, [toggler])

    useEffect(() => {
        setTimeMsg(createTimeMessage(findInvestigation()))
    }, [id])

    if (!investigation) return

    const title = investigation.title ?? 'Samenvatten...'
    const summary = investigation.summary

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
