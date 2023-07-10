import { useDispatch } from 'react-redux'
import { FileUploader } from 'react-drag-drop-files'
import { Container } from '../atoms/Container'
import { Text } from '../atoms/Text'
import { createInvestigation } from '../../store/states/investigations'

export function DocumentUpload() {
    const dispatch = useDispatch()

    const onChange = (file: File) => {
        console.log('file name: ', file)
        dispatch(createInvestigation(file))
    }

    return (
        <FileUploader multiple={false} handleChange={onChange}>
            <Container
                centered
                sx={{ width: '100%', height: '100vh', background: '#eee' }}>
                <Text
                    size="subtitle"
                    value="Klik of sleep hier je bestand(en)"
                />
            </Container>
        </FileUploader>
    )
}
