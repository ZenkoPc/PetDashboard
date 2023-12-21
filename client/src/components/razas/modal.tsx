import { BookOpenIcon, PaperAirplaneIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Select, SelectItem, Text, TextInput, Textarea, Title } from "@tremor/react"
import { useState } from "react"
import { PetTypeModal } from "../petTypes/modal"
import { BaseModal } from "../shared/modal"
import { Breed, ModalProps, PetType } from "../../types/types"
import { usePetTypes } from "../../hooks/petTypes/usePetTypes"
import { resetModal } from "../../helpers/resetData"
import { useTranslation } from "react-i18next"

interface Props{
    type: string
    close: (value: boolean) => void
    setData?: (raza: { name: string, types: string }) => void
    selected?: Breed
    submitAction?: (value: Breed) => void
}

export const RazaModal = ({ type, close, setData, selected, submitAction }: Props) => {
    
    const [petType, setPetType] = useState('') 
    const [filter, setFilter] = useState('')
    const [typeVisible, setTypeVisible] = useState(false)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const { t } = useTranslation()

    const { pets, fetch, refetch }= usePetTypes()
    const petTypesData: PetType[] = pets?.data?.petTypes

    const filteredArr = filter.length > 2
    ? petTypesData.filter((value) => value?.name?.includes(filter))
    : petTypesData

    const handleNewType = (value: string) => {
        setPetType(value)
        setTypeVisible(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        const name = e.currentTarget.razaName.value
        const types = e.currentTarget.razaType.value
        const desc = e.currentTarget.razaDesc.value

        if(name.length > 2 && types.length > 2 && desc.length > 2 && setData && type === 'create'){
            +setData!({ name, types })
            return
        }

        if(name.length > 2 && types.length > 2 && desc.length > 2 && type === 'create' && submitAction){
            submitAction({ id: '', name, type: types, desc })
            return
        }

        if(name.length > 2 && types.length > 2 && desc.length > 2 && type === 'edit' && selected && submitAction){
            submitAction({ id: selected?.id, name, type: types, desc })
            return
        }

        setModal({
            status: true,
            message: 'Completa todos los campos',
            method: 'A ocurrido un error!',
            color: 'red'
        })

    }

    const handleModalClose = () => {
        setModal(resetModal)
    }

    return (
        <>
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={handleModalClose} />}
            <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-[30000]">
                <Card className="max-w-[600px] h-[500px] animate-fade-up">
                    <form onChange={() => 
                        setModal(resetModal)} 
                        onSubmit={handleSubmit}
                        className="flex flex-col justify-between h-full"
                    >
                        <Flex flexDirection="col" alignItems="start">
                            <Title className="flex w-full border-b pb-4 justify-between items-center">
                                {type === 'create' ? t('breedsModalTitleCreate') : t('breedsModalTitleEdit')}
                                <Button type="button" onClick={() => close(false)} variant="light" color="gray" icon={XMarkIcon} />
                            </Title>
                        </Flex>
                        <Flex flexDirection="col" alignItems="start" className="mt-5">
                            <Text className="capitalize">
                                {t('breedsModalName')}: *
                            </Text>
                            <TextInput defaultValue={selected ? selected.name : ''} placeholder="Pug" icon={PencilIcon} name="razaName" className="max-w-max" />
                        </Flex>
                        <Flex className="mt-5" flexDirection="col" alignItems="start">
                            <Flex flexDirection="col" alignItems="start">
                                <Text className="capitalize">
                                    {t('breedsModalType')}: *
                                </Text>
                                <Select  
                                    placeholder={t('breedsModalTypePlaceholder')}
                                    disabled={fetch}
                                    icon={BookOpenIcon}
                                    name='razaType' 
                                    defaultValue={selected ? selected.type : ''}
                                    value={petType} 
                                    onValueChange={(e) => {
                                        setTypeVisible(false) 
                                        setModal(resetModal)
                                        setPetType(e)
                                    }} 
                                    className={`max-w-[70%] xs:max-w-[50%] ${petType.length > 0 ? 'hidden' : 'block'}`}
                                >
                                    <TextInput onChange={(e) => handleChange(e)} className="rounded-b-none" icon={MagnifyingGlassIcon} name="typeSearch" placeholder={t('breedsModalTypePlaceholder')} />
                                        {
                                            filteredArr?.length > 0 
                                            ? filteredArr.map((value) => (
                                                <SelectItem className={`${typeVisible ? 'last-of-type:mb-24' : 'last-of-type:mb-14'}`} key={value.id} icon={ChevronRightIcon} value={value.name}>
                                                    {value.name}
                                                </SelectItem>
                                            )) :
                                            <Text className={`px-2 py-3 text-center ${typeVisible ? 'last-of-type:mb-24' : 'last-of-type:mb-14'}`}>
                                                {t('breedsModalNoTypes')}
                                            </Text>
                                        }
                                        <Flex justifyContent="end" className={`p-2 absolute bottom-1.5 left-0 bg-white rounded-b-tremor-default ${typeVisible ? 'hidden':'flex'}`}>
                                            <Button className="capitalize" type="button" onClick={() => setTypeVisible(true)} variant="secondary">
                                                {t('breedsModalCreateTypeAction')}
                                            </Button>
                                        </Flex>
                                        {typeVisible && <PetTypeModal type="create" setNewData={handleNewType} setModal={setModal} />}
                                    </Select>
                                </Flex>
                                <div className={`rounded-tremor-full max-w-[250px] w-full py-1 ${petType.length > 0 ? 'block' : 'hidden'}`}>
                                    <Flex className="gap-2 px-3 py-2 rounded-tremor-full border-gray-400 border transition-all hover:bg-[] bg-[#F9FAFB]">
                                        <Text className="capitalize">
                                            {petType}
                                        </Text>
                                        <Button 
                                            type="button"
                                            onClick={() => {
                                                setPetType('')
                                                refetch()
                                            }}
                                            variant="light" 
                                            color="gray" 
                                            className="text-tremor-content-subtle" 
                                            icon={XCircleIcon} 
                                        />
                                    </Flex>
                                </div>
                            </Flex>
                        <Flex flexDirection="col" alignItems="start" className="mt-4">
                            <Text className="capitalize">
                                {t('breedsModalDesc')}: *
                            </Text>
                            <Textarea defaultValue={selected ? selected.desc : ''} placeholder="..." name="razaDesc" />
                        </Flex>
                        <Flex className="mt-4 pt-3 border-t" justifyContent="end">
                            <Button className="capitalize" type="submit" iconPosition="right" icon={PaperAirplaneIcon}>
                                {type === 'create' ? t('breedsModalActionCreate') : t('breedsModalActionEdit')}
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
        </>
    )
}