import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslation } from "react-i18next"
import { ModalProps } from "../../types/types"
import { deleteOwnersMutation } from "../../api/requestOwners"

export const useOwnersDelete = (modal: (data: ModalProps) => void) => {

    const { t } = useTranslation()

    const deleteOwners = useMutation({
        mutationFn: deleteOwnersMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('ownersSuccessDelete'),
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

    return deleteOwners

}