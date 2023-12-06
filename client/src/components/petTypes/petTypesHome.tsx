import { useUserStatus } from "../../store/useUserStatus"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"

export const PetTypesHome = () => {

    const role = useUserStatus(store => store.role)

    return(
        <>
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Tipos de mascostas"} 
                    desc={role !== 'viewer' 
                        ? "Administra todos los tipos de mascotas registrados desde este modulo" 
                        : "Visualiza todos los tipos de mascotas desde este modulo"
                    } 
                    buttonText={"Crear nuevo tipo"} 
                    buttonAction={() => alert('asd')}
                />
                <TableShared tableHeaders={['Tipo de mascota']} data={[]} />
            </main>
        </>
    )
}