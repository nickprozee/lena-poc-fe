import { DashboardLayout } from '../layouts/DashboardLayout'
import { ContentViewOrganism } from '../organisms/ContentViewOverview'
import { SideBarOrganism } from '../organisms/Sidebar'

export function DashboardPage() {
    return (
        <DashboardLayout
            sideBar={<SideBarOrganism />}
            content={<ContentViewOrganism />}
        />
    )
}
