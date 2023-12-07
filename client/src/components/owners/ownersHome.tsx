import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { OwnersModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"

export const OwnersHome = () => {

    const [createModal, setCreateModal] = useState(false)
    const role = useUserStatus(store => store.role)

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }

    return(
        <>
            {createModal && <OwnersModal type="create" close={handleViewer} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Dueños"} 
                    desc={role !== 'viewer' ? "Administra los dueños/clientes desde esta seccion" : "Ve los dueños registrados desde este modulo"} 
                    buttonText={"Crear Dueño"} 
                    buttonAction={() => handleViewer(true)}
                />
                <TableShared tableHeaders={['Nombre','Correo','Direccion','Contacto']} data={[]} />
            </main>
        </>
    )
}