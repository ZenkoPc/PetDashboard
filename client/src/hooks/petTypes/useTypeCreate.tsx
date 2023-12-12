import { useMutation } from "@tanstack/react-query"
import { petAdminPetsInfo } from "../../api/petadmin"
import { useUserStatus } from "../../store/useUserStatus"

export const useTypeCreate = () => {

    const token = useUserStatus(store => store.token)

    const data = useMutation({
        mutationFn: async (name: string) => {
            return await petAdminPetsInfo.post('/pet-type',{
                name
            },{
                headers: {
                    "x-auth-token": 'Bearer '+token
                }
            }).catch(err => err.response.data)
        }
    })

    return data
}