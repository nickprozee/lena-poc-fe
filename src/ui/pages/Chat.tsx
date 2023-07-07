import { DashboardLayout } from "../layouts/DashboardLayout";
import { DocumentUpload } from "../molecules/DocumentUpload";
import { SideBarOrganism } from "../organisms/Sidebar";

export function ChatPage() {
    return <DashboardLayout
        sideBar={<SideBarOrganism />}
        content={<DocumentUpload />}
    />
}