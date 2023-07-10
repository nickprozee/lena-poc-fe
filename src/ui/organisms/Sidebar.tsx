import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
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
    const dispatch = useAppDispatch()
    const ref = useRef<HTMLInputElement | null>()

    const onAdd = () => {
        dispatch(clearViewId())
        ref.current?.click()
    }

    return (
        <Container direction="vertical" sx={{ width: '100%', height: '100vh' }}>
            <Container centered sx={{ mt: 2 }}>
                <Text size="subtitle" bold value="Project LENA" />
            </Container>
            <Image src={getAsset('logo_politie_text.svg')} />
            <Container centered sx={{ marginBottom: '2rem' }}>
                <Text size="subtitle" value="Bestanden" />
            </Container>

            <List>
                <ListItemButton
                    selected={!investigations.viewId}
                    onClick={onAdd}
                    sx={{
                        border: '.1rem solid #eee',
                        borderRadius: '.5rem',
                        padding: '.5rem',
                        margin: '1rem',
                        width: 'auto',
                    }}>
                    <HiddenUpload
                        getRef={(r) => (ref.current = r)}
                        onUpload={(f) => f && dispatch(createInvestigation(f))}
                    />
                    <ListItemText
                        sx={{
                            span: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '.3rem',
                            },
                        }}>
                        <AddCircleOutlineIcon color="primary" />
                        Voeg bestand(en) toe
                    </ListItemText>
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
