import { useMutation } from "@tanstack/react-query"
import { ModalProps } from "../../types/types"
import { createPetTypeMutation } from "../../api/requestPetTypes"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"

export const useTypeCreate = (modal: (data: ModalProps) => void) => {

    const { t } = useTranslation()

    const data = useMutation({
        mutationFn: createPetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('petTypesSuccessCreate'),
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