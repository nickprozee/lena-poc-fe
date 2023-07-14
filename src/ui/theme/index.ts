import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#174880',
            dark: '#0f3866',
            light: '#1748804d',
        },
        grey: {
            100: '#ffffff80',
            200: '#eeeeee',
            800: '#808080', // box-shadow color
        },
    },
})
