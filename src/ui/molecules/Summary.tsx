import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { ReactNode } from 'react'

function SummaryCard(props: {
    children: ReactNode
    title: string
    createdAt: string
}) {
    const { createdAt } = props
    const capitalized = createdAt.charAt(0).toUpperCase()
    const timeMsg = `${capitalized}${createdAt.slice(1)}`

    return (
        <Card sx={{ p: 5 }} elevation={0}>
            <Typography gutterBottom variant="h4" component="div" color='primary'>
                {props.title}
            </Typography>

            <Typography gutterBottom variant="caption" color='gray'>
                {timeMsg}
            </Typography>
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}

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
    const sections = props.summary.split('\r')

    return (
        <SummaryCard title={props.title} createdAt={props.createdAt}>
            {sections.map((section, i) => (
                <Typography
                    sx={{ pt: i === 0 ? 0 : 2 }}
                    variant="body2"
                    color="text.secondary">
                    {section}
                </Typography>
            ))}
        </SummaryCard>
    )
}

export function SummaryLoader(props: { title: string }) {
    return (
        <SummaryCard title={props.title} createdAt='Verwerken'>
            <SkeletonSection rows={3} width={'75%'} />
            <br />
            <SkeletonSection rows={4} />
            <br />
            <SkeletonSection rows={3} />
        </SummaryCard>
    )
}
