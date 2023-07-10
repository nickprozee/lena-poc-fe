import { Divider, ListItemButton } from '@mui/material'
import { Text } from '../atoms'

interface Props {
    text?: string;
    selected?: boolean
    onClick: () => any
    id: string
}

export function InvestigationListItem(props: Props) {
    return (
        <>
            <ListItemButton onClick={props.onClick}>
                <Text size="subtitle" bold={props.selected} value={props.text ?? props.id} />
            </ListItemButton>
            <Divider />
        </>
    )
}
