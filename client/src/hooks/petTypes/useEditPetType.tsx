import { useMutation } from "@tanstack/react-query"
import { useUserStatus } from "../../store/useUserStatus"
import { petAdminPetsInfo } from "../../api/petadmin"

interface Props{
    id: string
    name: string
}

export const useEditPetType = () => {
    const token = useUserStatus(store => store.token)

    const data = useMutation({
        mutationFn: async ({ id, name }: Props) => {
            return await petAdminPetsInfo.put(`/pet-type/${encodeURIComponent(id)}`,{
                name: name
            },{
                headers: {
                    "x-auth-token": "Bearer "+token
                }
            }).catch(err => err.response.data)
        }
    })

    return data

}