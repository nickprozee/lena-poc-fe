import { InvestigationViewModel } from '../../types/Investigations'
import { Container, Text } from '../atoms'

interface Props {
    investigation: InvestigationViewModel
}

export function Chat(props: Props) {
    const { state, title, summary } = props.investigation

    return (
        <Container centered sx={{ background: '#eee', height: '100vh' }}>
            <Text size="title" value={title} bold />
            <Text size="subtitle" value={state} />

            <Text size="content" value={summary ?? "..."} />
        </Container>
    )
}
