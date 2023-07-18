import { ListItemButton } from '@mui/material'
import { Text } from '../atoms'
import AddIcon from '@mui/icons-material/AddOutlined'
import { Link } from 'react-router-dom'

export function NewInvestigationListItem() {
    return (
        <Link to={'/nieuw-onderzoek'} style={{ textDecoration: 'none' }}>
            <ListItemButton
                selected={true}
                sx={{
                    borderRadius: 1,
                    py: 2,
                    my: 1,
                }}>
                <AddIcon color="success" sx={{ mr: 1 }} />
                <Text size="subtitle" value={'Onderzoek starten'} />
            </ListItemButton>
        </Link>
    )
}
