import { Flex, Metric, BadgeDelta, ProgressBar, Card, Text } from "@tremor/react"

interface Props {
    title: string
    metric: string
    advance: string
    meta: string
    value: number
    increase: {
        type: string
        percentaje: string
    }
}

export const CardBase = ({ title, metric, advance, meta, value, increase }: Props) => {
    return (
        <Card className="mx-auto w-full">
            <Flex alignItems="start">
                <div>
                    <Text>
                        {title}
                    </Text>
                    <Metric>
                        {metric}
                    </Metric>
                </div>
                <BadgeDelta deltaType={increase.type}>
                    {increase.percentaje}
                </BadgeDelta>
            </Flex>
            <Flex className="mt-4">
                <Text className="truncate">
                    {advance}
                </Text>
                <Text>
                    {meta}
                </Text>
            </Flex>
            <ProgressBar showAnimation={true} value={value} className="mt-2" />
        </Card>
    )
}