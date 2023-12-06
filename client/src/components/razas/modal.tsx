import { BookOpenIcon, PaperAirplaneIcon, PencilIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ChevronRightIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Select, SelectItem, Text, TextInput, Textarea, Title } from "@tremor/react"
import { useState } from "react"
import { PetTypeModal } from "../petTypes/modal"
import { BaseModal } from "../shared/modal"
import { ModalProps } from "../../types/users"

interface Props{
    type: string
    close: (value: boolean) => void
    setData?: (raza: { name: string, types: string }) => void
}

export const RazaModal = ({ type, close, setData }: Props) => {
    
    const [petType, setPetType] = useState('') 
    const [filter, setFilter] = useState('')
    const [typeVisible, setTypeVisible] = useState(false)
    const [modal, setModal] = useState<ModalProps>({
        status: false,
        message: '',
        method: '',
        color: 'red'
    })

    const arr: string[] = ['asd','gatp','peror']
    const filteredArr = filter.length > 2
    ? arr.filter((value) => value.includes(filter))
    : arr

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

        if(name && types && desc && setData && type === 'create'){
            +setData!({ name, types })
            return
        }

        if(name && types && desc && type === 'create'){
            setModal({
                status: true,
                message: 'Funcionalidad Proximamente',
                method: 'A ocurrido un error!',
                color: 'red'
            })
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
        setModal({
            status: false,
            method: '',
            message: '',
            color: 'red'
        })
    }

    return (
        <>
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={handleModalClose} />}
            <div className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center z-[30000]">
                <Card className="max-w-[450px] animate-fade-up">
                    <form onChange={() => 
                        setModal({status: false,
                            message: '',
                            method: '',
                            color: 'red'
                        })} 
                        onSubmit={handleSubmit}
                    >
                        <Flex flexDirection="col" alignItems="start">
                            <Title className="flex w-full border-b pb-4 justify-between items-center">
                                {type === 'create' ? 'Crear nueva raza' : 'Editar raza'}
                                <Button type="button" onClick={() => close(false)} variant="light" color="gray" icon={XMarkIcon} />
                            </Title>
                        </Flex>
                        <Flex flexDirection="col" alignItems="start" className="mt-5">
                            <Text>
                                Nombre: *
                            </Text>
                            <TextInput icon={PencilIcon} name="razaName" className="max-w-max" />
                        </Flex>
                        <Flex className="mt-5">
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Tipo de mascota: *
                                </Text>
                                <Select  
                                    icon={BookOpenIcon}
                                    name='razaType' 
                                    defaultValue='' 
                                    value={petType} 
                                    onValueChange={(e) => {
                                        setTypeVisible(false) 
                                        setModal({status: false,
                                            message: '',
                                            method: '',
                                            color: ''})
                                        setPetType(e)
                                    }} 
                                    className={`max-w-[70%] xs:max-w-[50%] ${petType.length > 0 ? 'hidden' : 'block'}`}
                                >
                                    <TextInput onChange={(e) => handleChange(e)} className="rounded-b-none" icon={MagnifyingGlassIcon} name="typeSearch" placeholder="Perro" />
                                        {
                                            filteredArr.length > 0 
                                            ? filteredArr.map((value) => (
                                                <SelectItem key={value} icon={ChevronRightIcon} value={value}>
                                                    {value}
                                                </SelectItem>
                                            )) :
                                            <Text className="px-2 py-3 text-center">
                                                No hay tipos disponibles,
                                                Puedes crear un nuevo tipo dando clic
                                                al siguiente boton
                                            </Text>
                                        }
                                        <Flex justifyContent="end" className={`p-2 ${typeVisible ? 'hidden':'flex'}`}>
                                            <Button type="button" onClick={() => setTypeVisible(true)} variant="secondary">
                                                Crear nuevo
                                            </Button>
                                        </Flex>
                                        {typeVisible && <PetTypeModal type="create" setNewData={handleNewType} setModal={setModal} />}
                                    </Select>
                                </Flex>
                                <div className={`rounded-tremor-full py-1 px-4 ${petType.length > 0 ? 'block' : 'hidden'}`}>
                                    <Flex className="gap-2 px-3 py-2 rounded-tremor-full border-gray-400 border transition-all hover:bg-[] bg-[#F9FAFB]">
                                        <Text>
                                            {petType}
                                        </Text>
                                        <Button 
                                            type="button"
                                            onClick={() => setPetType('')}
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
                                Descripcion: *
                            </Text>
                            <Textarea name="razaDesc" />
                        </Flex>
                        <Flex className="mt-4 pt-3 border-t" justifyContent="end">
                            <Button type="submit" iconPosition="right" icon={PaperAirplaneIcon}>
                                {type === 'create' ? 'Crear' : 'Editar'}
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
        </>
    )
}