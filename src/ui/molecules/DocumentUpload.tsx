import { FileUploader } from 'react-drag-drop-files'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import { ListItemButton, SxProps, Theme } from '@mui/material'
import AddIcon from '@mui/icons-material/CloudUploadTwoTone'

interface Props {
    message?: string
    onUpload: (files: File[]) => any
    sx?: SxProps<Theme>
    children?: React.ReactNode
    fileTypes?: string[]
}

export function UploadArea(props: Props) {
    return (
        <FileUploader multiple={true} handleChange={props.onUpload} types={props.fileTypes}>
            {props.children}
        </FileUploader>
    )
}

export function DocumentUploadMolecule(props: Props) {
    return (
        <UploadArea {...props}>
            <ListItemButton sx={{ p: 0, borderRadius: 3, background: '#eee' }}>
                <Container
                    direction="horizontal"
                    sx={{ py: 3, px: 2, ...props.sx }}>
                    <AddIcon color="success" sx={{ mr: 1 }} />
                    <Text
                        size="subtitle"
                        value={props.message ?? 'Voeg document(en) toe'}
                    />
                </Container>
            </ListItemButton>
        </UploadArea>
    )
}
