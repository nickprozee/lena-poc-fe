import { Skeleton } from '@mui/material'
import { SummaryCard } from '.'
import { Text } from '../atoms'

function SkeletonSection(props: { rows: number; width?: number | string }) {
    const rows = []
    const width = props.width

    for (let i = 0; i < props.rows; i++) rows.push(i)

    return (
        <>
            {rows.map((_, index) => (
                <Skeleton key={index} animation="wave" sx={{ width }} />
            ))}
        </>
    )
}

export function Summary(props: {
    title: string
    summary: string
    createdAt: string
}) {
    return (
        <SummaryCard title={props.title} createdAt={props.createdAt}>
            <Text color='#000' size='content' value={props.summary}></Text>           
        </SummaryCard>
    )
}

export function SummaryLoader(props: { title: string }) {
    return (
        <SummaryCard title={props.title} createdAt="Verwerken">
            <SkeletonSection rows={3} width={'75%'} />
            <br />
            <SkeletonSection rows={4} />
            <br />
            <SkeletonSection rows={3} />
        </SummaryCard>
    )
}
