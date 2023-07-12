import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#174880',
            dark: '#17488026',
            light: '#174880cc',
        },        
        grey: {
            200: '#eeeeee',
            800: '#808080', // box-shadow color
        },
    },
})
