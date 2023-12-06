import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button, Flex, TextInput } from "@tremor/react"
import { useState } from "react"
import { ModalProps } from "../../types/users"

interface Props{
    type: string
    setNewData?: (value: string) => void
    setModal: (value: ModalProps) => void
}

export const PetTypeModal = ({ type, setNewData, setModal }: Props) => {

    const [change, setChange] = useState('')
    const reset = {
        status: false,
        message: '',
        method: '',
        color: 'red'
    }

    const handleSubmit = () => {
        
        const value = change

        value.length > 2 && setNewData
        ? +setNewData!(value)
        : setModal({
            status: true,
            message: 'Intenta mas tarde',
            method: 'Un error ha ocurrido!',
            color: 'red'
        })
    }

    return(
        <>
            <Flex flexDirection="col" alignItems="end" className="gap-2 animate-fade-down p-2">
                <TextInput onChange={(e) => { 
                    setModal(reset) 
                    setChange(e.currentTarget.value) 
                    }}
                    name="newType" 
                    placeholder="Perro" 
                    className="mx-auto"
                    icon={PencilIcon}
                />
                <Button onClick={handleSubmit} type="button" icon={type === 'create' ? PlusIcon : PencilIcon}>
                    {type === 'create' ? 'Crear' : 'Editar'}
                </Button>
            </Flex>
        </>
    )
}