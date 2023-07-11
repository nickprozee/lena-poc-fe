import { InvestigationViewModel } from '../../types/Investigations'
import { getAsset } from '../../utils/assetHelper'
import { Container, Text, Image } from '../atoms'

interface Props {
    investigation: InvestigationViewModel
}

export function Chat(props: Props) {
    const { state, title, summary } = props.investigation

    return (
        <Container centered sx={{ height: '100vh' }}>
            <Text size="title" value={title} bold />
            <Text size="title" value={state} />

            {summary && <Text size="subtitle" value={summary} />}
            {!summary && <Image src={getAsset('document_scan.gif')} sx={{maxWidth: 100, borderRadius: 60, mt: 5}} />}
        </Container>
    )
}
