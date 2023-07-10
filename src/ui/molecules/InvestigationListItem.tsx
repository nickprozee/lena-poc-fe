import { Divider, ListItemButton } from '@mui/material'
import { Text } from '../atoms'
import DocIcon from '@mui/icons-material/DocumentScanner'
import CompletedIcon from '@mui/icons-material/Task'

interface Props {
    text?: string
    selected?: boolean
    onClick: () => any
    id: string
    processed: boolean
}

export function InvestigationListItem(props: Props) {
    return (
        <>
            <ListItemButton selected={props.selected} onClick={props.onClick}>
                {props.processed ? (
                    <CompletedIcon color="success" sx={{ mr: 1 }} />
                ) : (
                    <DocIcon color="info" sx={{ mr: 1 }} />
                )}
                <Text
                    size="subtitle"
                    value={props.text ?? props.id}
                />
            </ListItemButton>
            <Divider />
        </>
    )
}
