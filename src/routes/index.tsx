import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom'
import { useEffect } from 'react'
import { useAppDispatch } from '../store'
import { fetchInvestigations } from '../store/states/investigations'
import { DashboardLayout } from '../ui/layouts/DashboardLayout'
import { AddInvestigationOrganism, SideBarOrganism, SummaryOrganism } from '../ui/organisms'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <DashboardLayout
                sideBar={<SideBarOrganism />}
                content={<></>}
            />
        ),
    },
    {
        path: '/onderzoek/:id',
        element: (
            <DashboardLayout
                sideBar={<SideBarOrganism />}
                content={<SummaryOrganism />}
            />
        ),
    },
    {
        path: '/nieuw-onderzoek',
        element: (
            <DashboardLayout
                sideBar={<SideBarOrganism />}
                content={<AddInvestigationOrganism />}
            />
        ),
    },
])

export function AppRouter() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchInvestigations())
    }, [])

    return <RouterProvider router={router} />
}
