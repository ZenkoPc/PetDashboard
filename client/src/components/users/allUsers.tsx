import { Button, Card, Select, SelectItem, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text } from "@tremor/react"
import { useUsers } from "../../hooks/useUsers"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Loading } from "../loading"
import { useState } from "react"

export const AllUsers = () => {

    const [filters, setFilters] = useState<string>('')
    const { users, page, prevPage, nextPage } = useUsers({ filters })

    if(users.isLoading) return <Loading />

    if(users.isError) return <p>An error has ocurred, please try again later</p>

    const handleChange = (e: string) => {
        setFilters(e)
    }

    return (
    <>
        <Card className="h-[590px]">
            <Select className="w-[260px]" onValueChange={(value) => handleChange(value)}>
                <SelectItem value={"male"} className="capitalize" />
                <SelectItem value={"female"} className="capitalize" />
            </Select>
            <Table className="h-full">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>User</TableHeaderCell>
                        <TableHeaderCell>First Name</TableHeaderCell>
                        <TableHeaderCell>Last Name</TableHeaderCell>
                        <TableHeaderCell>Gender</TableHeaderCell>
                        <TableHeaderCell>City</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        users?.data?.results?.map(user => (
                            <TableRow key={user.email}>
                                <TableCell>
                                    <img className="rounded-full" src={user.picture.thumbnail} alt={user.name.title} />
                                </TableCell>
                                <TableCell>
                                    {user.name.first}
                                </TableCell>
                                <TableCell>
                                    {user.name.last}
                                </TableCell>
                                <TableCell>
                                    {user.gender}
                                </TableCell>
                                <TableCell>
                                    {user.location.city}
                                </TableCell>
                                <TableCell className="flex gap-3">
                                    <Button disabled icon={PencilIcon} />
                                    <Button disabled color="red" icon={TrashIcon} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Card>
        <div className="mt-5 flex items-center gap-5">
            <Button onClick={prevPage} disabled={page === 1 || users.isFetching} icon={ChevronDoubleLeftIcon}>
                Prev
            </Button>
            <Text className="text-xl">
                {page}
            </Text>
            <Button onClick={nextPage} disabled={users.isFetching} icon={ChevronDoubleRightIcon} iconPosition="right">
                Next
            </Button>
        </div>
    </>
    )
}