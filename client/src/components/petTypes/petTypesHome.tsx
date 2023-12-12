import { useEffect, useState } from "react"
import { UsePetTypes } from "../../hooks/petTypes/usePetTypes"
import { useUserStatus } from "../../store/useUserStatus"
import { APIRes, ModalProps } from "../../types/users"
import { LogoDashboard } from "../logoDashboard"
import { Header } from "../shared/header"
import { TableShared } from "../shared/table"
import { PetTypePop } from "./petType"
import { resetModal, resetTypeModal } from "../../helpers/resetData"
import { useQueryClient } from "@tanstack/react-query"
import { useTypeCreate } from "../../hooks/petTypes/useTypeCreate"
import { BaseModal } from "../shared/modal"

interface Props{
    pets: APIRes
    error: boolean
    fetch: boolean
}

export const PetTypesHome = () => {

    const queryClient = useQueryClient()
    const { role } = useUserStatus()
    const { pets, error, fetch }: Props = UsePetTypes()
    const [modal, setModal] = useState({
        status: false,
        type: ''
    })
    const [resModal, setResModal] = useState<ModalProps>(resetModal)

    const handleNewType = useTypeCreate()

    const handleSubmit = (name: string) => {
        if(name.length > 2){
            handleNewType.mutate(name)
        }
    }

    useEffect(() => {
        if(handleNewType.isSuccess === true){
            setResModal({
                status: true,
                method: handleNewType.data?.status === 200 ? 'Exito!' : 'Un error ha ocurrido!',
                message: handleNewType.data?.status === 200 ? 'Tipo creado exitosamente' : handleNewType.data?.message,
                color: handleNewType.data?.status === 200 ? 'green' : 'red'
            })
            if(handleNewType.data?.status === 200){
                queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
                setModal(resetTypeModal)
            }
        }
    }, [handleNewType.isSuccess])

    return(
        <>
            {resModal.status && <BaseModal 
                color={resModal.color} 
                method={resModal.method} 
                message={resModal.message} 
                close={() => setResModal(resetModal)}
            /> }
            {modal.status && <PetTypePop submit={handleSubmit} type={modal.type} close={() => setModal(resetTypeModal)} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Header 
                    title={"Tipos de mascostas"} 
                    desc={role !== 'viewer' 
                        ? "Administra todos los tipos de mascotas registrados desde este modulo" 
                        : "Visualiza todos los tipos de mascotas desde este modulo"
                    } 
                    buttonText={"Crear nuevo tipo"} 
                    buttonAction={() => setModal({
                        status: true,
                        type: 'create'
                    })}
                />
                <TableShared error={error} fetching={fetch} origin="pet-types" tableHeaders={['Tipo de mascota']} data={pets?.data?.petTypes} />
            </main>
        </>
    )
}