import { useQuery } from "@tanstack/react-query"
import { petAdmin } from "../../api/petadmin"
import { useUserStatus } from "../../store/useUserStatus"
import { APIRes } from "../../types/types"

const randomUsers = async ({ token }:{ token: string }) => {

    const { data } = await petAdmin.get<APIRes>('/users',{
        headers: {
            "x-auth-token": "Bearer "+token
        }
    }).catch(err => err.response.data)

    return data
}

export const useUsers = () => {

    const token = useUserStatus(store => store.token)
    
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: () => randomUsers({ token }),
        staleTime: 6000
    })

    return usersQuery
}