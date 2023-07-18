import { CircularProgress, ListItemButton } from '@mui/material'
import { Text } from '../atoms'
import CompletedIcon from '@mui/icons-material/DocumentScannerTwoTone'
import { Link } from 'react-router-dom'

interface Props {
    text?: string
    selected?: boolean
    id: string
    processed: boolean
}

export function InvestigationListItem(props: Props) {
    return (
        <Link to={`/onderzoek/${props.id}`} style={{ textDecoration: 'none' }}>
            <ListItemButton
                selected={props.selected}
                sx={{
                    borderRadius: 1,
                    py: 2,
                    my: 1,
                }}>
                {props.processed ? (
                    <CompletedIcon color="primary" sx={{ mr: 1 }} />
                ) : (
                    <CircularProgress size={'1rem'} sx={{ mr: 1 }} />
                )}
                <Text size="subtitle" value={props.text ?? props.id} />
            </ListItemButton>
        </Link>
    )
}
