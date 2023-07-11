import { Container } from '../atoms/Container'
import { Container as MuiContainer } from '@mui/material'

interface Props {
    sideBar: React.ReactNode
    content: React.ReactNode
}

export function DashboardLayout(props: Props) {
    {
        /** Root */
    }
    return (
        <Container
            direction="horizontal"
            sx={{
                height: '100vh',
                background: '#1a26b81f',
            }}>
            {/** SideBar */}
            <Container sx={{ width: '30%' }}>{props.sideBar}</Container>

            {/** Content */}
            <Container sx={{ px: '0rem !important', width: '70%' }}>
                {props.content}
            </Container>
        </Container>
    )
}
