import { useMutation } from "@tanstack/react-query"
import { ModalProps } from "../../types/types"
import { createPetTypeMutation } from "../../api/requestPetTypes"
import { AxiosError } from "axios"

export const useTypeCreate = (modal: (data: ModalProps) => void) => {

    const data = useMutation({
        mutationFn: createPetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: 'Exito!',
                message: 'Tipo creado exitosamente',
                color: 'green'
            })
        },
        onError: (err: AxiosError) => {
            modal({
                status: true,
                method: 'Un error ha ocurrido!',
                message: err?.response?.data?.message,
                color: 'red'
            })
        }
    })

    return data
}