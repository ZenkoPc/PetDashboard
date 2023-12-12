import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { ModalPet } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"

export const PetHome = () => {

    const [modal, setCreateModal] = useState(false)
    const role = useUserStatus(store => store.role)

    const handleViewer = (value: boolean) => {
        setCreateModal(value)
    }

    return(
        <>
            {modal && <ModalPet type="create" closeModal={handleViewer} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Mascotas"} 
                    desc={role !== 'viewer' ? "Administra a todas las mascotas desde este modulo" : "Visualiza las mascotas registradas desde este modulo"} 
                    buttonText={"Crear Mascota"} 
                    buttonAction={handleViewer} 
                />
                <TableShared 
                    origin="pets"
                    tableHeaders={['Nombre','Raza','Dueño']} 
                    data={[]}
                />
            </main>
        </>
    )
}