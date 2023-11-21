import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Button, Table, Text, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Flex } from "@tremor/react"
import { useAppointmentStore } from "../../store/useAppointmentStore"

const appointments = [
    {
        id: 1,
        desc: 'Remove some thorns that got stuck in a dog when it jumped to a bush',
        user: 'Melissa@gmail.com',
        hour: '8:00',
        date: '20/11/2023'
    },
    {
        id: 2,
        desc: 'Make an operation to reacomodate a rabbit liver',
        user: 'Miguel@gmail.com',
        hour: '14:00',
        date: '20/11/2023'
    },
    {
        id: 3,
        desc: 'Treatment for tape  worms on a old cat',
        user: 'Monica@gmail.com',
        hour: '11:40',
        date: '19/11/2023'
    },
    {
        id: 4,
        desc: 'Put a cone to a dog after a bath',
        user: 'JoseJose@gmail.com',
        hour: '12:00',
        date: '20/11/2023'
    },
    {
        id: 5,
        desc: 'An old turtle doesnt eat anymore, exams to do: blood, xray',
        user: 'Aura@gmail.com',
        hour: '23:20',
        date: '20/11/2023'
    },
    {
        id: 6,
        desc: 'Remove some snacks from a dog´s hair',
        user: 'Robert@gmail.com',
        hour: '6:50',
        date: '21/11/2023'
    },
    {
        id: 7,
        desc: 'Put a cone to a dog after a bath',
        user: 'JoseJose@gmail.com',
        hour: '12:00',
        date: '19/11/2023'
    },
    {
        id: 8,
        desc: 'An old turtle doesnt eat anymore, exams to do: blood, xray',
        user: 'Aura@gmail.com',
        hour: '23:20',
        date: '21/11/2023'
    },
    {
        id: 9,
        desc: 'Remove some snacks from a dog´s hair',
        user: 'Robert@gmail.com',
        hour: '10:50',
        date: '21/11/2023'
    },
]

const dates = new Date()

const day = dates.getDate().toString()
const month = dates.getMonth() + 1
const year = dates.getFullYear().toString()

const fullYear = day+"/"+month+"/"+year

const dataToday = appointments.filter((data) => data.date === fullYear)

export const DatesTables = () => {

    const { setSuccess, setFailed } = useAppointmentStore()

    return (
        <>
            <Table className="h-full mt-4">
                <TableHead>
                    <TableHeaderCell>ID</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>User</TableHeaderCell>
                    <TableHeaderCell>Hour</TableHeaderCell>
                    <TableHeaderCell>Actions</TableHeaderCell>
                </TableHead>
                <TableBody className="overflow-hidden relative h-full">
                    {dataToday.length < 1 &&
                        <Flex justifyContent="center" alignItems="center" className="top-20 w-full h-full absolute">
                            <Text>
                                Data not found, try again later.
                            </Text>
                        </Flex>
                    }
                    {
                        dataToday.map((date) => {
                                return (
                                    <>
                                        <TableRow key={date.hour+date.id}>
                                            <TableCell>{date.id}</TableCell>
                                            <TableCell>{date.desc}</TableCell>
                                            <TableCell>{date.user}</TableCell>
                                            <TableCell>{date.hour}</TableCell>
                                            <TableCell className="flex gap-1">
                                                <Button onClick={setSuccess} color="emerald" className="rounded-full p-1" icon={CheckIcon}></Button>
                                                <Button onClick={setFailed} color="red" className="rounded-full p-1" icon={TrashIcon}></Button>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )
                            
                        })
                    }
                </TableBody>
            </Table>
        </>
    )
}