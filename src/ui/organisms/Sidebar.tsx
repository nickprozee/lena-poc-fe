import { useSelector } from 'react-redux'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container } from '../atoms'
import { InvestigationListItem, NewInvestigationListItem } from '../molecules'
import { List, ListSubheader } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import { selectInvestigations } from '../../store/states/investigations'
import { theme } from '../theme'
import { useLocation } from 'react-router-dom'

function getSelectedId(path: string) {
    if (path.indexOf('/onderzoek/') === -1) return ''

    return path.substring('/onderzoek/'.length)
}

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)
    const location = useLocation()
    const id = getSelectedId(location.pathname)

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

            <NewInvestigationListItem />

            <List sx={{ pt: 0, mt: 2, overflow: 'auto' }}>
                <ListSubheader>Samenvattingen</ListSubheader>

                {investigations.data.map(
                    (investigation: InvestigationViewModel) => (
                        <InvestigationListItem
                            processed={!!investigation.summary}
                            key={investigation.id}
                            text={investigation.title}
                            id={investigation.id}
                            selected={`${investigation.id}` === id}
                        />
                    )
                )}
            </List>
        </Container>
    )
}
