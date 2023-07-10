import { Typography } from '@mui/material'

interface Props {
    size: 'content' | 'subtitle' | 'title'
    value: string
    bold?: boolean
}

const SIZES = {
    content: 'body1',
    subtitle: 'subtitle1',
    title: 'h4',
}

export function Text(props: Props) {
    const size = SIZES[props.size]

    //@ts-expect-error
    return (
        <Typography
            color={'primary'}
            fontWeight={props.bold ? 'bold' : 'initial'}
            variant={size}>
            {props.value}
        </Typography>
    )
}
