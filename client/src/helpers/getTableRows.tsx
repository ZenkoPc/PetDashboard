import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { TableRow, TableCell, Flex, Button } from "@tremor/react"
import { NoResultsData } from "../components/shared/noResultsData"
import { Origin } from "../types/enum"
import { PetType } from "../types/types"
import { useUserStatus } from "../store/useUserStatus"

interface Props{
    data: PetType[] | undefined
    origin: Origin
    headersLength: number
    editFn: (value: PetType) => void
    deleteFn: (id: string) => void
}

export const GetTableRows = ({ data, origin, headersLength, editFn, deleteFn }: Props) => {

    const role = useUserStatus(store => store.role)

    return (
        <>
            {
                +data!.length > 0
                ? origin === Origin.PetType
                    ? data?.map((ob) => (
                        <TableRow key={ob.id}>
                            <TableCell className="capitalize">
                                {ob?.name}
                            </TableCell>
                            {role !== 'viewer' && <TableCell>
                                <Flex className="gap-3" justifyContent={headersLength > 2 ? 'start' : 'end'}>
                                    <Button type="button" icon={PencilIcon} onClick={() => editFn({ id:ob.id, name:ob.name })} />
                                    <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(ob.id)} />
                                </Flex>
                            </TableCell>}
                        </TableRow>
                    ))
                    : ''
                : <TableRow>
                    <TableCell>
                        <NoResultsData />
                    </TableCell>
                </TableRow>
            }
        </>
    )
}