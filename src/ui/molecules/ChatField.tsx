import { Divider, IconButton, InputBase, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Container } from '../atoms'

export function ChatInputMolecule() {
    return (
        <Container sx={{ bgcolor: 'rgba(23, 72, 128, 0.08)', width:'100%', borderTopRightRadius: 4, borderTopLeftRadius: 4  }}>
            <Paper
                sx={{
                    p: '.5rem .75rem',
                    display: 'flex',
                    alignItems: 'center',
                    m: 2,
                    borderRadius: 4,
                }}>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Stel hier de vragen"
                    inputProps={{ 'aria-label': 'stel hier de vragen' }}
                    onClick={() => ({})}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                    color="primary"
                    sx={{ p: '10px' }}
                    aria-label="directions">
                    <SendIcon />
                </IconButton>
            </Paper>
        </Container>
    )
}
