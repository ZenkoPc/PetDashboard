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
import { PencilIcon } from "@heroicons/react/24/outline"
import { UpdateModal } from "./updateModal"

type Message = {
    title?: string,
    message?: string
}

export const AllUsers = ({ users, create }:{ users: any, create: any }) => {

    const token = useUserStatus(store => store.token)
    const [visible, setVisible] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [visibleUpdate, setVisibleUpdate] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User>()
    const [modalMessage, setModalMessage] = useState<Message>()
    const [updateError, setUpdateError] = useState('')
    const [modal,setModal] = useState(false)

    const deleteUser = useMutation({
        mutationFn: (id: string) => { 
            return petAdmin.delete('/remove/'+id,{
                headers: {
                    "x-auth-token": "Bearer "+ token
                }
            })
        }
    })

    const updateUser = useMutation({
        mutationFn: async (user: User) => {
            return await petAdmin.put(`/edit/${encodeURIComponent(user.id)}`,{
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                role: user.role
            },{
                headers: {
                    "x-auth-token":"Bearer "+token
                }   
            }).catch(err => err.response.data)
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

    const handleUpdateClose = () => {
        setVisibleUpdate(false)
    }

    const handleUpdate = (user: User) => {
        updateUser.mutate(user)
    }

    useEffect(() => {
        if(updateUser.data?.status === 200){
            setVisibleUpdate(false)
            setVisible(true)
            setModal(true)
            setModalMessage({
                title: 'Success',
                message: 'The selected user was updated successfully'
            })
            users.refetch()
        }else{
            if(updateUser.data?.errors){
                setUpdateError(updateUser.data?.errors[0])
            }else{
                setUpdateError(updateUser.data?.message)
            }
        }

    }, [updateUser.isSuccess])

    useEffect(() => {
        setModal(true)
        setModalMessage({
            title: 'Success',
            message: 'The selected user was removed successfully'
        })
        users.refetch()
    }, [deleteUser.isSuccess])

    useEffect(() => {
        setModal(true)
        setModalMessage({
            title: 'An error has ocurred!',
            message: 'Something went wrong, try again later'
        })
    }, [deleteUser.isError])

    if(users.isLoading) return <LoadingTable />

    if(users.isFetching || create.isFetching) return <LoadingTable />

    if(users.isError || create.isError ) return <p>Something has ocurred, try again later</p>

    if(deleteUser.isPending) return <LoadingTable />

    return (
    <>
        {visibleUpdate && <UpdateModal error={updateError} handleUpdate={handleUpdate} user={selectedUser} close={handleUpdateClose} />}
        {confirmDelete && <DeleteModal visible={handleVisibleDelete} handleDelete={handleDelete} />}
        {modal && 
            <Alert className={`${visible === true ? 'fixed flex justify-between items-center top-3 left-[35%] z-[9999]' : 'hidden'}`} color={`${deleteUser.isSuccess || updateUser.isSuccess ? 'success' : 'failure'}`} onDismiss={() => { setModal(false) } }>
                <div className="h-full flex items-center">
                    <Icon color={`${deleteUser.isSuccess || updateUser.isSuccess ? 'green':'red'}`} icon={InformationCircleIcon} />
                    <span className="font-medium p-0">
                        {modalMessage?.title}
                    </span>
                    {modalMessage?.message}
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
                                        setVisibleUpdate(true)
                                        setSelectedUser(user)
                                    }} color="blue" icon={PencilIcon} />
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