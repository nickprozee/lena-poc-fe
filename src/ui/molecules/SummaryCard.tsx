import { Card, CardContent, Typography } from '@mui/material'
import { ReactNode } from 'react'

export function SummaryCard(props: {
    children: ReactNode
    title: string
    createdAt: string
}) {
    const { createdAt } = props
    const capitalized = createdAt.charAt(0).toUpperCase()
    const timeMsg = `${capitalized}${createdAt.slice(1)}`

    return (
        <Card sx={{ p: 5 }} elevation={0}>
            <Typography
                gutterBottom
                variant="h4"
                component="div"
                color="primary">
                {props.title}
            </Typography>

            {props.createdAt && (
                <Typography gutterBottom variant="caption" color="gray">
                    {timeMsg}
                </Typography>
            )}
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}


