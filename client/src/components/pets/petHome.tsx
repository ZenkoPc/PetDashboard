import { useEffect, useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { ModalPet } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"
import { ModalPetsDeleteProps, ModalPetsEditProps, ModalProps, Pet } from "../../types/types"
import { resetModal, resetPetsDeleteModal, resetPetsEditModal } from "../../helpers/resetData"
import { DeleteModal } from "../shared/deleteModal"
import { BaseModal } from "../shared/modal"
import { usePets } from "../../hooks/pets/usePets"
import { usePetsCreate } from "../../hooks/pets/usePetsCreate"
import { usePetsEdit } from "../../hooks/pets/usePetsEdit"
import { usePetsDelete } from "../../hooks/pets/usePetsDelete"
import { useQueryClient } from "@tanstack/react-query"

export const PetHome = () => {

    const [createModal, setCreateModal] = useState<boolean>(false)
    const [editModal, setEditModal] = useState<ModalPetsEditProps>(resetPetsEditModal)
    const [deleteModal, setDeleteModal] = useState<ModalPetsDeleteProps>(resetPetsDeleteModal)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const { role, token } = useUserStatus()
    const { t } = useTranslation()
    const { pets } = usePets()
    const queryClient = useQueryClient()
    const create = usePetsCreate(setModal)
    const edit = usePetsEdit(setModal)
    const remove = usePetsDelete(setModal)

    const handleCreate = (value: Pet) => {
        console.log(value)
        create.mutate({ value, token })
    }

    const handleEdit = (value: Pet) => {
        console.log(value)
        edit.mutate({ value, token })
    }

    const handleDelete = (id: string) => {
        console.log(id)
        remove.mutate({ id, token })
    }

    useEffect(() => {
        if(create.isSuccess){
            setCreateModal(false)
            queryClient.invalidateQueries({ queryKey: ['petsList'] })
        }
    }, [create.isSuccess, queryClient])

    useEffect(() => {
        if(edit.isSuccess){
            setEditModal(resetPetsEditModal)
            queryClient.invalidateQueries({ queryKey: ['petsList'] })
        }
    }, [edit.isSuccess, queryClient])

    useEffect(() => {
        if(remove.isSuccess === true){
            setDeleteModal(resetPetsDeleteModal)
            queryClient.invalidateQueries({ queryKey: ['petsList'] })
        }
    }, [remove.isSuccess, queryClient])

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }
    
    return(
        <>
            {createModal && <ModalPet type="create" closeModal={() => handleViewer(false)} submitAction={handleCreate} />}
            {editModal.status && <ModalPet type="edit" closeModal={() => setEditModal(resetPetsEditModal)} selected={editModal.selected} submitAction={handleEdit} />}
            {deleteModal.status && <DeleteModal id={deleteModal.selected} title={t('petsDeleteMessage')} close={() => setDeleteModal(resetPetsDeleteModal)} handleDelete={handleDelete} />}
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={() => setModal(resetModal)} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={t('pets')} 
                    desc={role !== 'viewer' ? t('petsDesc') : t('petsDescViewer')} 
                    buttonText={t('petsCreate')} 
                    buttonAction={handleViewer} 
                />
                <TableShared 
                    origin={Origin.Pet}
                    tableHeaders={t('petsTableHeaders',{ returnObjects: true })}
                    data={pets?.data !== undefined ? pets?.data : []} 
                    fetching={false} 
                    error={false} 
                    editFn={(value: Pet) => setEditModal({
                        status: true,
                        selected: value
                    })} 
                    deleteFn={(id: string) => setDeleteModal({
                        status: true,
                        selected: id
                    })}                
                />
            </main>
        </>
    )
}