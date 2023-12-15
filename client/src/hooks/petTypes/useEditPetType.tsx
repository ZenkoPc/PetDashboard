import { useMutation } from "@tanstack/react-query"
import { editPetTypeMutation } from "../../api/requestPetTypes"
import { AxiosError } from "axios"
import { ModalProps } from "../../types/types"


export const useEditPetType = (modal: (data: ModalProps) => void) => {

    const data = useMutation({
        mutationFn: editPetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: 'Exito!',
                message: 'Tipo editado exitosamente',
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