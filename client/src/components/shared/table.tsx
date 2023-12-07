import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { Card, Flex, Table, TableBody, TableHead, TableHeaderCell, TableRow, Text, TextInput } from "@tremor/react"
import { useUserStatus } from "../../store/useUserStatus"

interface Props{
    tableHeaders: string[]
    data: string[]
}

export const TableShared = ({ tableHeaders, data }: Props) => {

    const role = useUserStatus(store => store.role)
    
    return (
        <div>
            <Flex className="mt-7" justifyContent="end">
                <TextInput icon={MagnifyingGlassIcon} name="search" className="max-w-max" />
            </Flex>
            <Card className="mt-5">
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeaders.map((header) => (
                                    <TableHeaderCell>
                                        {header}
                                    </TableHeaderCell>
                                ))
                            }
                            {role !== 'viewer' && <TableHeaderCell>Acciones</TableHeaderCell>}
                        </TableRow>
                    </TableHead>
                    {
                        data.length > 0 
                        ? (
                            <TableBody>
                            </TableBody>
                        ) : (
                            <>
                                <div className="h-[300px] relative flex justify-center items-center">
                                </div>
                                <div className="absolute top-0 left-0 w-full h-full flex justify-center flex-col gap-2 items-center">
                                    <img src={'/nodata.svg'}  width={80} alt="no data icon" />
                                    <Text className="text-[16px]">
                                        No hay informacion para mostrar
                                    </Text>
                                </div>
                            </>
                        )
                    }
                </Table>
            </Card>
        </div>
    )
}