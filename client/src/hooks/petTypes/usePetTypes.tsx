import { useQuery } from "@tanstack/react-query"
import { useUserStatus } from "../../store/useUserStatus"
import { getPetTypes } from "../../api/requestPetTypes"

export const usePetTypes = () => {

    const token = useUserStatus(store => store.token)

    const data = useQuery({
        queryKey: ['petTypeList'],
        queryFn: async () => await getPetTypes(token)
    })

    return {
        pets: data.data,
        error: data.isError,
        fetch: data.isFetching,
        refetch: data.refetch
    }

}