import { DocumentUploadMolecule } from "../molecules";
import { createInvestigation } from "../../store/states/investigations";
import { useAppDispatch} from '../../store';

export function UploadDocumentOrganism()
{
    const dispatch = useAppDispatch();
    const uploadFile = (f:File) => dispatch(createInvestigation(f));
    return <DocumentUploadMolecule onUpload={uploadFile} />
}