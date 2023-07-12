import { ReactNode } from 'react'
import { Container } from '../atoms'

interface Props {
    content: ReactNode
    footer?: ReactNode
}

export function ChatLayout(props: Props) {
    return (
        <Container direction="vertical" sx={{ height: '100vh', overflow: 'hidden' }}>
            <Container sx={{ flex: 1, overflow: 'auto', pb: 5 }}>{props.content}</Container>
            <Container sx={{ height: 92 }}>{props.footer}</Container>
        </Container>
    )
}
