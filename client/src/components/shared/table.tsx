import { MagnifyingGlassIcon, TableCellsIcon, ViewColumnsIcon, } from "@heroicons/react/24/outline"
import { Button, Card, Flex, Icon, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, TextInput} from "@tremor/react"
import { useUserStatus } from "../../store/useUserStatus"
import { useState } from "react"
import { PetType, TableProps } from "../../types/types"
import { LoadingTable } from "../users/loadingTable"
import { NoTableData } from "./noTableData"
import { HeaderPagination } from "./headerPagination"
import { GetTableRows } from "../../helpers/getTableRows"
import { useTranslation } from "react-i18next"
import { GetGridRows } from "../../helpers/getGridRows"

export const TableShared = ({ tableHeaders, data, fetching, error, editFn, deleteFn, origin }: TableProps) => {

    const { role } = useUserStatus()
    const [filter, setFilter] = useState<string>('')
    const [limit, setLimit] = useState<number>(5)
    const { t } = useTranslation()
    const [vista, setVista] = useState<boolean>(false)
   
    const finalData = filter.length > 2
        ? data?.filter((data: PetType) => data?.name?.includes(filter.toLowerCase()))
        : data
    
    const filteredData = finalData?.slice(0,limit)
    
    if(data?.length === undefined || error) return <NoTableData />

    return (
        <>
            <div>
                <Flex className="mt-7 flex-col items-end md:items-center md:flex-row gap-3" justifyContent="end">
                    <Button disabled={data.length < 1} onClick={() => setVista(!vista)} className="flex justify-center items-center" color="gray" type="button" variant="light">
                        <Icon color="gray" size="xl" icon={vista ? TableCellsIcon : ViewColumnsIcon} />
                    </Button>
                    <Flex className="gap-2 max-w-max flex-col xs:flex-row items-end justify-end">
                        <HeaderPagination setLimit={setLimit} data={data} />
                        <TextInput placeholder="..." disabled={+finalData!.length < 1 && filter.length === 0} onChange={(e) => setFilter(e.currentTarget.value)} icon={MagnifyingGlassIcon} name="search" className="max-w-max" />
                    </Flex>
                </Flex>
                <Card className="mt-5">
                    {fetching && <LoadingTable />}
                    {!fetching && !vista && <Table>
                        <TableHead>
                            <TableRow>
                                {
                                    tableHeaders.map((header) => (
                                        <TableHeaderCell className="capitalize" key={header}>
                                            {header}
                                        </TableHeaderCell>
                                    ))
                                }
                                {role !== 'viewer' && <TableHeaderCell className={tableHeaders.length > 2 ?  '' : 'text-end' }>{t('ownersActions')}</TableHeaderCell>}
                            </TableRow>
                        </TableHead>
                        {
                            data?.length !== undefined && data.length > 0
                            ? <TableBody>
                                <GetTableRows
                                    data={filteredData}
                                    origin={origin}
                                    headersLength={tableHeaders.length}
                                    editFn={editFn}
                                    deleteFn={deleteFn}
                                />
                            </TableBody>
                            : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <NoTableData />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )
                        }
                    </Table>}
                    {!fetching && vista && 
                        <>
                            {
                                filteredData?.length !== undefined && filteredData?.length > 0
                                ?  <GetGridRows 
                                        data={filteredData} 
                                        origin={origin} 
                                        editFn={editFn} 
                                        deleteFn={deleteFn} />
                                : <NoTableData />
                            }
                        </>
                    }
                </Card>
            </div>
        </>
    )
}