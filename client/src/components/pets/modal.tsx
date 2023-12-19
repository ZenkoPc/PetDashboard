import { BookOpenIcon, ChevronRightIcon, MagnifyingGlassIcon, PaperAirplaneIcon, PencilIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { Button, Card, Flex, Select, SelectItem, Text, TextInput, Textarea, Title } from "@tremor/react"
import { useState } from "react"
import { ModalProps, Pet } from "../../types/types"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { RazaModal } from "../razas/modal"
import { BaseModal } from "../shared/modal"
import { OwnersModal } from "../owners/modal"
import { resetModal } from "../../helpers/resetData"
import { useTranslation } from "react-i18next"

interface Props{
    type: string
    data?: Pet
    closeModal: (value: boolean) => void
}

export const ModalPet = ({ type, closeModal }: Props) => {

    const [razaFilter, setRazaFilter] = useState('')
    const [ownerFilter, setOwnerFilter] = useState('')
    const [raza, setRaza] = useState('')
    const [dueno, setDueno] = useState('')
    const [ownerModal, setOwnerModal] = useState(false)
    const [razaModal, setRazaModal] = useState(false)
    const [modal, setModal] = useState<ModalProps>(resetModal)
    const { t } = useTranslation()

    const arr = ['Labrador','asda'].map((data) => data.toLowerCase())
    const arr2 = ['Jose','Alameda'].map((data) => data.toLowerCase())

    const filteredArrRaza = razaFilter.length > 2 
    ? arr.filter((value) => value.includes(razaFilter))
    : arr

    const filteredArrDueno = ownerFilter.length > 2 
    ? arr2.filter((value) => value.includes(ownerFilter))
    : arr2

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = e.currentTarget.petName.value
        const raza = e.currentTarget.petRaza.value
        const owner = e.currentTarget.petOwner.value
        const desc = e.currentTarget.petDesc.value

        if(name && raza && owner && desc){
            console.log(name, raza, owner, desc)
            setModal({
                status: true,
                method: 'Un error ha ocurrido!',
                message: 'Funcionalidad Proximamente',
                color: 'red'
            })
        }else{
            setModal({
                status: true,
                method: 'Un error ha ocurrido!',
                message: 'Intenta mas tarde',
                color: 'red'
            })
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const valorAct: string = e.currentTarget.value
        type === 'raza' 
        ? setRazaFilter(valorAct.toLowerCase())
        : setOwnerFilter(valorAct.toLowerCase())
    }

    const handleNewRaza = ({ name, types }: { name: string, types: string }) => {
        setRaza(name+"-"+types)
        setRazaModal(false)
    }

    const handleNewOwner =({ name, contact }:{ name:string, contact:string }) => {
        setDueno(name+"-"+contact)
    }

    const handleErrorClose = () => {
        setModal(resetModal)
    }

    const handleCloseOwner = () => {
        setOwnerModal(false)
    }

    return(
        <div className="fixed top-0 left-0 w-full h-full z-[20000] bg-black/80 flex justify-center items-center">
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={handleErrorClose} />}
            {ownerModal && <OwnersModal type="create" setData={handleNewOwner} close={handleCloseOwner} />}
            {razaModal && <RazaModal type="create" close={setRazaModal} setData={handleNewRaza} />}
            <Card className="max-w-[600px] h-[500px] animate-fade-up">
                <Title className="border-b pb-5 capitalize flex justify-between items-center">
                    {type === 'create' ? t('petsModalTitleCreate') : t('petsModalTitleEdit')}
                    <Button onClick={() => closeModal(false)} icon={XMarkIcon} variant="light" color="gray" />
                </Title>
                <form onChange={() => setModal(resetModal)} onSubmit={handleSubmit}>
                <Flex flexDirection="col" alignItems="start" className="mt-4">
                    <Text>
                        {t('petsModalName')}: *
                    </Text>
                    <TextInput placeholder="Orion" icon={PencilIcon} required className="max-w-max" name="petName" />
                </Flex>
                <Flex className="mt-5 flex-col" alignItems="start">
                    <Flex flexDirection="col" alignItems="start">
                        <Text>
                            {t('petsModalBreed')}: *
                        </Text>
                        <Select 
                            placeholder="Pug"
                            icon={BookOpenIcon}
                            name='petRaza' 
                            defaultValue='' 
                            value={raza} 
                            onValueChange={(e) => {
                                setModal(resetModal)
                                setRaza(e)
                            }} 
                            className={`max-w-[230px] ${raza.length > 0 ? 'hidden' : 'block'}`}
                        >
                            <TextInput onChange={(e) => handleChange(e, 'raza')} className="rounded-b-none" icon={MagnifyingGlassIcon} name="razaSearch" placeholder="Pug" />
                            {
                                filteredArrRaza.length > 0 
                                ? filteredArrRaza.map((value) => (
                                    <SelectItem key={value} value={value} icon={ChevronRightIcon} />
                                ))
                                : <Text className="px-2 py-3 text-center">
                                    {t('petsModalNoBreeds')}
                                </Text>
                            }
                            <Flex justifyContent="end" className="p-2">
                                <Button type="button" onClick={() => setRazaModal(true)} variant="secondary">
                                    {t('petsModalBreedsCreate')}
                                </Button>
                            </Flex>
                        </Select>
                    </Flex>
                    <div className={`rounded-tremor-full max-w-[250px] w-full py-1 pr-4 ${raza.length < 1 ? 'hidden' : 'flex'}`}>
                        <Flex className="gap-2 px-3 py-2 rounded-tremor-full border-gray-400 border transition-all hover:bg-[] bg-[#F9FAFB]">
                            <Text className="capitalize">
                                {raza}
                            </Text>
                            <Button 
                                type="button"
                                onClick={() => setRaza('')}
                                variant="light" 
                                color="gray" 
                                className="text-tremor-content-subtle" 
                                icon={XCircleIcon} 
                            />
                        </Flex>
                    </div>
                </Flex>
                <Flex className="mt-5 flex-col" alignItems="start">
                    <Flex flexDirection="col" alignItems="start" className="md:max-w-[50%]">
                        <Text>
                            {t('petsModalOwner')}: *
                        </Text>
                        <Select 
                            placeholder="John Doe - 888999"
                            icon={UserIcon}
                            name='petOwner' 
                            defaultValue='' 
                            value={dueno} 
                            onValueChange={(e) => {
                                setModal(resetModal)
                                setDueno(e)
                            }} 
                            className={`max-w-[230px] ${dueno.length > 0 ? 'hidden' : 'block'}`}
                        >
                            <TextInput onChange={(e) => handleChange(e, 'owner')} className="rounded-b-none" icon={MagnifyingGlassIcon} name="ownerSearch" placeholder="John doe - 112233" />
                            {
                                filteredArrDueno.length > 0 
                                ? filteredArrDueno.map((value) => (
                                    <SelectItem key={value} value={value} icon={ChevronRightIcon} />
                                ))
                                : <Text className="px-2 py-3 text-center">
                                    {t('petsModalNoOwners')}
                                </Text>
                            }
                            <Flex justifyContent="end" className="p-2">
                                <Button onClick={() => setOwnerModal(true)} type="button" variant="secondary">
                                    {t('petsModalOwnersCreate')}
                                </Button>
                            </Flex>
                        </Select>
                    </Flex>
                    <div className={`rounded-tremor-full max-w-[250px] w-full py-1 pr-4 ${dueno.length < 1 ? 'hidden' : 'block'}`}>
                        <Flex className="gap-2 px-3 py-2 w-full rounded-tremor-full border-gray-400 border transition-all hover:bg-[] bg-[#F9FAFB]">
                            <Text className="capitalize">
                                {dueno}
                            </Text>
                            <Button 
                                type="button"
                                onClick={() => setDueno('')}
                                variant="light" 
                                color="gray" 
                                className="text-tremor-content-subtle" 
                                icon={XCircleIcon} 
                            />
                        </Flex>
                    </div>
                </Flex>
                <Flex flexDirection="col" alignItems="start" className="mt-4">
                    <Text>
                        {t('petsModalDesc')}: *
                    </Text>
                    <Textarea placeholder="..." name="petDesc" />
                </Flex>
                <Flex justifyContent="end" className="pt-5 mt-5 border-t">
                    <Button className="capitalize" type="submit" iconPosition="right" icon={PaperAirplaneIcon}>
                        {type === 'create' ? t('petsModalActionCreate') : t('petsModalActionEdit')}
                    </Button>
                </Flex>
                </form>
            </Card>
        </div>
    )
}