import { useSelector } from "react-redux";
import { getAsset } from "../../utils/assetHelper";
import { Image, Container, Text } from '../atoms';
import { SessionListItem } from "../molecules";

import { List } from "@mui/material";

export function SideBarOrganism() {
    const sessions = useSelector((state: any) => state.sessions.data);

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
                sessions.map((session:any, index: number) => <SessionListItem title={session.title} selected={index === 0} />)
            }

        </List>
    </Container>
}