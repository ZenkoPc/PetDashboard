import { useMutation } from "@tanstack/react-query"
import { petAdminPetsInfo } from "../../api/petadmin"
import { useUserStatus } from "../../store/useUserStatus"

export const useDeletePetType = () => {

    const token = useUserStatus(store => store.token)

    const deletePet = useMutation({
        mutationFn: async (id: string) => {
            return await petAdminPetsInfo.delete('/pet-type/'+id,
                {
                    headers: {
                        "x-auth-token": `Bearer ${encodeURIComponent(token)}`
                    }
                }).catch(err => err.response.data)
        }
    })

    return deletePet
}