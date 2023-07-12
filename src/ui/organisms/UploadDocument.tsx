
import { createInvestigation } from '../../store/states/investigations'
import { useAppDispatch } from '../../store'
import { Container } from '../atoms'
import { theme } from '../theme'
import { UploadMolecule } from '../molecules'

export function UploadDocumentOrganism() {
    const dispatch = useAppDispatch()
    const uploadFiles = (files: File[]) => dispatch(createInvestigation(files))

    return (
        <Container centered sx={{ height: '100vh' }}>
            <UploadMolecule
                fileTypes={['DOCX', 'PDF']}
                message="Klik hier of sleep uw documenten(en)"
                onUpload={uploadFiles}
                sx={{
                    background: theme.palette.common.white,
                    borderRadius: 2,
                    width: 500,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: `0 5px 15px ${theme.palette.grey[400]}`,
                    transition: '.3s',
                    ':hover': {
                        boxShadow: `0 5px 15px ${theme.palette.grey[500]}`,
                    },
                }}
            />
        </Container>
    )
}
