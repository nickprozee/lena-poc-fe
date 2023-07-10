import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container, Text } from '../atoms'
import { InvestigationListItem } from '../molecules'

import { Divider, List, ListItemButton } from '@mui/material'
import AddIcon from '@mui/icons-material/FileUploadOutlined'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    clearViewId,
    createInvestigation,
    selectInvestigations,
    setViewId,
} from '../../store/states/investigations'
import { UploadArea } from '../molecules/DocumentUpload'
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
        <Container
            direction="vertical"
            sx={{
                width: 300,
                mt: 'auto',
                minHeight: '70vh',
                pt: 1,
                background: '#fff',
                borderTopRightRadius: 30,
                filter: 'drop-shadow(-5px 10px 10px gray)',
                zIndex: 10,
                overflow: 'hidden',
            }}>
            <Container centered sx={{ mb: 2 }}>
                <Image
                    src={getAsset('logo_politie.svg')}
                    sx={{
                        maxWidth: 100,
                        filter: 'drop-shadow(5px 5px 10px #4444dd)',
                    }}
                />
            </Container>

            <UploadArea onUpload={(f) => f && dispatch(createInvestigation(f))}>
                <ListItemButton
                    sx={{ p: 0, width: '100%' }}
                    selected={!investigations.viewId}
                    onClick={onAdd}>
                    <Container
                        direction="horizontal"
                        sx={{ py: 3, px: 2, width: '100%' }}>
                        <AddIcon color="success" sx={{ mr: 1 }} />
                        <Text
                            size="subtitle"
                            bold
                            value="Voeg bestand(en) toe"
                        />
                    </Container>
                </ListItemButton>
            </UploadArea>
            <Divider />

            <List sx={{ pt: 0, overflow: 'auto' }}>
                    {investigations.data.map(
                        (investigation: InvestigationViewModel) => (
                            <InvestigationListItem
                                processed={!!investigation.summary}
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
