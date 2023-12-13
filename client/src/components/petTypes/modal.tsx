import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button, Flex, TextInput } from "@tremor/react"
import { useEffect, useState } from "react"
import { ModalProps } from "../../types/types"
import { resetModal } from "../../helpers/resetData"
import { useTypeCreate } from "../../hooks/petTypes/useTypeCreate"
import { useQueryClient } from "@tanstack/react-query"

interface Props{
    type: string
    setNewData?: (value: string) => void
    setModal: (value: ModalProps) => void
}

export const PetTypeModal = ({ type, setNewData, setModal }: Props) => {

    const [change, setChange] = useState('')
    const [error, setError] = useState(false)
    const createType = useTypeCreate()
    const queryClient = useQueryClient()

    const handleSubmit = () => {
        
        const value = change

        if(value.length > 2 && setNewData){
            createType.mutate(value)
        }else{
            setError(true)
        }

    }

    useEffect(() => {
        if(createType.data?.status === 200 && createType.isSuccess === true){
            +setNewData!(change)
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }else{
            setError(true)
        }
    }, [createType.isSuccess])

    return(
        <>
            <Flex flexDirection="col" alignItems="end" className="gap-2 animate-fade-down p-2">
                <TextInput onChange={(e) => { 
                    setModal(resetModal) 
                    setChange(e.currentTarget.value)
                    setError(false)
                    }}
                    name="newType" 
                    placeholder="Perro" 
                    className="mx-auto"
                    icon={PencilIcon}
                    error={error}
                    errorMessage={createType.data?.message}
                />
                <Button onClick={handleSubmit} type="button" icon={type === 'create' ? PlusIcon : PencilIcon}>
                    Crear
                </Button>
            </Flex>
        </>
    )
}