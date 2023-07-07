import { getAsset } from "../../utils/assetHelper";
import { Image, Container, Text } from '../atoms';
import { SessionListItem } from "../molecules";

import { List } from "@mui/material";

export function SideBarOrganism() {
    return <Container direction="vertical" sx={{ width: '100%', height: '100vh' }}>
        <Container centered sx={{ mt: 2 }}>
            <Text size="subtitle" value="LeNa" />
        </Container>
        <Image src={getAsset('logo_politie.svg')} />
        <Container centered>
            <Text size="subtitle" value="Bestanden" />
        </Container>

        <List>
            {
                [1, 2, 3].map(i => <SessionListItem title={`POC Sessie ${i}`} selected={i === 1} />)
            }

        </List>
    </Container>
}