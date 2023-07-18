import {
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material'
import {
    DeleteOutline as DeleteIcon,
    DocumentScannerOutlined as FolderIcon,
} from '@mui/icons-material'
import { getSizeString } from '../../utils/stringSanitizer'

interface Props {
    files: File[]
    onDelete: (f: File) => any
}

export function FileListMolecule(props: Props) {
    return (
        <List dense>
            {props.files.map((f) => (
                <ListItem
                    key={f.name + f.size}
                    secondaryAction={
                        <IconButton
                            edge="end"
                            aria-label="delete"
                            onClick={() => props.onDelete(f)}>
                            <DeleteIcon color="error" />
                        </IconButton>
                    }>
                    <ListItemAvatar>
                        <FolderIcon color="primary" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={f.name}
                        secondary={getSizeString(f)}
                    />
                </ListItem>
            ))}
        </List>
    )
}
