import { Button, Card, Icon, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react"
import { InformationCircleIcon, TrashIcon } from "@heroicons/react/24/solid"
import { User } from "../../types/users"
import { LoadingTable } from "./loadingTable"
import { useUserStatus } from "../../store/useUserStatus"
import { useMutation } from "@tanstack/react-query"
import { petAdmin } from "../../api/petadmin"
import { useEffect, useState } from "react"
import { Alert } from "flowbite-react"
import { DeleteModal } from "./deleteModal"

export const AllUsers = ({ users, create }:{ users: any, create: any }) => {

    const token = useUserStatus(store => store.token)
    const [visible, setVisible] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const deleteUser = useMutation({
        mutationFn: (id: string) => { 
            return petAdmin.delete('/remove/'+id,{
                headers: {
                    "x-auth-token": "Bearer "+ token
                }
            })
        }
    })

    const handleVisibleDelete = () => {
        setConfirmDelete(false)
    }

    const handleDelete = () => {
        deleteUser.mutate(deleteId)
        setDeleteId('')
        setVisible(true)
        setConfirmDelete(false)
    }

    useEffect(() => {
        users.refetch()
        setVisible(true)
    }, [deleteUser.isSuccess])
    
    if(users.isLoading) return <LoadingTable />

    if(users.isFetching || create.isFetching) return <LoadingTable />

    if(users.isError || create.isError ) return <p>Something has ocurred, try again later</p>

    if(deleteUser.isPending) return <LoadingTable />

    return (
    <>
        {confirmDelete && <DeleteModal visible={handleVisibleDelete} handleDelete={handleDelete} />}
        {deleteUser.isError && 
            <Alert className={`${visible === true ? 'fixed flex justify-between items-center top-3 left-[35%] z-[9999]' : 'hidden'}`} color={'failure'} onDismiss={() => setVisible(false)}>
                <div className="h-full flex items-center">
                    <Icon color="red" icon={InformationCircleIcon} />
                    <span className="font-medium p-0">
                        An error has ocurred!
                    </span>
                    Something went wrong, try again later
                </div>
            </Alert>
        }
        {deleteUser.isSuccess && 
            <Alert className={`${visible === true ? 'fixed top-3 left-[35%] z-[9999]' : 'hidden'}`} color={'success'} onDismiss={() => setVisible(false)}>
                <div className="h-full flex items-center">
                    <Icon color="green" icon={InformationCircleIcon} />
                    <span className="font-medium">
                        Success!
                    </span>
                    The selected user was removed successfully
                </div>
            </Alert>
        }
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
                                    <Button onClick={() => { 
                                        setConfirmDelete(true)
                                        setDeleteId(user.id)
                                    }} color="red" icon={TrashIcon} />
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