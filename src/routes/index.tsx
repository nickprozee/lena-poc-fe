import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../store'
import { fetchInvestigations } from '../store/states/investigations'
import { DashboardLayout } from '../ui/layouts/DashboardLayout'
import {
    AddInvestigationOrganism,
    SideBarOrganism,
    SummaryOrganism,
} from '../ui/organisms'

export function AppRouter() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchInvestigations())
    }, [])

    return (
        <DashboardLayout
            sideBar={<SideBarOrganism />}
            content={
                <Routes>
                    <Route path="/" element={<></>} />
                    <Route
                        path="/nieuw-onderzoek"
                        element={<AddInvestigationOrganism />}
                    />
                    <Route
                        path="/onderzoek/:id"
                        element={<SummaryOrganism />}
                    />
                </Routes>
            }
        />
    )
}
