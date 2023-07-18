import { Skeleton } from '@mui/material'
import { TypeAnimation } from 'react-type-animation'
import { SummaryCard } from '.'

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
    return (
        <>
            {props.sections
                .map((item) => (
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
                        <br />
                        <br />
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
                    whiteSpace: 'pre-line',
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
