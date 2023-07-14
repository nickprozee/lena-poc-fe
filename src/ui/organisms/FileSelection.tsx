import {
    clearFiles,
    createInvestigation,
    deleteFile,
    selectInvestigations,
} from '../../store/states/investigations'
import { useSelector } from 'react-redux'
import {
    Card,
    Checkbox,
    Container as MuiContainer,
    FormControlLabel,
    FormGroup,
    List,
    ListItem,
    Typography,
    Button,
    Divider,
    IconButton,
    TextField,
} from '@mui/material'
import { useAppDispatch } from '../../store'
import React from 'react'
import { Container } from '../atoms'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import DeleteIcon from '@mui/icons-material/Delete'
import CompletedIcon from '@mui/icons-material/DocumentScannerTwoTone'
import { theme } from '../theme'

function FileCard(props: {
    file: File
    index: number
    selectedFiles: File[]
    handleSelectFiles: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const dispatch = useAppDispatch()

    const checked = props.selectedFiles.some(
        (selectedFile) => selectedFile.name === props.file.name
    )

    return (
        <Card
            sx={{
                m: 2,
                width: 'calc(100% / 2 - 3rem)',
                border: `2px solid ${
                    checked ? theme.palette.primary.light : 'transparent'
                }`,
                backgroundColor: checked ? theme.palette.grey[100] : undefined,
                transition: '.2s',
                boxShadow: 'none',
            }}>
            <List sx={{ p: 0 }}>
                <ListItem sx={{ px: 3 }}>
                    <FormGroup
                        sx={{
                            display: 'block',
                            width: '100%',
                        }}>
                        <Container
                            sx={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <CompletedIcon color="primary" sx={{ mr: 1 }} />

                            <FormControlLabel
                                sx={{
                                    position: 'absolute',
                                    right: '10%',
                                    left: '0',
                                    top: '0',
                                    bottom: '0',
                                    m: 0,
                                    pl: 10,
                                }}
                                control={
                                    <Checkbox
                                        checked={props.selectedFiles.some(
                                            (selectedFile) =>
                                                selectedFile.name ===
                                                props.file.name
                                        )}
                                        onChange={props.handleSelectFiles}
                                        name={props.file.name}
                                        color="success"
                                        sx={{ display: 'none' }}
                                    />
                                }
                                label={props.file.name}
                            />
                            <Container
                                sx={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}>
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <IconButton
                                    edge="end"
                                    onClick={() =>
                                        dispatch(deleteFile(props.index))
                                    }>
                                    <DeleteIcon color="primary" />
                                </IconButton>
                            </Container>
                        </Container>
                    </FormGroup>
                </ListItem>
            </List>
        </Card>
    )
}

export function FileSelectionOrganism() {
    const dispatch = useAppDispatch()
    const investigations = useSelector(selectInvestigations)
    const files = Array.from(investigations.files)

    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
    const [summaryName, setSummaryName] = React.useState<string>('')

    const handleSelectFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target
        const file = files.find((file) => file.name === name)

        if (file) {
            setSelectedFiles((prevSelectedFiles) => {
                if (checked) {
                    return [...prevSelectedFiles, file]
                } else {
                    return prevSelectedFiles.filter(
                        (selectedFile) => selectedFile.name !== name
                    )
                }
            })
        }
    }

    const uploadFiles = () => {
        dispatch(
            createInvestigation({ args: selectedFiles, name: summaryName })
        )!
        dispatch(clearFiles)
    }

    return (
        <MuiContainer>
            <Typography
                gutterBottom
                variant="h4"
                component="div"
                color="primary"
                sx={{ mt: 4, mb: 2 }}>
                Selecteer bestand(en)
            </Typography>

            <Container
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    ml: -2,
                }}>
                {files.map((file, index) => (
                    <FileCard
                        file={file}
                        key={index}
                        index={index}
                        selectedFiles={selectedFiles}
                        handleSelectFiles={handleSelectFiles}
                    />
                ))}
            </Container>

            <Container sx={{ mt: 5 }}>
                <Typography variant="body1" pb={1}>
                    Geef een naam voor de samenvatting (optioneel)
                </Typography>
                <TextField
                    label={files[0].name || ''}
                    value={summaryName}
                    variant="filled"
                    onChange={(e) => setSummaryName(e.target.value)}
                    sx={{ backgroundColor: 'white' }}
                />

                <Button
                    variant="outlined"
                    startIcon={<AutoFixHighIcon sx={{ px: 1 }} />}
                    disabled={!selectedFiles.length}
                    onClick={uploadFiles}
                    sx={{
                        p: 2,
                        mt: 3,
                        borderRadius: 1,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: 'none',
                        backgroundColor: selectedFiles.length
                            ? theme.palette.primary.main
                            : undefined,
                        color: selectedFiles.length
                            ? theme.palette.common.white
                            : undefined,
                        ':hover': {
                            backgroundColor: theme.palette.primary.dark,
                        },
                    }}>
                    Start samenvatten
                </Button>
            </Container>
        </MuiContainer>
    )
}
