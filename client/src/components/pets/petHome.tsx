import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { ModalPet } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"

export const PetHome = () => {

    const [modal, setCreateModal] = useState(false)
    const role = useUserStatus(store => store.role)
    const { t } = useTranslation()

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }

    return(
        <>
            {modal && <ModalPet type="create" closeModal={handleViewer} />}
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
                    data={[]} 
                    fetching={false} 
                    error={false} 
                    editFn={() => alert('edit')} 
                    deleteFn={() => alert('delete')}                
                />
            </main>
        </>
    )
}