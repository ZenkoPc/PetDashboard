import { Button, Card, Col, Flex, Grid, Title, Text } from "@tremor/react"
import { NoTableData } from "../components/shared/noTableData"
import { useUserStatus } from "../store/useUserStatus"
import { Origin } from "../types/enum"
import { PetType } from "../types/types"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useTranslation } from "react-i18next"

interface Props{
    data: PetType[] | undefined
    origin: Origin
    editFn: (value: PetType) => void
    deleteFn: (id: string) => void
}

export const GetGridRows = ({ data = [], origin, editFn, deleteFn }: Props) => {

    const role = useUserStatus(store => store.role)
    const { t } = useTranslation()
    //data.sort((a,b) => b.name.localeCompare(a.name))
    return(
        <>
            {
                data.length > 0
                ? origin === Origin.PetType
                    ? <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={2} className="gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                            {
                                data?.map((data) => {
                                    return (
                                        <Col key={data.id}>
                                            <Card decoration="top" decorationColor="blue" className={`flex justify-between bg-tremor-background-muted dark:bg-dark-tremor-background-subtle`}>
                                                <Flex flexDirection="col" justifyContent="start" alignItems="start">
                                                    <Title className="text-tremor-default">
                                                        {t('petTypesTableHeaders.0')}:
                                                    </Title>
                                                    <Text className="capitalize">
                                                        {data.name}
                                                    </Text>
                                                </Flex>
                                                {role !== 'viewer' && <Flex className="gap-1 flex-row" alignItems="end" justifyContent="end">
                                                    <Button type="button" icon={PencilIcon} onClick={() => editFn({id: data.id, name: data.name})} />
                                                    <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(data.id)} />
                                                </Flex>}
                                            </Card>
                                        </Col>
                                    )
                                })
                            }
                        </Grid>
                    : 'asd'
                : <NoTableData />
            }
        </>
    )

}