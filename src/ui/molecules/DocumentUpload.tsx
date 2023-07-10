import { FileUploader } from 'react-drag-drop-files'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import { SxProps, Theme } from '@mui/material'

interface Props {
    onUpload: (f: File) => any
    sx?: SxProps<Theme>
}

interface HiddenProps {
    onUpload: (f: File) => any
    children: React.ReactNode
}

export function UploadArea(props: HiddenProps) {
    return (
        <FileUploader multiple={false} handleChange={props.onUpload}>
            {props.children}
        </FileUploader>
    )
}

export function DocumentUploadMolecule(props: Props) {
    return (
        <UploadArea onUpload={props.onUpload}>
            <Container
                centered
                sx={{ width: '100%', height: '100vh', background: '#eee' }}>
                <Text
                    bold
                    size="subtitle"
                    value="Klik of sleep hier je bestand(en)"
                />
            </Container>
        </UploadArea>
    )
}
