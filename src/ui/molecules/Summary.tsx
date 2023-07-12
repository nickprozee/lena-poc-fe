import { Card, CardContent, Skeleton, Typography } from '@mui/material'
import { ReactNode, useState } from 'react'
import { TypeAnimation } from 'react-type-animation'

function SummaryCard(props: {
    children: ReactNode
    title: string
    createdAt: string
}) {
    const { createdAt } = props
    const capitalized = createdAt.charAt(0).toUpperCase()
    const timeMsg = `${capitalized}${createdAt.slice(1)}`

    return (
        <Card sx={{ p: 5 }} elevation={0}>
            <Typography
                gutterBottom
                variant="h4"
                component="div"
                color="primary">
                {props.title}
            </Typography>

            <Typography gutterBottom variant="caption" color="gray">
                {timeMsg}
            </Typography>
            <CardContent>{props.children}</CardContent>
        </Card>
    )
}

function SkeletonSection(props: { rows: number; width?: number | string }) {
    const rows = []
    const width = props.width

    for (let i = 0; i < props.rows; i++) rows.push(i)

    return (
        <>
            {rows.map((_, index) => (
                <Skeleton key={index} animation="wave" sx={{ width }} />
            ))}
        </>
    )
}

function mergeSections(originalArray: string[]): string[] {
    const newArray: string[] = []
    let previousItem = ''

    for (const item of originalArray) {
        previousItem += item
        newArray.push(previousItem)
    }

    return newArray
}

export function TypeWriter(props: { sections: string[] }) {
    const [showSections, setShowSections] = useState(0)

    // useEffect(() => {
    //     setTimeout(() => setShowSections(showSections + 1), 2000);
    // }, [showSections])

    return (
        <>
            {props.sections
                .filter((_, index) => index <= showSections)
                .map((item, index) => (
                    <>
                        <TypeAnimation
                            onEnded={() => alert('FINISHED')}
                            sequence={[item]}
                            speed={99}
                            style={{
                                fontFamily:
                                    'Roboto, Helvetica, Arial, sans-serif',
                                fontSize: 14,
                                fontWeight: 400,
                                color: 'rgba(0,0,0,.6)',
                            }}
                            repeat={0}
                        />
                        <br /><br />
                    </>
                ))}
        </>
    )
}

export function Summary(props: {
    title: string
    summary: string
    createdAt: string
}) {
    const sections = props.summary.split('\r')
    const sequence = mergeSections(sections)

    return (
        <SummaryCard title={props.title} createdAt={props.createdAt}>
            <TypeAnimation
                sequence={sequence.flatMap((s) => [s, 2000])}
                speed={99}
                style={{
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    fontSize: 14,
                    fontWeight: 400,
                    color: 'rgba(0,0,0,.6)',
                    whiteSpace: 'pre-line'
                }}
                repeat={0}
            />
        </SummaryCard>
    )
}

export function SummaryLoader(props: { title: string }) {
    return (
        <SummaryCard title={props.title} createdAt="Verwerken">
            <SkeletonSection rows={3} width={'75%'} />
            <br />
            <SkeletonSection rows={4} />
            <br />
            <SkeletonSection rows={3} />
        </SummaryCard>
    )
}
