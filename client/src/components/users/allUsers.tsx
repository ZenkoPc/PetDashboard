import { Button, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react"
import { useUsers } from "../../hooks/useUsers"
import { TrashIcon } from "@heroicons/react/24/solid"
import { User } from "../../types/users"
import { LoadingTable } from "./loadingTable"

export const AllUsers = () => {

    const users = useUsers()

    if(users.isLoading) return <LoadingTable />

    if(users.isFetching) return <LoadingTable />

    if(users.isError) return <p>An error has ocurred, please try again later</p>
    
    return (
    <>
        <Card className="">
            <Table className="h-full">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Lastname</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Role</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody className="capitalize">
                    {
                        users?.data?.data?.users?.map((user: User) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.name}
                                </TableCell>
                                <TableCell>
                                    {user.lastname}
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    {user.role}
                                </TableCell>
                                <TableCell className="flex gap-3">
                                    <Button disabled color="red" icon={TrashIcon} />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Card>
    </>
    )
}