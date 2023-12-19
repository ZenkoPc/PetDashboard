import { useMutation } from "@tanstack/react-query"
import { editPetTypeMutation } from "../../api/requestPetTypes"
import { AxiosError } from "axios"
import { ModalProps } from "../../types/types"
import { useTranslation } from "react-i18next"


export const useEditPetType = (modal: (data: ModalProps) => void) => {

    const { t } = useTranslation()

    const data = useMutation({
        mutationFn: editPetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('petTypesSuccessEdit'),
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