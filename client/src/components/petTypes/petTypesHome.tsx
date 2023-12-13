import { useEffect, useState } from "react"
import { usePetTypes } from "../../hooks/petTypes/usePetTypes"
import { useUserStatus } from "../../store/useUserStatus"
import { APIRes, ModalDeleteProps, ModalPetTypeEditProps, ModalProps, PetType } from "../../types/types"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { PetTypePop } from "./petType"
import { resetPetTypeEditProps, resetModal, resetPetTypeDeleteModal, resetPetTypeModal } from "../../helpers/resetData"
import { useQueryClient } from "@tanstack/react-query"
import { useTypeCreate } from "../../hooks/petTypes/useTypeCreate"
import { BaseModal } from "../shared/modal"
import { Origin } from "../../types/enum"
import { useEditPetType } from "../../hooks/petTypes/useEditPetType"
import { useDeletePetType } from "../../hooks/petTypes/useDeletePetType"
import { DeleteModal } from "../shared/deleteModal"

interface Props{
    pets: APIRes
    error: boolean
    fetch: boolean
}

export const PetTypesHome = () => {

    const queryClient = useQueryClient()

    const { role } = useUserStatus()
    const { pets, error, fetch }: Props = usePetTypes()

    const handleNewType = useTypeCreate()
    const handleEditType = useEditPetType()
    const handleDeleteType = useDeletePetType()

    const [resModal, setResModal] = useState<ModalProps>(resetModal)
    const [createModal, setCreateModal] = useState(resetPetTypeModal)
    const [editModal, setEditModal] = useState<ModalPetTypeEditProps>(resetPetTypeEditProps)
    const [deleteModal, setDeleteModal] = useState<ModalDeleteProps>(resetPetTypeDeleteModal)

    const handleSubmitCreate = (name: string) => {
        handleNewType.mutate(name)
    }

    const handleSubmitEdit = (name: string) => {
        handleEditType.mutate({
            id: editModal.selectedId,
            name: name
        })
    }

    const handleSubmitDelete = (id: string) => {
        handleDeleteType.mutate(id)
    }

    useEffect(() => {
        if(handleNewType.isSuccess === true){
            setResModal({
                status: true,
                method: handleNewType.data?.status === 200 ? 'Exito!' : 'Un error ha ocurrido!',
                message: handleNewType.data?.status === 200 ? 'Tipo creado exitosamente' : handleNewType.data?.message,
                color: handleNewType.data?.status === 200 ? 'green' : 'red'
            })
            if(handleNewType.data?.status === 200){
                queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
                setCreateModal(resetPetTypeModal)
            }
        }
    }, [handleNewType.isSuccess])

    useEffect(() => {
        if(handleEditType.isSuccess === true){
            setResModal({
                status: true,
                method: handleEditType.data?.status === 200 ? 'Exito!' : 'Un error ha ocurrido!',
                message: handleEditType.data?.status === 200 ? 'Tipo editado exitosamente' : handleEditType.data?.message,
                color: handleEditType.data?.status === 200 ? 'green' : 'red'
            })
            if(handleEditType.data?.status === 200){
                queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
                setEditModal(resetPetTypeEditProps)
            }
        }
    }, [handleEditType.isSuccess])

    useEffect(() => {
        if(handleDeleteType.isSuccess === true){
            setResModal({
                status: true,
                method: handleDeleteType.data?.status === 200 ? 'Exito!' : 'Un error ha ocurrido!',
                message: handleDeleteType.data?.status === 200 ? 'Tipo eliminado exitosamente' : handleDeleteType.data?.message,
                color: handleDeleteType.data?.status === 200 ? 'green' : 'red'
            })
            if(handleDeleteType.data?.status === 200){
                queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
                setDeleteModal(resetPetTypeDeleteModal)
            }
        }
    }, [handleDeleteType.isSuccess])

    return(
        <>
            {resModal.status && <BaseModal color={resModal.color} method={resModal.method} message={resModal.message} close={() => setResModal(resetModal)}/> }
            {createModal.status && <PetTypePop submit={handleSubmitCreate} type={createModal.type} close={() => setCreateModal(resetPetTypeModal)} />}
            {editModal.status && <PetTypePop submit={handleSubmitEdit} type={createModal.type} close={() => setEditModal(resetPetTypeEditProps)} selected={editModal.selected} />}
            {deleteModal.status && <DeleteModal handleDelete={handleSubmitDelete} close={() => setDeleteModal(resetPetTypeDeleteModal)} title={deleteModal.title} id={deleteModal.selectedId} />}

            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Tipos de mascostas"} 
                    desc={role !== 'viewer' 
                        ? "Administra todos los tipos de mascotas registrados desde este modulo" 
                        : "Visualiza todos los tipos de mascotas desde este modulo"
                    } 
                    buttonText={"Crear nuevo tipo"} 
                    buttonAction={() => setCreateModal({
                        status: true,
                        type: 'create'
                    })}
                />
                <TableShared 
                    error={error} 
                    fetching={fetch} 
                    tableHeaders={['Tipo de mascota']} 
                    data={pets?.data?.petTypes}
                    editFn={({ id, name }: PetType) => setEditModal({
                        status: true,
                        selectedId: id,
                        selected: name
                    })}
                    deleteFn={(id: string) => setDeleteModal({
                        status: true,
                        selectedId: id,
                        title: '¿Estas Seguro de eliminar este tipo de mascota?'
                    })}
                    origin={Origin.PetType}
                />
            </main>
        </>
    )
}