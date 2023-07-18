import { Container as MuiContainer } from '@mui/material'

import React from 'react'
import { NewInvestigationCard } from '../molecules'
import { useAppDispatch } from '../../store'
import { createInvestigation } from '../../store/states/investigations'
import { useNavigate } from 'react-router-dom'

export function AddInvestigationOrganism() {
    const dispatch = useAppDispatch()
    const nav = useNavigate()

    const [selectedFiles, setSelectedFiles] = React.useState<File[]>([])
    const [title, setTitle] = React.useState<string>('')

    const onSelectFiles = (f: File[]) => {
        const newFiles = [...selectedFiles.concat(Array.from(f))]
        setSelectedFiles(newFiles)
    }

    const onRemoveFile = (f: File) => {
        const newFiles = selectedFiles.filter((file) => f !== file)
        setSelectedFiles(newFiles)
    }

    const onCreate = async () => {
        const result = await dispatch(
            createInvestigation({
                files: selectedFiles,
                name: title,
            })
        )

        //@ts-expect-error
        const id = result.payload.id
        nav(`/onderzoek/${id}`)
    }
    return (
        <MuiContainer
            maxWidth="lg"
            sx={{ p: 3, maxHeight: '100%', display: 'flex' }}>
            <NewInvestigationCard
                disabled={title.length === 0}
                files={selectedFiles}
                onAddFiles={onSelectFiles}
                onRemoveFile={onRemoveFile}
                onChangeTitle={setTitle}
                title={title}
                onCreate={onCreate}
            />
        </MuiContainer>
    )
}
