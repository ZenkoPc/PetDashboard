import { Select, SelectItem } from "@tremor/react"
import { PetType } from "../../types/types"

interface Props{
    data: PetType[] | undefined
    setLimit: (limit: number) => void
}

export const HeaderPagination = ({ data= [], setLimit }: Props) => {
    return(
        <>
            <Select disabled={data.length < 1} onValueChange={(e) => setLimit(parseInt(e))} defaultValue={'0'} className="max-w-max">
                <SelectItem value="5">Mostrar 5</SelectItem>
                {data?.length >= 10 && <SelectItem value="10">Mostrar 10</SelectItem>}
                {data?.length >= 15 && <SelectItem value="15">Mostrar 15</SelectItem>}
                {data?.length >= 25 && <SelectItem value="25">Mostrar 25</SelectItem>}
                {data?.length >= 50 &&<SelectItem value="50">Mostrar 50</SelectItem>}
                <SelectItem value="0">Mostrar Todos</SelectItem>
            </Select>
        </>
    )
}