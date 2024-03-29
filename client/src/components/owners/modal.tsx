import { AtSymbolIcon, HomeModernIcon, PaperAirplaneIcon, PencilIcon, PhoneIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { Button, Card, Col, Flex, Grid, Text, TextInput, Title } from "@tremor/react"
import { useState } from "react"
import { ModalProps, Owner } from "../../types/types"
import { BaseModal } from "../shared/modal"
import { resetModal } from "../../helpers/resetData"
import { useTranslation } from "react-i18next"

interface Props{
    type: string
    close: () => void
    setData?: ({ name, contact }:{ name: string, contact: string}) => void
    create?: (value: Owner) => void
    edit?: (value: Owner) => void
    selected?: Owner
}

export const OwnersModal = ({ type, close, setData, create, edit, selected }: Props) => {

    const [modal, setModal] = useState<ModalProps>(resetModal)
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = e.currentTarget.ownerName.value
        const contact1 = e.currentTarget.ownerContact1.value
        const contact2 = e.currentTarget.ownerContact2.value
        const email = e.currentTarget.ownerEmail.value
        const address = e.currentTarget.ownerAddress.value

        if(name && contact1 && email && address && setData){
            setData({
                name: name.split(" ")[0],
                contact: contact1
            })
            close(true)
            return
        }

        if(name.length > 2 && contact1.length > 2 && email.length && address.length > 2 && type === 'create' && create){
            create({ id:'', name, email, address, contact1, contact2 })
            return
        }

        if(name.length > 2 && contact1.length > 2 && email.length && address.length > 2 && type === 'edit' && selected && edit){
            edit({ id: selected.id, name, email, address, contact1, contact2 })
            return
        }

        setModal({
            status: true,
            color: 'red',
            method: t('petTypesFailed'),
            message: t('completeInputs')
        })

    }

    const handleClose = () => {
        setModal(resetModal)
    }

    return(
        <>
            {modal.status && <BaseModal color={modal.color} method={modal.method} message={modal.message} close={handleClose} />}
            <div className="bg-black/20 transition-all fixed top-0 left-0 w-full h-full flex justify-center items-center z-[30000]">
                <Card className="max-w-[600px] h-[500px] animate-fade-up py-4">
                    <form className="h-full flex flex-col justify-between" onChange={() => setModal(resetModal)} onSubmit={handleSubmit}>
                        <Flex className="border-b pb-4">
                            <Title className="capitalize">
                                {
                                    type === 'create' ? t('ownersCreateModal') : t('ownersEditModal')
                                }
                            </Title>
                            <Button type="button" variant="light" color="gray" icon={XMarkIcon} onClick={close} />
                        </Flex>
                        <Flex className="mt-4 gap-3" flexDirection="col">
                            <Flex flexDirection="col" alignItems="start">
                                <Text className="capitalize">
                                    {t('ownersModalHeaders.0')}: *
                                </Text>
                                <TextInput defaultValue={selected ? selected.name : ''} placeholder="John Doe" icon={UserIcon} name="ownerName" className="max-w-max" />
                            </Flex>
                            <Flex>
                                <Grid numItems={1} numItemsMd={2} className="gap-3">
                                    <Col>
                                        <Flex flexDirection="col" alignItems="start">
                                            <Text className="capitalize">
                                                {t('ownersModalHeaders.1')} *
                                            </Text>
                                            <TextInput defaultValue={selected ? selected.contact1 : ''} placeholder="318455555" icon={PhoneIcon} name="ownerContact1" />
                                        </Flex>
                                    </Col>
                                    <Col>
                                        <Flex flexDirection="col" alignItems="start">
                                            <Text className="capitalize">
                                                {t('ownersModalHeaders.2')}
                                            </Text>
                                            <TextInput defaultValue={selected ? selected.contact2 : ''} placeholder="8965428" icon={PhoneIcon} name="ownerContact2" />
                                        </Flex>
                                    </Col>
                                </Grid>
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text className="capitalize">
                                    {t('ownersModalHeaders.3')} *
                                </Text>
                                <TextInput defaultValue={selected ? selected.email : ''} placeholder="john@gmail.com" icon={AtSymbolIcon} name="ownerEmail" className="max-w-max"/>
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text className="capitalize">
                                    {t('ownersModalHeaders.4')}: *
                                </Text>
                                <TextInput defaultValue={selected ? selected.address : ''} placeholder="Cr 12 #45z12" icon={HomeModernIcon} name="ownerAddress" className="max-w-[300px]" />
                            </Flex>
                        </Flex>
                        <Flex justifyContent="end" className="border-t mt-5 pt-4">
                            <Button className="capitalize" type="submit" iconPosition="right" icon={type === 'create' ? PaperAirplaneIcon : PencilIcon}>
                                {
                                    type === 'create' ? t('ownersCreateSendAction') : t('ownersEditSendAction')
                                }
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
        </>
    )
}