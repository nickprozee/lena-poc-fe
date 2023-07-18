import { ThemeProvider } from '@mui/material'
import { theme } from './ui/theme'
import store from './store'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import moment from 'moment'
import 'moment/dist/locale/nl'
import { AppRouter } from './routes'
moment().locale('nl')

// eslint-disable-next-line react-refresh/only-export-components
export default function () {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <AppRouter />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    )
}
