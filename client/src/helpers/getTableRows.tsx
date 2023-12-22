import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { TableRow, TableCell, Flex, Button } from "@tremor/react"
import { NoResultsData } from "../components/shared/noResultsData"
import { Origin } from "../types/enum"
import { Breed, Owner, Pet, PetType } from "../types/types"
import { useUserStatus } from "../store/useUserStatus"

interface Props{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[] | undefined,
    origin: Origin
    headersLength: number
    editFn: (value: PetType | Pet | Breed | Owner) => void
    deleteFn: (id: string) => void
}

export const GetTableRows = ({ data, origin, headersLength, editFn, deleteFn }: Props) => {
    
    const role = useUserStatus(store => store.role)

    if(+data!.length < 1){
        return (
            <>
                <TableRow>
                    <TableCell>
                        <NoResultsData />
                    </TableCell>
                </TableRow>
            </>
        )
    }
    
    if(origin === Origin.PetType){
        return (
            <>
                {data?.map((ob: PetType) => (
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
                ))}
            </>
        )
    }

    if(origin === Origin.Pet){
        return (
            <>
                {data?.map((pet: Pet) => (
                    <TableRow key={pet.id}>
                        <TableCell>
                            {pet.name}
                        </TableCell>
                        <TableCell>
                            {pet.raza}
                        </TableCell>
                        <TableCell>
                            {pet.owner}
                        </TableCell>
                        {role !== 'viewer' && <TableCell>
                            <Flex className="gap-3" justifyContent={headersLength > 2 ? 'start' : 'end'}>
                                <Button type="button" icon={PencilIcon} onClick={() => editFn(pet)} />
                                <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(pet.id)} />
                            </Flex>
                        </TableCell>}
                    </TableRow>
                ))}
            </>
        )
    }

    if(origin === Origin.Breed){
        
        return (
            <>
                {data?.map((breed: Breed) => (
                    <TableRow key={breed.id}>
                        <TableCell>
                            {breed.name}
                        </TableCell>
                        <TableCell>
                            {breed.type}
                        </TableCell>
                        <TableCell>
                            {breed.desc}
                        </TableCell>
                        {role !== 'viewer' && <TableCell>
                            <Flex className="gap-3" justifyContent={headersLength > 2 ? 'start' : 'end'}>
                                <Button type="button" icon={PencilIcon} onClick={() => editFn(breed)} />
                                <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(breed.id)} />
                            </Flex>
                        </TableCell>}
                    </TableRow>
                ))}
            </>
        )
    }

    if(origin === Origin.Owner){
        return (
            <>
                {data?.map((owner: Owner) => (
                    <TableRow key={owner.id}>
                        <TableCell>
                            {owner.name}
                        </TableCell>
                        <TableCell>
                            {owner.email}
                        </TableCell>
                        <TableCell>
                            {owner.address}
                        </TableCell>
                        <TableCell>
                            {owner.contact1}
                        </TableCell>
                        {role !== 'viewer' && <TableCell>
                            <Flex className="gap-3" justifyContent={headersLength > 2 ? 'start' : 'end'}>
                                <Button type="button" icon={PencilIcon} onClick={() => editFn(owner)} />
                                <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(owner.id)} />
                            </Flex>
                        </TableCell>}
                    </TableRow>
                ))}
            </>
        )
    }

}