import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { RazaModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"
import { useTranslation } from "react-i18next"

export const RazaHome = () => {

    const [create, setCreate] = useState(false)
    const role = useUserStatus(store => store.role)
    const { t } = useTranslation()

    const handleViewer = (value: boolean) => {
        setCreate(value)
    }

    return (
        <>
            {create && <RazaModal type="create" close={handleViewer} />}
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
                    data={[]} 
                    origin={Origin.Breed} 
                    fetching={false} 
                    error={false}        
                    editFn={() => alert('edit')}
                    deleteFn={() => alert('delete')}        
                />
            </main>
        </>
    )
}