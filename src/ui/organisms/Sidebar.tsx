import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container, Text } from '../atoms'
import { InvestigationListItem } from '../molecules'

import { List, ListItemButton, ListItemText } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    clearViewId,
    createInvestigation,
    selectInvestigations,
    setViewId,
} from '../../store/states/investigations'
import { HiddenUpload } from '../molecules/DocumentUpload'
import { useAppDispatch } from '../../store'
import { useRef } from 'react'

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)
    const dispatch = useAppDispatch();
    const ref = useRef<HTMLInputElement | null>();

    const onAdd = () => {
        dispatch(clearViewId());
        ref.current?.click();
    }

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
                <ListItemButton selected={!investigations.viewId} onClick={onAdd}>
                    <HiddenUpload getRef={r => ref.current = r} onUpload={(f) => f && dispatch(createInvestigation(f))} />
                    <ListItemText>Voeg bestand(en) toe</ListItemText>
                </ListItemButton>
                {investigations.data.map(
                    (investigation: InvestigationViewModel) => (
                        <InvestigationListItem
                            key={investigation.id}
                            text={investigation.title}
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
