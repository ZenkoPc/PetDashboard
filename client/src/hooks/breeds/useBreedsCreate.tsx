import { useMutation } from "@tanstack/react-query"
import { createBreedsMutation } from "../../api/requestBreeds"
import { ModalProps } from "../../types/types"
import { AxiosError } from "axios"
import { t } from "i18next"

export const useBreedCreate = (modal: (data: ModalProps) => void) => {

    const data = useMutation({
        mutationFn: createBreedsMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: t('petTypesSuccess'),
                message: t('breedsSuccessCreate'),
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