import { useQuery } from "@tanstack/react-query"
import { petAdminPetsInfo } from "../../api/petadmin"
import { APIRes } from "../../types/users"
import { useUserStatus } from "../../store/useUserStatus"

const getPets = async (token: string) => {
    const { data } = await petAdminPetsInfo.get<APIRes>('/pet-type',{
        headers:{
            "x-auth-token": 'Bearer '+token
        }
    }).catch(err => err.response.data)

    return data
}

export const UsePetTypes = () => {

    const token = useUserStatus(store => store.token)

    const data = useQuery({
        queryKey: ['petTypeList'],
        queryFn: async () => await getPets(token)
    })

    return {
        pets: data.data,
        error: data.isError,
        fetch: data.isFetching,
        refetch: data.refetch
    }

}