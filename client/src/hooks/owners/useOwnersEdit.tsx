import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { ModalProps } from "../../types/types"
import { editOwnersMutation } from "../../api/requestOwners"

export const useOwnersEdit = (modal: (data: ModalProps) => void) => {

    const { t } = useTranslation()

    const data = useMutation({
        mutationFn: editOwnersMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('ownersSuccessEdit'),
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