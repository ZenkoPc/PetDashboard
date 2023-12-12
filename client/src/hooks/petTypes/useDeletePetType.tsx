import { useMutation } from "@tanstack/react-query"
import { petAdminPetsInfo } from "../../api/petadmin"

export const useDeletePetType = (token: string) => {

    const deletePet = useMutation({
        mutationFn: async (id: string) => {
            return await petAdminPetsInfo.delete('/pet-type/'+id,
                {
                    headers: {
                        "x-auth-token": 'Bearer '+token
                    }
                }).catch(err => err.response.data)
        }
    })

    return deletePet
}