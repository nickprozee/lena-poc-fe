import { useSelector } from 'react-redux'
import { selectInvestigations } from '../../store/states/investigations'
import { UploadDocumentOrganism } from './UploadDocument'
import { SummaryOrganism } from './Summary'
import { ChatInputMolecule } from '../molecules'
import { ChatLayout } from '../layouts/ChatLayout'
import { FileSelectionOrganism } from './FileSelection'
// import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

export function ContentViewOrganism() {
    const state = useSelector(selectInvestigations)

    /**
     * @TODO Router toevoegen voor een mooiere scheiding van verschillende views
     */

    // const router = createBrowserRouter([
    //     {
    //         path: '/',
    //         element: <UploadDocumentOrganism />,
    //     },
    //     {
    //         path: '/summary',
    //         element: (
    //             <ChatLayout
    //                 content={<SummaryOrganism />}
    //                 footer={<ChatInputMolecule />}
    //             />
    //         ),
    //     },
    // ])

    // return <RouterProvider router={router} />
    return state.files.length && !state.viewId ? (
        <FileSelectionOrganism />
    ) : state.viewId ? (
        <ChatLayout
            content={<SummaryOrganism />}
            footer={<ChatInputMolecule />}
        />
    ) : (
        <UploadDocumentOrganism />
    )
}
