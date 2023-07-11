import { useEffect } from 'react'
import { InvestigationViewModel } from '../../types/Investigations'
import { getAsset } from '../../utils/assetHelper'
import { Container, Text, Image } from '../atoms'

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
                <>
                    <Text size="title" value={title} bold />
                    <Text size="subtitle" value={summary} />
                </>
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
