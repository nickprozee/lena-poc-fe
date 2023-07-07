import { ThemeProvider } from '@mui/material'
import { theme } from './ui/theme'
import { ChatPage } from './ui/pages/Chat'
import store from './store'
import { Provider } from 'react-redux'

export default function () {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <ChatPage />
            </ThemeProvider>
        </Provider>
    )
}
