import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { APIRes } from "../types/users"
import { randomUser } from "../api/randomuser"
import { useEffect, useState } from "react"

interface Props {
    page: number
    filters: string
}

const randomUsers = async ({ page, filters }: Props):Promise<APIRes> => {
    const params = new URLSearchParams()

    if(filters.length > 0){
        params.append('gender',filters)
    }

    params.append('page', page.toString())
    params.append('results','6')
    params.append('seed','asd')

    const { data } = await randomUser.get('/',{ params })
    return data
}

export const useUsers = ({ filters }: { filters: string }) => {

    const [page, setPage] = useState<number>(1)

    useEffect(() => {
        setPage(1)
    }, [filters])

    const usersQuery = useQuery({
        queryKey: ['users',{ page, filters }],
        queryFn: () => randomUsers({ page, filters }),
        staleTime: 60 * 10 * 10,
        placeholderData: keepPreviousData
    })

    const prevPage = () => {
        setPage(page - 1)
    }

    const nextPage = () => {
        setPage(page + 1)
    }
    
    return {
        users: usersQuery,
        page,
        prevPage,
        nextPage
    }
}