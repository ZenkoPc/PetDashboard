import { AtSymbolIcon, HomeModernIcon, PaperAirplaneIcon, PencilIcon, PhoneIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, Card, Col, Flex, Grid, Text, TextInput, Title } from "@tremor/react"
import { useState } from "react"
import { ModalProps } from "../../types/users"
import { BaseModal } from "../shared/modal"

interface Props{
    type: string
    close: (value: boolean) => void
    setData?: ({ name, contact }:{ name: string, contact: string}) => void
}

export const OwnersModal = ({ type, close, setData }: Props) => {

    const [modal, setModal] = useState<ModalProps>({
        status: false,
        method: '',
        message: '',
        color: 'red'
    })

    const reset = {
        status: false,
        method: '',
        message: '',
        color: 'red'
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = e.currentTarget.ownerName.value
        const contact1 = e.currentTarget.ownerContact1.value
        const contact2 = e.currentTarget.ownerContact2.value
        const email = e.currentTarget.ownerEmail.value
        const address = e.currentTarget.ownerAddress.value

        if(name && contact1 && contact2 && email && address && setData){
            setData({
                name: name.split(" ")[0],
                contact: contact1
            })
            close(true)
        }

        if(name && contact1 && contact2 && email && address){
            console.log(name, contact1, contact2, email, address)
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
                message: 'Complete los campos',
                color: 'red'
            })
        }

    }

    const handleClose = () => {
        setModal(reset)
    }

    return(
        <>
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={handleClose} />}
            <div className="bg-black/20 transition-all fixed top-0 left-0 w-full h-full flex justify-center items-center z-[30000]">
                <Card className="max-w-[450px] animate-fade-up">
                    <form onChange={() => setModal(reset)} onSubmit={handleSubmit}>
                        <Flex className="border-b pb-4">
                            <Title>
                                {
                                    type === 'create' ? 'Crear Nuevo'+" " : 'Editar'+" "
                                }
                                Dueño
                            </Title>
                            <Button type="button" variant="light" color="gray" icon={XMarkIcon} onClick={() => close(false)} />
                        </Flex>
                        <Flex className="mt-4 gap-3" flexDirection="col">
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Nombre Completo: *
                                </Text>
                                <TextInput icon={UserIcon} name="ownerName" className="max-w-max" />
                            </Flex>
                            <Flex>
                                <Grid numItems={1} numItemsMd={2} className="gap-3">
                                    <Col>
                                        <Flex flexDirection="col" alignItems="start">
                                            <Text>
                                                # de Contacto 1 *
                                            </Text>
                                            <TextInput icon={PhoneIcon} name="ownerContact1" />
                                        </Flex>
                                    </Col>
                                    <Col>
                                        <Flex flexDirection="col" alignItems="start">
                                            <Text>
                                                # de Contacto 2 *
                                            </Text>
                                            <TextInput icon={PhoneIcon} name="ownerContact2" />
                                        </Flex>
                                    </Col>
                                </Grid>
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Correo: *
                                </Text>
                                <TextInput icon={AtSymbolIcon} name="ownerEmail" className="max-w-max"/>
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Direccion: *
                                </Text>
                                <TextInput icon={HomeModernIcon} name="ownerAddress" className="max-w-[300px]" />
                            </Flex>
                        </Flex>
                        <Flex justifyContent="end" className="border-t mt-5 pt-4">
                            <Button type="submit" iconPosition="right" icon={type === 'create' ? PaperAirplaneIcon : PencilIcon}>
                                {
                                    type === 'create' ? 'Crear' : 'Editar'
                                }
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
        </>
    )
}