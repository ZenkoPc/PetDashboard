import { useEffect, useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { RazaModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"
import { Breed, ModalBreedsDeleteProps, ModalBreedsEditProps, ModalProps } from "../../types/types"
import { resetBreedDeleteModal, resetBreedEditModal, resetModal } from "../../helpers/resetData"
import { DeleteModal } from "../shared/deleteModal"
import { useBreeds } from "../../hooks/breeds/useBreeds"
import { useBreedCreate } from "../../hooks/breeds/useBreedsCreate"
import { useBreedEdit } from "../../hooks/breeds/useBreedsEdit"
import { useBreedRemove } from "../../hooks/breeds/useBreedsDelete"
import { BaseModal } from "../shared/modal"
import { useQueryClient } from "@tanstack/react-query"

export const RazaHome = () => {

    const [create, setCreate] = useState(false)
    const [editModal, setEditModal] = useState<ModalBreedsEditProps>(resetBreedEditModal)
    const [deleteModal, setDeleteModal] = useState<ModalBreedsDeleteProps>(resetBreedDeleteModal)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const { role, token } = useUserStatus()
    const { t } = useTranslation()
    const { breeds } = useBreeds()
    const queryClient = useQueryClient()
    const createFn = useBreedCreate(setModal)
    const edit = useBreedEdit(setModal)
    const remove = useBreedRemove(setModal)

    const handleCreate = (value: Breed) => {
        createFn.mutate({ value, token })
    }

    const handleEdit = (value: Breed) => {
        edit.mutate({ value, token })
    }

    const handleDelete = (id: string) => {
        remove.mutate({ id, token })
    }

    useEffect(() => {
        if(createFn.isSuccess){
            setCreate(false)
            queryClient.invalidateQueries({ queryKey: ['breedsList'] })
        }
    }, [createFn.isSuccess, queryClient])

    useEffect(() => {
        if(edit.isSuccess){
            setEditModal(resetBreedEditModal)
            queryClient.invalidateQueries({ queryKey: ['breedsList'] })
        }
    }, [edit.isSuccess, queryClient])

    useEffect(() => {
        if(remove.isSuccess){
            setDeleteModal(resetBreedDeleteModal)
            queryClient.invalidateQueries({ queryKey: ['breedsList'] })
        }
    }, [remove.isSuccess, queryClient])

    const handleViewer = (value: boolean) => {
        setCreate(value)
    }
    
    return (
        <>
            {create && <RazaModal type="create" close={handleViewer} submitAction={handleCreate} />}
            {editModal.status && <RazaModal type="edit" close={() => setEditModal(resetBreedEditModal)} submitAction={handleEdit} />}
            {deleteModal.status && <DeleteModal id={deleteModal.selected} title={t('breedsDeleteMessage')} handleDelete={handleDelete} close={() => setDeleteModal(resetBreedDeleteModal)} />}
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={() => setModal(resetModal)} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={t('breeds')} 
                    desc={role !== 'viewer' ? t('breedsDesc') : t('breedsDescViewer')} 
                    buttonText={t('breedsCreate')} 
                    buttonAction={() => handleViewer(true)}                
                />
                <TableShared 
                    tableHeaders={t('breedsTableHeaders', { returnObjects: true })}
                    data={breeds?.data !== undefined ? breeds?.data : []} 
                    origin={Origin.Breed} 
                    fetching={false} 
                    error={false}        
                    editFn={(value: Breed) => setEditModal({
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