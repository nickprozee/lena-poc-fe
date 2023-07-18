import { ListItemButton } from '@mui/material'
import { Text } from '../atoms'
import AddIcon from '@mui/icons-material/AddOutlined'

export function NewInvestigationListItem() {
    return (
        <ListItemButton
            selected={true}
            sx={{
                borderRadius: 1,
                py: 2,
                my: 1,
            }}>            
            <AddIcon color="success" sx={{mr: 1}} />
            <Text
                size="subtitle"
                value={'Onderzoek starten'}
            />
        </ListItemButton>
    )
}
