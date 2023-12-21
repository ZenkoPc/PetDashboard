import { useQuery } from "@tanstack/react-query"
import { getPets } from "../../api/requestPets"
import { useUserStatus } from "../../store/useUserStatus"

export const usePets = () => {

    const token = useUserStatus(store => store.token)

    const data = useQuery({
        queryKey: ['petsList'],
        queryFn: async () => await getPets(token)
    })

    return {
        pets: data.data,
        fetch: data.isFetching,
        error: data.isError,
        refetch: data.refetch
    }

}