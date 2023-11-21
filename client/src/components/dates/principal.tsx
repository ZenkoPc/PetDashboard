import { Button, Card, Col, Flex, Grid, Metric, ProgressBar, Text, Title } from "@tremor/react"
import { DatesTables } from "./datesTables"
import { useAppointmentStore } from "../../store/useAppointmentStore"

export const Principal = () => {

    const date =  new Date()
    const day = date.getDate()
    const month = date.getMonth()

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    const { success, failed, reset } = useAppointmentStore()
    const total = success + failed

    return (
       <Grid numItemsLg={6} className="mt-6 gap-6">
        <Col numColSpanLg={4}>
            <Card className='h-[590px] pb-14'>
                <Title>
                    Today´s {day} of {months[month]} Appointments
                </Title>
                <DatesTables />
            </Card>
        </Col>
        <Col numColSpanLg={2}>
            <Flex justifyContent="between" flexDirection="col" className="h-full gap-3">
            <Card className="h-full">
                <Text>Total</Text>
                <Metric>Appointments</Metric>
                <Flex className="mt-4">
                    <Text>
                        {total}%
                    </Text>
                    <Text>
                        {total + ` Appointment${total > 1 ? 's' : ''}`}
                    </Text>
                </Flex>
                <Button className="mt-3" onClick={reset}>
                    Reset
                </Button>
            </Card>
            <Card className="h-full">
                <Text>Total</Text>
                <Metric>Success</Metric>
                <Flex className="mt-4">
                    <Text>
                        {success}
                    </Text>
                    <Text>
                        {total + ` Appointment${total > 1 ? 's' : ''}`}
                    </Text>
                </Flex>
                <ProgressBar showAnimation={true} value={total > 0 ? (100*success)/total : 0} className="mt-2" />
            </Card>
            <Card className="h-full">
                <Text>Total</Text>
                <Metric>Failed</Metric>
                <Flex className="mt-4">
                    <Text>
                        {failed}
                    </Text>
                    <Text>
                        {total + ` Appointment${total > 1 ? 's' : ''}`}
                    </Text>
                </Flex>
                <ProgressBar showAnimation={true} value={total > 0 ? (100*failed)/total : 0} className="mt-2" />
            </Card>
            </Flex>
        </Col>
       </Grid>
    )
}