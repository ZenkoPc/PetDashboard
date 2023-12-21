import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { ModalProps } from "../../types/types"
import { createOwnersMutation } from "../../api/requestOwners"

export const useOwnersCreate = (modal: (data: ModalProps) => void) => {
    
    const { t } = useTranslation()

    const data = useMutation({
        mutationFn: createOwnersMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('ownersSuccessCreate'),
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