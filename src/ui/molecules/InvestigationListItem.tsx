import { Divider, ListItem } from '@mui/material'
import { Text } from '../atoms'

interface Props {
    selected?: boolean
    title: string
}

export function InvestigationListItem(props: Props) {
    return (
        <>
            <ListItem>
                <Text
                    size="subtitle"
                    bold={props.selected}
                    value={props.title}
                />
            </ListItem>
            <Divider />
        </>
    )
}
