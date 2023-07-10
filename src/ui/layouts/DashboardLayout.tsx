import { Container } from '../atoms/Container'

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
                background: '#eee'
            }}>
            {/** SideBar */}
            <Container
                sx={{
                    width: 300,
                }}>
                {props.sideBar}
            </Container>

            {/** Content */}
            <Container
                sx={{
                    width: '100%',
                }}>
                {props.content}
            </Container>
        </Container>
    )
}
