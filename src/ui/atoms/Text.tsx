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

    return (
        <Typography
            color={'primary'}
            sx={{
                maxWidth: '100%',
                overflow: 'hidden'
            }}            
            textOverflow={'ellipsis'}
            fontWeight={props.bold ? 'bold' : 'initial'}
            //@ts-expect-error
            variant={size}>
            {props.value}
        </Typography>
    )
}
