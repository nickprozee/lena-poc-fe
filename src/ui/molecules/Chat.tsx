import { useEffect } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { getAsset } from '../../utils/assetHelper'
import { Container, Text, Image } from '../atoms'
import { theme } from '../theme'
import { Card, CardContent, Typography } from '@mui/material'
import { ChatFieldMolecule } from '.'

interface Props {
    investigation: InvestigationViewModel
    // onSendMessage?: (msg:string) => any;
}

let index = 0
const messages = [
    'Geheimen ontgrendelen..',
    'Document decrypten...',
    'Vertalen naar morse-code...',
]

export function DocumentSummary(props: {
    title: string
    summary: string
    createdAt: string
}) {
    return (
        <Card>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.summary}
                </Typography>
            </CardContent>
        </Card>
    )
}

export function Chat(props: Props) {
    const { title, summary } = props.investigation

    useEffect(() => {
        if (index < 2) index++
        else index = 0
    }, [props.investigation.id])

    return (
        <Container
            key={props.investigation.id}
            centered
            sx={{
                height: '100vh',
                width: '100%',
                mt: '5rem',
                justifyContent: 'space-between',
            }}>
            {summary ? (
                <DocumentSummary
                    title={title}
                    summary={summary ?? ''}
                    createdAt="Nu"
                />
            ) : (
                <Container centered>
                    <Image
                        src={getAsset('document_scan.gif')}
                        sx={{ maxWidth: 100, borderRadius: 60, mt: 5 }}
                    />
                    <Text size="subtitle" value={messages[index]} />
                </Container>
            )}
            <ChatFieldMolecule />
        </Container>
    )
}
