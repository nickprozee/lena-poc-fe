import { CircularProgress, ListItemButton } from '@mui/material'
import { Text, Image, Container } from '../atoms'
import CompletedIcon from '@mui/icons-material/DocumentScannerTwoTone'

interface Props {
    text?: string
    selected?: boolean
    onClick: () => any
    id: string
    processed: boolean
}

export function InvestigationListItem(props: Props) {
    return (
        <ListItemButton
            selected={props.selected}
            onClick={props.onClick}
            sx={{ borderRadius: 3, py: 2 }}>
            {props.processed ? (
                <CompletedIcon color="primary" sx={{ mr: 1 }} />
            ) : (
                <CircularProgress size={'1rem'} sx={{ mr: 1 }} />
            )}
            <Text size="subtitle" value={props.text ?? props.id} />
        </ListItemButton>
    )
}
