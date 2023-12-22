import { Button, Card, Col, Flex, Grid, Title, Text } from "@tremor/react"
import { NoTableData } from "../components/shared/noTableData"
import { useUserStatus } from "../store/useUserStatus"
import { Origin } from "../types/enum"
import { Breed, Owner, Pet, PetType } from "../types/types"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid"
import { useTranslation } from "react-i18next"

interface Props{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any[] | undefined
    origin: Origin
    editFn: (value: PetType | Pet | Owner | Breed) => void
    deleteFn: (id: string) => void
}

export const GetGridRows = ({ data = [], origin, editFn, deleteFn }: Props) => {

    const role = useUserStatus(store => store.role)
    const { t } = useTranslation()
    //data.sort((a,b) => b.name.localeCompare(a.name))
    
    if(data.length < 1){
        return(
            <NoTableData />
        )
    }

    if(origin === Origin.PetType){
        return(
            <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={2} className="gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    data?.map((data: PetType) => {
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
                                        <Button type="button" icon={PencilIcon} onClick={() => editFn(data)} />
                                        <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(data.id)} />
                                    </Flex>}
                                </Card>
                            </Col>
                        )
                    })
                }
            </Grid>
        )
    }

    if(origin === Origin.Pet){
        return(
            <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={2} className="gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    data?.map((data: Pet) => {
                    return (
                        <Col key={data.id}>
                            <Card decoration="top" decorationColor="blue" className={`flex flex-col h-full gap-2 justify-between bg-tremor-background-muted dark:bg-dark-tremor-background-subtle`}>
                                <Flex justifyContent="between" alignItems="start" className={`gap-3 flex-col`}>
                                    <Flex flexDirection="col" className="gap-2">
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('petsTableHeaders.0')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.name}
                                            </Text>
                                        </Flex>
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('petsTableHeaders.1')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.raza}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection="col" alignItems="start" className="gap-1">
                                        <Title className="text-tremor-default capitalize">
                                            {t('petsTableHeaders.2')}:
                                        </Title>
                                        <Text className="capitalize">
                                            {data.owner}
                                        </Text>
                                    </Flex>
                                </Flex>
                                    {role !== 'viewer' && <Flex className="gap-1 flex-row" alignItems="end" justifyContent="end">
                                        <Button type="button" icon={PencilIcon} onClick={() => editFn(data)} />
                                        <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(data.id)} />
                                </Flex>}
                            </Card>
                        </Col>
                        )
                    })
                }
            </Grid>
        )
    }

    if(origin === Origin.Breed){
        return(
            <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={2} className="gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    data?.map((data: Breed) => {
                    return (
                        <Col key={data.id}>
                            <Card decoration="top" decorationColor="blue" className={`flex flex-col h-full gap-2 justify-between bg-tremor-background-muted dark:bg-dark-tremor-background-subtle`}>
                                <Flex justifyContent="between" alignItems="start" className={`gap-3 flex-col`}>
                                    <Flex flexDirection="col" className="gap-2">
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('breedsTableHeaders.0')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.name}
                                            </Text>
                                        </Flex>
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('breedsTableHeaders.1')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.type}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection="col" alignItems="start" className="gap-1">
                                        <Title className="text-tremor-default capitalize">
                                            {t('breedsTableHeaders.2')}:
                                        </Title>
                                        <Text className="capitalize">
                                            {data.desc.slice(0,40)}...
                                        </Text>
                                    </Flex>
                                </Flex>
                                    {role !== 'viewer' && <Flex className="gap-1 flex-row" alignItems="end" justifyContent="end">
                                        <Button type="button" icon={PencilIcon} onClick={() => editFn(data)} />
                                        <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(data.id)} />
                                </Flex>}
                            </Card>
                        </Col>
                        )
                    })
                }
            </Grid>
        )
    }

    if(origin === Origin.Owner){
        return(
            <Grid numItems={1} numItemsSm={2} numItemsMd={2} numItemsLg={2} className="gap-5 xl:grid-cols-3 2xl:grid-cols-4">
                {
                    data?.map((data: Owner) => {
                    return (
                        <Col key={data.id}>
                            <Card decoration="top" decorationColor="blue" className={`flex flex-col h-full gap-2 justify-between bg-tremor-background-muted dark:bg-dark-tremor-background-subtle`}>
                                <Flex justifyContent="between" alignItems="start" className={`gap-3 flex-col`}>
                                    <Flex flexDirection="col" className="gap-2">
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('ownersTableHeaders.0')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.name}
                                            </Text>
                                        </Flex>
                                        <Flex alignItems="start" flexDirection="col" className="gap-1">
                                            <Title className="text-tremor-default capitalize">
                                                {t('ownersTableHeaders.1')}:
                                            </Title>
                                            <Text className="capitalize">
                                                {data.email}
                                            </Text>
                                        </Flex>
                                    </Flex>
                                    <Flex flexDirection="col" alignItems="start" className="gap-1">
                                        <Title className="text-tremor-default capitalize">
                                            {t('ownersTableHeaders.3')}:
                                        </Title>
                                        <Text className="capitalize">
                                            {data.contact1}
                                        </Text>
                                    </Flex>
                                </Flex>
                                    {role !== 'viewer' && <Flex className="gap-1 flex-row" alignItems="end" justifyContent="end">
                                        <Button type="button" icon={PencilIcon} onClick={() => editFn(data)} />
                                        <Button type="button" icon={TrashIcon} color="red" onClick={() => deleteFn(data.id)} />
                                </Flex>}
                            </Card>
                        </Col>
                        )
                    })
                }
            </Grid>
        )
    }

}