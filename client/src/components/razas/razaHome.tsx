import { useState } from "react"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { RazaModal } from "./modal"
import { useUserStatus } from "../../store/useUserStatus"
import { Origin } from "../../types/enum"

export const RazaHome = () => {

    const [create, setCreate] = useState(false)
    const role = useUserStatus(store => store.role)

    const handleViewer = (value: boolean) => {
        setCreate(value)
    }

    return (
        <>
            {create && <RazaModal type="create" close={handleViewer} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Razas"} 
                    desc={role !== 'viewer' ? "Administra las razas existentes para las mascotas desde este modulo" : "Visualiza las razas existentes desde este modulo"} 
                    buttonText={"Crear Raza"} 
                    buttonAction={() => handleViewer(true)}                
                />
                <TableShared 
                    tableHeaders={['Nombre', 'Tipo de mascota', 'Descripcion']}
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