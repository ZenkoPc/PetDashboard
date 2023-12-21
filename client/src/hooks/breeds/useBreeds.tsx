import { useQuery } from "@tanstack/react-query"
import { useUserStatus } from "../../store/useUserStatus"
import { getBreeds } from "../../api/requestBreeds"

export const useBreeds = () => {

    const token = useUserStatus(store => store.token)

    const data = useQuery({
        queryKey: ['breedsList'],
        queryFn: async () => await getBreeds(token)
    })

    return {
        breeds: data.data,
        fetch: data.isFetching,
        error: data.isError,
        refetch: data.refetch
    }

}