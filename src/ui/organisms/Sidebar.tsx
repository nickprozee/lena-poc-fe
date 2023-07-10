import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container, Text } from '../atoms'
import { InvestigationListItem } from '../molecules'

import { List } from '@mui/material'

export function SideBarOrganism() {
    const investigations = useSelector(
        (state: any) => state.investigations.data
    )

    return (
        <Container direction="vertical" sx={{ width: '100%', height: '100vh' }}>
            <Container centered sx={{ mt: 2 }}>
                <Text size="subtitle" value="LeNa" />
            </Container>
            <Image src={getAsset('logo_politie.svg')} />
            <Container centered>
                <Text size="subtitle" value="Bestanden" />
            </Container>

            <List>
                {investigations.map((investigation: any, index: number) => (
                    <InvestigationListItem
                        title={investigation.title}
                        selected={index === 0}
                    />
                ))}
            </List>
        </Container>
    )
}
