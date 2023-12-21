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
import { LoadingTable } from "../users/loadingTable"
import { useTranslation } from "react-i18next"

interface Props{
    pets: APIRes
    error: boolean
    fetch: boolean
}

export const PetTypesHome = () => {

    const queryClient = useQueryClient()

    const { role, token } = useUserStatus()
    const { pets, error, fetch }: Props = usePetTypes()
    const { t } = useTranslation()

    const [resModal, setResModal] = useState<ModalProps>(resetModal)
    const [createModal, setCreateModal] = useState(resetPetTypeModal)
    const [editModal, setEditModal] = useState<ModalPetTypeEditProps>(resetPetTypeEditProps)
    const [deleteModal, setDeleteModal] = useState<ModalDeleteProps>(resetPetTypeDeleteModal)

    const setModal = (data: ModalProps) => {
        setResModal(data)
    }

    const handleNewType = useTypeCreate(setModal)
    const handleEditType = useEditPetType(setModal)
    const handleDeleteType = useDeletePetType(setModal)

    const handleSubmitCreate = (name: string) => {
        handleNewType.mutate({ name, token})
    }

    const handleSubmitEdit = (name: string) => {
        handleEditType.mutate({ name, id: editModal.selectedId, token })
    }

    const handleSubmitDelete = (id: string) => {
        handleDeleteType.mutate({ id, token })
    }

    useEffect(() => {
        if(handleNewType.isSuccess){
            setCreateModal(resetPetTypeModal)
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }
    }, [handleNewType.isSuccess, queryClient])

    useEffect(() => {
        if(handleEditType.isSuccess){
            setEditModal(resetPetTypeEditProps)
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }
    }, [handleEditType.isSuccess, queryClient])

    useEffect(() => {
        if(handleDeleteType.isSuccess === true){
            setDeleteModal(resetPetTypeDeleteModal)
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }
    }, [handleDeleteType.isSuccess, queryClient])

    return(
        <>
            {resModal.status && <BaseModal color={resModal.color} method={resModal.method} message={resModal.message} close={() => setResModal(resetModal)}/> }
            {createModal.status && <PetTypePop submit={handleSubmitCreate} type={createModal.type} close={() => setCreateModal(resetPetTypeModal)} />}
            {editModal.status && <PetTypePop submit={handleSubmitEdit} type={createModal.type} close={() => setEditModal(resetPetTypeEditProps)} selected={editModal.selected} />}
            {deleteModal.status && <DeleteModal handleDelete={handleSubmitDelete} close={() => setDeleteModal(resetPetTypeDeleteModal)} title={deleteModal.title} id={deleteModal.selectedId} />}

            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={t('petTypes')} 
                    desc={role !== 'viewer' 
                        ? t('petTypesDesc') 
                        : t('petTypesDescViewer')
                    } 
                    buttonText={t('petTypesCreate')} 
                    buttonAction={() => setCreateModal({
                        status: true,
                        type: 'create'
                    })}
                />
                { handleNewType.isPending || handleEditType.isPending || handleDeleteType.isPending && <LoadingTable /> }
                { !handleNewType.isPending && !handleEditType.isPending && !handleDeleteType.isPending && <TableShared 
                    error={error} 
                    fetching={fetch} 
                    tableHeaders={t('petTypesTableHeaders',{ returnObjects: true })} 
                    data={pets !== undefined ? pets?.data?.petTypes : []}
                    editFn={(value: PetType) => setEditModal({
                        status: true,
                        selectedId: value.id,
                        selected: value.name
                    })}
                    deleteFn={(id: string) => setDeleteModal({
                        status: true,
                        selectedId: id,
                        title: t('petTypesDeleteTitle')
                    })}
                    origin={Origin.PetType}
                />}
            </main>
        </>
    )
}