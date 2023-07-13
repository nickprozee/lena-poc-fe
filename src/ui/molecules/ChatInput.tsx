import { Divider, IconButton, InputBase, Paper, Container as MuiContainer  } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Container } from '../atoms'

export function ChatInputMolecule() {
    return (
        <Container
            sx={{
                bgcolor: 'rgba(23, 72, 128, 0.08)',
                width: '100%',
                borderTopRightRadius: 1,
                borderTopLeftRadius: 1,
                py: 2
            }}>
            <MuiContainer>
                <Paper
                    sx={{
                        p: '.5rem .75rem',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 1,
                    }}>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Wat wilt u met de samenvatting doen?"
                        onClick={() => ({})}
                    />
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <IconButton
                        color="primary"
                        sx={{ p: '10px' }}
                        aria-label="directions">
                        <SendIcon />
                    </IconButton>
                </Paper>
            </MuiContainer>
        </Container>
    )
}
