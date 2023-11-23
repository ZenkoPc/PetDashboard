import { useQuery } from "@tanstack/react-query"
import { Props } from "../store/useUserStatus"
import { petAdmin } from "../api/petadmin"

const verify = async (token: string) => {
    const data = await petAdmin.post('/verify',{
        token
    }).catch(err => err.response )
    return data
}

export const useVerify = (store: Props) => {

    const verifyQuery = useQuery({
        queryKey: ['verify'],
        queryFn: async () => await verify(store.token),
        retry: false
    })

    return verifyQuery

}