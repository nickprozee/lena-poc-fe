import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container } from '../atoms'
import { InvestigationListItem } from '../molecules'
import { List, ListSubheader } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    createInvestigation,
    selectInvestigations,
    setViewId,
} from '../../store/states/investigations'
import { UploadMolecule } from '../molecules/Upload'
import { useAppDispatch } from '../../store'
import { theme } from '../theme'

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)
    const dispatch = useAppDispatch()

    return (
        <Container
            direction="vertical"
            sx={{
                mt: 'auto',
                minHeight: '80vh',
                px: 3,
                background: theme.palette.common.white,
                transition: 'height 1s linear',
                borderTopRightRadius: 4,
                boxShadow: `-5px 10px 10px ${theme.palette.grey[800]}`,
                zIndex: 10,
                overflow: 'hidden',
            }}>
            <Container direction="vertical" centered sx={{ mb: 2 }}>
                <Image
                    src={getAsset('logo_politie_text.svg')}
                    sx={{
                        my: 1,
                        maxWidth: 120,
                        filter: 'drop-shadow(5px 5px 10px #4444dd)',
                    }}
                />

                {investigations.data.some((i) => i.state === 'PROCESSING') ? (
                    <Image
                        src={getAsset('ai_2.gif')}
                        sx={{
                            mt: -13.5,
                            mb: -5,
                            maxWidth: 130,
                            height: 130,
                            zIndex: -1,
                            opacity: 0.5,
                        }}
                    />
                ) : (
                    <Image
                        src={getAsset('ai_1.gif')}
                        sx={{
                            mt: -10.5,
                            mb: -3,
                            maxWidth: 90,
                            zIndex: -1,
                            height: 90,
                            opacity: 0.5,
                        }}
                    />
                )}
            </Container>
            <ListSubheader>LENA 0.1</ListSubheader>

            <UploadMolecule
                fileTypes={['DOCX', 'PDF']}
                onUpload={(f) => f && dispatch(createInvestigation(f))}
            />

            <List sx={{ pt: 0, mt: 2, overflow: 'auto' }}>
                <ListSubheader>Bestanden</ListSubheader>
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
