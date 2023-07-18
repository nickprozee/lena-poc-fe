import {
    Button,
    Card,
    CardActions,
    TextField,
    Typography,
} from '@mui/material'
import { Container } from '../atoms/Container'
import { FileListMolecule, UploadMolecule } from '.'

export function NewInvestigationCard(props: {
    title: string
    files: File[]
    disabled?: boolean

    onCreate: () => any
    onChangeTitle: (v: string) => any
    onAddFiles: (f: File[]) => any
    onRemoveFile: (f: File) => any
}) {
    const { files, onChangeTitle, onAddFiles, onRemoveFile, title } = props

    return (
        <Card sx={{ px: 5, py: 4, display: 'flex', flexDirection: 'column', width: '100%'}} elevation={0}>
            <Typography
                gutterBottom
                variant="h4"
                component="div"
                color="primary">
                Nieuw onderzoek starten
            </Typography>

                <Container>
                    <Typography variant="overline" pb={1}>
                        Titel
                    </Typography>
                    <TextField
                        placeholder="Titel van onderzoek"
                        value={title}
                        variant="standard"
                        onChange={(e) => onChangeTitle(e.target.value)}
                        sx={{ backgroundColor: 'white' }}
                    />
                </Container>

                <Container sx={{ mt: 5, flex: 1, overflow: 'hidden' }}>
                    <Typography variant="overline" pb={1}>
                        {files.length} Bestanden
                    </Typography>
                    <UploadMolecule 
                        fileTypes={["PDF", "DOCX"]}
                        onUpload={onAddFiles}
                        message="Sleep uw bestand(en) of klik hier"
                    />

                    <Container sx={{ overflowY: 'auto', mt: 2 }}>
                        <FileListMolecule
                            files={files}
                            onDelete={onRemoveFile}
                        />
                    </Container>
                </Container>

            <CardActions sx={{mt: 2}}>
                <Button disabled={props.disabled} variant="outlined" size="large" onClick={props.onCreate}>
                    Start Onderzoek
                </Button>
            </CardActions>
        </Card>
    )
}
