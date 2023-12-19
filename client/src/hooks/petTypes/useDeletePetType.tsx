import { useMutation } from "@tanstack/react-query"
import { deletePetTypeMutation } from "../../api/requestPetTypes"
import { ModalProps } from "../../types/types"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"

export const useDeletePetType = (modal: (data: ModalProps) => void) => {

    const { t } = useTranslation()

    const deletePet = useMutation({
        mutationFn: deletePetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('petTypesSuccessDelete'),
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

    return deletePet
}