import { SxProps, Typography, Theme } from '@mui/material'

interface Props {
    size: 'content' | 'subtitle' | 'title'
    value: string
    bold?: boolean
    color?: string
    sx?: SxProps<Theme>
}

const SIZES = {
    content: 'body1',
    subtitle: 'subtitle1',
    title: 'h4',
}

export function Text(props: Props) {
    const size = SIZES[props.size]

    return (
        <Typography
            color={props.color ? props.color : 'primary'}
            sx={{
                maxWidth: '100%',
                overflow: 'hidden',
                ...props.sx,
            }}
            textOverflow={'ellipsis'}
            fontWeight={props.bold ? 'bold' : 'initial'}
            //@ts-expect-error
            variant={size}>
            {props.value}
        </Typography>
    )
}
