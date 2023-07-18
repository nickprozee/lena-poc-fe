import { Card, CardContent, Divider, Typography } from '@mui/material'
import { Container, Image } from '../atoms'
import { ReactNode } from 'react'
import { getAsset } from '../../utils/assetHelper'

export function SummaryCard(props: {
    children: ReactNode
    title: string
    createdAt: string
}) {
    const { createdAt } = props
    const capitalized = createdAt.charAt(0).toUpperCase()
    const timeMsg = `${capitalized}${createdAt.slice(1)}`

    return (
        <Card sx={{ p: 5, position: 'relative' }} elevation={0}>
            <Container>
                <Container sx={{pt: 5}}>
                    <Typography
                        gutterBottom
                        textOverflow={'ellipsis'}
                        sx={{maxWidth: '100%', wordBreak: 'break-word'}}
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
                </Container>
                <Image
                    src={getAsset('logo_politie_text.svg')}
                    sx={{
                        maxWidth: 100,
                        position: 'absolute',
                        right: 10,
                        top: 20
                    }}
                />
            </Container>

            <Divider sx={{ my: 3 }} />

            <CardContent sx={{ py: 0 }}>{props.children}</CardContent>
        </Card>
    )
}
