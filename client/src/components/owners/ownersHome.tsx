import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { OwnersModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"

export const OwnersHome = () => {

    const [createModal, setCreateModal] = useState(false)
    const role = useUserStatus(store => store.role)
    const { t } = useTranslation()

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }

    const arr: string[] = t('ownersTableHeaders',{ returnObjects: true })

    return(
        <>
            {createModal && <OwnersModal type="create" close={handleViewer} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={t('owners')} 
                    desc={role !== 'viewer' ? t('ownersDesc') : t('ownersDescViewer')} 
                    buttonText={t('ownersCreate')} 
                    buttonAction={() => handleViewer(true)}
                />
                <TableShared 
                    tableHeaders={arr}
                    data={[]}
                    origin={Origin.Owner}
                    editFn={() => alert('edit')}
                    deleteFn={() => alert('delete')} 
                    fetching={false} 
                    error={false}                
                />
            </main>
        </>
    )
}