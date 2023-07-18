import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAsset } from '../../utils/assetHelper'
import { Image, Container } from '../atoms'
import { InvestigationListItem, NewInvestigationListItem } from '../molecules'
import { List, ListSubheader } from '@mui/material'
import { InvestigationViewModel } from '../../types/Investigations'
import {
    selectInvestigations
} from '../../store/states/investigations'
import { theme } from '../theme'

export function SideBarOrganism() {
    const investigations = useSelector(selectInvestigations)

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

            <Link to={'/nieuw-onderzoek'} style={{ textDecoration: 'none' }}>
                <NewInvestigationListItem />
            </Link>

            <List sx={{ pt: 0, mt: 2, overflow: 'auto' }}>
                <ListSubheader>Samenvattingen</ListSubheader>

                {investigations.data.map(
                    (investigation: InvestigationViewModel) => (
                        <InvestigationListItem
                            processed={!!investigation.summary}
                            key={investigation.identifier}
                            text={investigation.title}
                            id={investigation.identifier}
                            selected={investigation.identifier === investigations.viewId}
                            onClick={() => {}
                                //dispatch(setViewId(investigation.identifier))
                            }
                        />
                    )
                )}
            </List>
        </Container>
    )
}
