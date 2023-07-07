import { FileUploader } from "react-drag-drop-files";
import { Container } from "../atoms/Container";
import { Text } from "../atoms/Text";

export function DocumentUpload() {
    const onChange = (f: any) => {
        debugger;
    }


    return <FileUploader  multiple={false} handleChange={onChange}>
        <Container centered sx={{ width: '100%', height: '100vh', background: '#eee' }}>
            <Text size="subtitle" value="Klik of sleep hier je bestand(en)" />
        </Container>
    </FileUploader>
}