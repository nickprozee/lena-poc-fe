import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container } from '../atoms'
import { InvestigationListItem } from '../molecules'
import { List, ListSubheader } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    clearViewId,
    selectInvestigations,
    setFiles,
    setViewId,
} from '../../store/states/investigations'
import { UploadMolecule } from '../molecules/Upload'
import { useAppDispatch } from '../../store'
import { theme } from '../theme'

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)
    const dispatch = useAppDispatch()

    const handleSetFiles = (files: File[]) => {
        if (files.length) {
            dispatch(setFiles(files))
            dispatch(clearViewId())
        }
    }

    return (
        <Container
            direction="vertical"
            sx={{
                minHeight: '100vh',
                px: 3,
                background: theme.palette.common.white,
                transition: 'height 1s linear',
                borderTopRightRadius: 4,
                zIndex: 10,
                overflow: 'hidden',
            }}>
            <Container direction="vertical" centered sx={{ mb: 2, mt: 2 }}>
                <Image
                    src={getAsset('logo_politie_text.svg')}
                    sx={{
                        my: 1,
                        maxWidth: 120,
                    }}
                />
            </Container>
            <ListSubheader>LENA 0.1</ListSubheader>

            <UploadMolecule
                fileTypes={['DOCX', 'PDF']}
                onUpload={(files) => handleSetFiles(files)}
            />

            <List sx={{ pt: 0, mt: 2, overflow: 'auto' }}>
                <ListSubheader>Samenvattingen</ListSubheader>
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
