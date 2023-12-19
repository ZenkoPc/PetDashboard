import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline"
import { Button, Flex, TextInput } from "@tremor/react"
import { useEffect, useState } from "react"
import { ModalProps } from "../../types/types"
import { resetModal } from "../../helpers/resetData"
import { useTypeCreate } from "../../hooks/petTypes/useTypeCreate"
import { useQueryClient } from "@tanstack/react-query"
import { useUserStatus } from "../../store/useUserStatus"
import { useTranslation } from "react-i18next"

interface Props{
    type: string
    setNewData?: (value: string) => void
    setModal: (value: ModalProps) => void
}

export const PetTypeModal = ({ type, setNewData, setModal }: Props) => {

    const token = useUserStatus(store => store.token)
    const { t } = useTranslation()

    const [change, setChange] = useState('')
    const [error, setError] = useState(false)
    const createType = useTypeCreate(setModal)
    const queryClient = useQueryClient()

    const handleSubmit = () => {
        
        const value = change

        if(value.length > 2 && setNewData){
            createType.mutate({ name: value, token })
        }else{
            setError(true)
        }

    }

    useEffect(() => {
        if(createType.isSuccess){
            +setNewData!(change)
            queryClient.invalidateQueries({ queryKey: ['petTypeList'] })
        }
    }, [change, createType.isSuccess, queryClient, setNewData])
    
    return(
        <>
            <Flex flexDirection="col" alignItems="end" className="gap-2 absolute bottom-1.5 left-0 bg-white p-2">
                <TextInput onChange={(e) => { 
                        setModal(resetModal) 
                        setChange(e.currentTarget.value)
                        setError(false)
                    }}
                    name="newType" 
                    placeholder={t('petTypesPlaceholder')} 
                    className="mx-auto"
                    icon={PencilIcon}
                    error={error===true}
                    errorMessage={createType.data?.message}
                />
                <Button onClick={handleSubmit} type="button" icon={type === 'create' ? PlusIcon : PencilIcon}>
                    {t('petTypesCreateAction')}
                </Button>
            </Flex>
        </>
    )
}