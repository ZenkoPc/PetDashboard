import { useMutation } from "@tanstack/react-query"
import { deleteBreedsMutation } from "../../api/requestBreeds"
import { ModalProps } from "../../types/types"
import { AxiosError } from "axios"
import { t } from "i18next"

export const useBreedRemove = (modal: (data: ModalProps) => void) => {

    const data = useMutation({
        mutationFn: deleteBreedsMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('breedsSuccessDelete'),
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