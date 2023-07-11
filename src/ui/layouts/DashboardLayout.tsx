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
            <Container sx={{ width: 500 }}>{props.sideBar}</Container>

            {/** Content */}
            <MuiContainer>{props.content}</MuiContainer>
        </Container>
    )
}
