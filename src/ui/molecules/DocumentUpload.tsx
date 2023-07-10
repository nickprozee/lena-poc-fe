import { FileUploader } from 'react-drag-drop-files'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'

interface Props {
    onUpload: (f: File) => any
}

interface HiddenProps {
    getRef: (r: HTMLInputElement | null) => any
    onUpload: (f: File) => any
}

export function HiddenUpload(props: HiddenProps) {
    return (
        <input
            type="file"
            style={{ display: 'none' }}
            ref={props.getRef}
            onChange={(e) => props.onUpload(e.target.files![0])}
        />
    )
}

export function DocumentUploadMolecule(props: Props) {
    return (
        <FileUploader multiple={false} handleChange={props.onUpload}>
            <Container
                centered
                sx={{
                    width: '100%',
                    height: '100vh',
                    background: '#eee',
                    ':hover': {
                        cursor: 'pointer',
                    },
                }}>
                <Container
                    sx={{
                        padding: '8rem',
                        borderColor: '#dbdbdb',
                        borderWidth: '.2rem',
                        borderStyle: 'dashed',
                        borderRadius: '2rem',
                    }}>
                    <Text
                        size="subtitle"
                        value="Klik of sleep hier je bestand(en)"
                    />
                </Container>
            </Container>
        </FileUploader>
    )
}
