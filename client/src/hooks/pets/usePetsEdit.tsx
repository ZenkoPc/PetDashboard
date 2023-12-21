import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { ModalProps } from "../../types/types"
import { editPetsMutation } from "../../api/requestPets"

export const usePetsEdit = (modal: (data: ModalProps) => void) => {
    
    const { t } = useTranslation()

    const data = useMutation({
        mutationFn: editPetsMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('petsEditSuccess'),
                color: 'green'
            })
        },
        onError: (err: AxiosError) => {
            modal({
                status: true,
                method: t('petTypesFailed'),
                message: err?.response?.data?.message,
                color: 'red'
            })
        }
    })

    return data
}