import { useMutation } from "@tanstack/react-query"
import { deletePetTypeMutation } from "../../api/requestPetTypes"
import { ModalProps } from "../../types/types"
import { AxiosError } from "axios"

export const useDeletePetType = (modal: (data: ModalProps) => void) => {

    const deletePet = useMutation({
        mutationFn: deletePetTypeMutation,
        onSuccess: () => {
            modal({
                status: true,
                method: 'Exito!',
                message: 'Tipo eliminado exitosamente',
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

    return deletePet
}