import { DocumentUploadMolecule } from '../molecules'
import { createInvestigation } from '../../store/states/investigations'
import { useAppDispatch } from '../../store'
import { Container } from '../atoms'

export function UploadDocumentOrganism() {
    const dispatch = useAppDispatch()
    const uploadFiles = (files: File[]) => dispatch(createInvestigation(files))

    return (
        <Container centered sx={{ height: '100vh' }}>
            <DocumentUploadMolecule
            fileTypes={['DOCX', 'PDF']}
                message="Klik hier of sleep uw documenten(en)"
                onUpload={uploadFiles}
                sx={{
                    background: '#fff',
                    borderRadius: 2,
                    width: 500,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    filter: 'drop-shadow(0px 5px 15px silver)',
                }}
            />
        </Container>
    )
}
