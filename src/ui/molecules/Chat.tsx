import { useEffect } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { getAsset } from '../../utils/assetHelper'
import { Container, Text, Image } from '../atoms'
import { theme } from '../theme'
import { Avatar, Paper } from '@mui/material'
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
        <Container
            sx={{
                padding: '0 4rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-end',
            }}>
            <Avatar
                alt="politie"
                src={getAsset('logo_politie.svg')}
                sx={{
                    right: '1rem',
                    padding: '.3rem',
                    img: { objectFit: 'fill' },
                    bgcolor: theme.palette.primary.main,
                }}
            />
            <Paper
                elevation={1}
                sx={{
                    background: theme.palette.common.white,
                    padding: '2rem',
                    borderRadius: '2rem 2rem 2rem 0',
                    width: '100%',
                }}>
                <Text
                    size="subtitle"
                    bold
                    color={theme.palette.primary.main}
                    value={props.title}
                    sx={{ mb: '1rem' }}
                />
                <Text
                    size="content"
                    color="common.black"
                    value={props.summary}
                />
            </Paper>
        </Container>
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
