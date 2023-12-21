import { useEffect, useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { OwnersModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"
import { ModalOwnersDeleteProps, ModalOwnersEditProps, ModalProps, Owner } from "../../types/types"
import { resetModal, resetOwnerDeleteModal, resetOwnerEditModal } from "../../helpers/resetData"
import { DeleteModal } from "../shared/deleteModal"
import { BaseModal } from "../shared/modal"
import { useOwners } from "../../hooks/owners/useOwners"
import { useOwnersCreate } from "../../hooks/owners/useOwnersCreate"
import { useOwnersEdit } from "../../hooks/owners/useOwnersEdit"
import { useOwnersDelete } from "../../hooks/owners/useOwnersDelete"
import { useQueryClient } from "@tanstack/react-query"

export const OwnersHome = () => {

    const [createModal, setCreateModal] = useState(false)
    const { role, token } = useUserStatus()
    const { t } = useTranslation()
    const [editModal, setEditModal] = useState<ModalOwnersEditProps>(resetOwnerEditModal)
    const [deleteModal, setDeleteModal] = useState<ModalOwnersDeleteProps>(resetOwnerDeleteModal)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const queryClient = useQueryClient()
    const { owners } = useOwners()
    const create = useOwnersCreate(setModal)
    const edit = useOwnersEdit(setModal)
    const deleted = useOwnersDelete(setModal)

    const handleCreate = (value: Owner) => {
        create.mutate({ value, token })
    }

    const handleEdit = (value: Owner) => {
        edit.mutate({ value, token })
    }

    const handleDelete = (id: string) => {
        deleted.mutate({ id, token })
    }

    useEffect(() => {
        if(create.isSuccess){
            setCreateModal(false)
            queryClient.invalidateQueries({ queryKey: ['ownersList'] })
        }
    }, [create.isSuccess, queryClient])

    useEffect(() => {
        if(edit.isSuccess){
            setEditModal(resetOwnerEditModal)
            queryClient.invalidateQueries({ queryKey: ['ownersList'] })
        }
    }, [edit.isSuccess, queryClient])

    useEffect(() => {
        if(deleted.isSuccess){
            setDeleteModal(resetOwnerDeleteModal)
            queryClient.invalidateQueries({ queryKey: ['ownersList'] })
        }
    }, [deleted.isSuccess, queryClient])

    const closeModal = () => {
        setDeleteModal(resetOwnerDeleteModal)
    }

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }

    return(
        <>
            {createModal && <OwnersModal type="create" create={handleCreate} close={handleViewer} />}
            {editModal.status && <OwnersModal type="edit" close={handleViewer} edit={handleEdit} />}
            {deleteModal.status && <DeleteModal close={closeModal} handleDelete={handleDelete} title={t('ownersDeleteMessage')} id={deleteModal.selected} />}
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={() => setModal(resetModal)} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={t('owners')} 
                    desc={role !== 'viewer' ? t('ownersDesc') : t('ownersDescViewer')} 
                    buttonText={t('ownersCreate')} 
                    buttonAction={() => handleViewer(true)}
                />
                <TableShared 
                    tableHeaders={t('ownersTableHeaders',{ returnObjects: true })}
                    data={owners?.data !== undefined ? owners?.data : []}
                    origin={Origin.Owner}
                    editFn={(value: Owner) => setEditModal({
                        status: true,
                        selected: value
                    })}
                    deleteFn={(id: string) => setDeleteModal({
                        status: true,
                        selected: id
                    })} 
                    fetching={false} 
                    error={false}                
                />
            </main>
        </>
    )
}