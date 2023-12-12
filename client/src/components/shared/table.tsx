import { MagnifyingGlassIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Button, Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput } from "@tremor/react"
import { useUserStatus } from "../../store/useUserStatus"
import { useEffect, useState } from "react"
import { ModalDeleteProps, ModalEditProps, ModalProps, PetType, TableProps } from "../../types/users"
import { DeleteModal } from "./deleteModal"
import { useQueryClient } from "@tanstack/react-query"
import { LoadingTable } from "../users/loadingTable"
import { BaseModal } from "./modal"
import { useDeletePetType } from "../../hooks/petTypes/useDeletePetType"
import { resetDeleteModal, resetEditProps, resetModal } from "../../helpers/resetData"
import { NoTableData } from "./noTableData"
import { PetTypePop } from "../petTypes/petType"
import { useEditPetType } from "../../hooks/petTypes/useEditPetType"
import { HeaderPagination } from "./headerPagination"
import { NoResultsData } from "./noResultsData"

export const TableShared = ({ tableHeaders, data, origin, fetching, error }: TableProps) => {

    const queryClient = useQueryClient()
    const { role, token } = useUserStatus()
    const [filter, setFilter] = useState<string>('')
    const [limit, setLimit] = useState<number>(5)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const [deleteModal, setDeleteModal] = useState<ModalDeleteProps>(resetDeleteModal)
    const [editModal, setEditModal] = useState<ModalEditProps>(resetEditProps)
   
    const finalData = limit > 0 
        ? data?.slice(0,limit) 
        : data
    
    const filteredData = filter.length > 2
        ? finalData?.filter((data: PetType) => data?.name?.includes(filter.toLowerCase()))
        : finalData

    const deletePet = useDeletePetType(token)
    const editPetType = useEditPetType()

    const handleDelete = () => {
       switch(origin){
        case 'pet-types': {
            deletePet.mutate(deleteModal.selectedId)
            setDeleteModal(resetDeleteModal)
            break
        }
       }
    }
    
    const handleEdit = (name: string) => {
        switch(origin){
            case 'pet-types': {
                editPetType.mutate({
                    id: editModal.selectedId,
                    name: name
                })
                break
            }
        }
    }

    useEffect(() => {
        if(editPetType.isSuccess === true){
            setModal({
                status: true,
                method: editPetType?.data?.status === 200 ? 'Exito!' : 'A ocurrido un error',
                message: editPetType?.data?.status === 200 ? 'El tipo de mascota ha sido editado' : editPetType?.data?.message,
                color: editPetType?.data?.status === 200 ? 'green' : 'red'
            })
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
            if(editPetType.data?.status === 200){
                setEditModal(resetEditProps)
            }
        }
    }, [editPetType.isSuccess])

    useEffect(() => {
        if(deletePet.isSuccess === true){
            setModal({
                status: true,
                method: deletePet?.data?.status === 200 ? 'Exito!' : 'A ocurrido un error',
                message: deletePet?.data?.status === 200 ? 'El tipo de mascota ha sido eliminado' : deletePet?.data?.message,
                color: deletePet?.data?.status === 200 ? 'green' : 'red'
            })
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }
    }, [deletePet.isSuccess])

    if(data?.length === undefined || error) return <NoTableData />

    return (
        <>
            {editModal.status && origin === 'pet-types'
            ? <PetTypePop type={"edit"} selected={editModal.selected} close={() => setEditModal(resetEditProps)} submit={handleEdit} />
            : ''
            }
            {deleteModal.status && <DeleteModal handleDelete={handleDelete} close={() => setDeleteModal(resetDeleteModal)} title={deleteModal.title} />}
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={() => setModal(resetModal)} />}
            <div>
                <Flex className="mt-7 flex-col items-end xs:flex-row gap-3" justifyContent="end">
                    <HeaderPagination setLimit={setLimit} data={data} />
                    <TextInput disabled={+finalData!.length < 1 && filter.length === 0} onChange={(e) => setFilter(e.currentTarget.value)} icon={MagnifyingGlassIcon} name="search" className="max-w-max" />
                </Flex>
                <Card className="mt-5">
                    {fetching && <LoadingTable />}
                    {!fetching && <Table>
                        <TableHead>
                            <TableRow key={'Headers'}>
                                {
                                    tableHeaders.map((header) => (
                                        <TableHeaderCell>
                                            {header}
                                        </TableHeaderCell>
                                    ))
                                }
                                {role !== 'viewer' && <TableHeaderCell className={tableHeaders.length > 2 ?  '' : 'text-end' }>Acciones</TableHeaderCell>}
                            </TableRow>
                        </TableHead>
                        {
                            data?.length !== undefined && data.length > 0
                            ? <TableBody>
                                {
                                    +filteredData!.length > 0
                                    ? origin === 'pet-types' 
                                        ? filteredData?.map((ob) => (
                                            <TableRow key={ob.id}>
                                                <TableCell className="capitalize">
                                                    {ob?.name}
                                                </TableCell>
                                                {role !== 'viewer' && <TableCell>
                                                    <Flex className="gap-3" justifyContent={tableHeaders.length > 2 ? 'start' : 'end'}>
                                                        <Button type="button" icon={PencilIcon} onClick={() => setEditModal({
                                                            status: true,
                                                            selectedId: ob.id,
                                                            selected: ob.name
                                                        })} />
                                                        <Button type="button" icon={TrashIcon} color="red" 
                                                            onClick={() => setDeleteModal({
                                                                status: true,
                                                                title: '¿Seguro de eliminar este tipo de mascota?',
                                                                selectedId: ob.id
                                                            })}
                                                        />
                                                    </Flex>
                                                </TableCell>}
                                            </TableRow>
                                        ))
                                        : ''
                                    : <NoResultsData />
                                }
                            </TableBody>
                            : (
                                <>
                                    <NoTableData />
                                </>
                            )
                        }
                    </Table>}
                </Card>
            </div>
        </>
    )
}