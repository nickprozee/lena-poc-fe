import { useSelector, useDispatch } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container, Text } from '../atoms'
import { InvestigationListItem } from '../molecules'

import { List, ListItemButton, ListItemText } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    clearViewId,
    selectInvestigations,
    setViewId,
} from '../../store/states/investigations'

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)
    const dispatch = useDispatch()

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
                <ListItemButton onClick={() => dispatch(clearViewId())}>
                    <ListItemText>Voeg bestand(en) toe</ListItemText>
                </ListItemButton>
                {investigations.data.map(
                    (investigation: InvestigationViewModel) => (
                        <InvestigationListItem
                            id={investigation.id}
                            selected={
                                investigation.id === investigations.viewId
                            }
                            onClick={() =>
                                dispatch(setViewId(investigation.id))
                            }
                        />
                    )
                )}
            </List>
        </Container>
    )
}
