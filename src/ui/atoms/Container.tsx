import { Box as MuiBox, SxProps, Theme } from '@mui/material';

interface Props {
    direction?: 'horizontal' | 'vertical',
    centered?: boolean,
    children?: React.ReactNode,
    sx?: SxProps<Theme>
}

export function Container(props: Props) {
    return <MuiBox sx={{
        display: 'flex',
        flexDirection: props.direction === 'horizontal' ? 'row' : 'column',
        alignItems: props.centered ? 'center' : 'unset',
        justifyContent: props.centered ? 'center' : 'unset',
        ...props.sx
    }}>
        {
            props.children
        }
    </MuiBox>
}