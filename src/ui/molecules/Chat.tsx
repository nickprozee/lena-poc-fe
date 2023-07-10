import { Avatar, Paper } from '@mui/material'
import { useSelector } from 'react-redux'
import { theme } from '../theme'
import { selectInvestigations } from '../../store/states/investigations'
import { Container, Text } from '../atoms'
import { getAsset } from '../../utils/assetHelper'

export function Chat() {
    const investigations = useSelector(selectInvestigations)

    const investigation = investigations.data.find(
        (i) => i.id === investigations.viewId
    )

    return (
        <Container
            sx={{
                width: '100%',
                height: '100vh',
                background: theme.palette.secondary.main,
            }}>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '3rem',
                    alignItems: 'flex-end',
                }}>
                <Avatar
                    alt="politie"
                    src={getAsset('logo_politie.svg')}
                    sx={{
                        bgcolor: '#fff',
                        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.12)',
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
                        value={investigation ? investigation.title : ''}
                    />
                    <Text
                        size="content"
                        color="#000"
                        value={
                            investigation?.summary ? investigation.summary : ''
                        }
                    />
                </Paper>
            </Container>
        </Container>
    )
}
