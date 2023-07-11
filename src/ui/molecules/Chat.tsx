import { useEffect } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { getAsset } from '../../utils/assetHelper'
import { Container, Text, Image } from '../atoms'
import { theme } from '../theme'
import { Avatar, Paper } from '@mui/material'

interface Props {
    investigation: InvestigationViewModel
}

let index = 0
const messages = [
    'Geheimen ontgrendelen..',
    'Document decrypten...',
    'Vertalen naar morse-code...',
]

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
            sx={{ height: '100vh' }}>
            {summary && (
                <Container
                    sx={{
                        width: '100%',
                        height: '100vh',
                        maxHeight: '80vh',
                        marginTop: 'auto',
                    }}>
                    <Container
                        sx={{
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
                            }}
                        />
                        <Paper
                            elevation={1}
                            sx={{
                                background: '#fff',
                                padding: '2rem',
                                borderRadius: '2rem 2rem 2rem 0',
                                width: '100%',
                            }}>
                            <Text
                                size="title"
                                bold
                                color={theme.palette.primary.main}
                                value={title}
                            />
                            <Text size="content" color="#000" value={summary} />
                        </Paper>
                    </Container>
                </Container>
            )}
            {!summary && (
                <>
                    <Image
                        src={getAsset('document_scan.gif')}
                        sx={{ maxWidth: 100, borderRadius: 60, mt: 5 }}
                    />
                    <Text size="subtitle" value={messages[index]} />
                </>
            )}
        </Container>
    )
}
