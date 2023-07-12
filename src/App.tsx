import { ThemeProvider } from '@mui/material'
import { theme } from './ui/theme'
import { DashboardPage } from './ui/pages'
import store from './store'
import { Provider } from 'react-redux'
import moment from 'moment'

import 'moment/dist/locale/nl'
moment().locale('nl')

export default function () {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <DashboardPage />
            </ThemeProvider>
        </Provider>
    )
}
