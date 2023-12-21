import { useMutation } from "@tanstack/react-query"
import { editBreedsMutation } from "../../api/requestBreeds"
import { ModalProps } from "../../types/types"
import { AxiosError } from "axios"
import { t } from "i18next"

export const useBreedEdit = (modal: (data: ModalProps) => void) => {

    const data = useMutation({
        mutationFn: editBreedsMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('breedsSuccessEdit'),
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