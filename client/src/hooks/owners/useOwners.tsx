import { useQuery } from "@tanstack/react-query"
import { useUserStatus } from "../../store/useUserStatus"
import { getOwners } from "../../api/requestOwners"

export const useOwners = () => {

    const token = useUserStatus(store => store.token)

    const data = useQuery({
        queryKey: ['ownersList'],
        queryFn: async () => await getOwners(token)
    })

    return {
        owners: data.data,
        fetch: data.isFetching,
        error: data.isError,
        refetch: data.refetch
    }

}