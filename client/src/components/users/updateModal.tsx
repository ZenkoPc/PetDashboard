import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { Title, Text, Flex, SelectItem, Card, Button, TextInput, Select } from "@tremor/react"
import { User } from "../../types/types"
import { useTranslation } from "react-i18next"

interface Props {
    close: () => void,
    user: User,
    handleUpdate: (user: User) => void,
    error: string
}

export const UpdateModal = ({ close, user, handleUpdate, error }: Props) => {

    const id = user.id
    const { t } = useTranslation()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const newUserData = {
            id: id,
            name: e.currentTarget.named.value,
            lastname: e.currentTarget.lastname.value,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
            role: e.currentTarget.roles.value
        }

        handleUpdate(newUserData)

        e.currentTarget.reset()

    }

    return (
        <>
            <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-[30005] bg-black/80">
                <Card className="max-w-[500px] text-center relative">
                    <div className="absolute top-5 right-5 z-[20006]">
                        <Button onClick={close} color="neutral" variant="light" icon={XMarkIcon} className="p-0">
                        </Button>
                    </div>
                    <Title className="text-xl capitalize">
                        {t('usersEdit')}
                    </Title>
                    <form onSubmit={handleSubmit}>
                        <Flex className="gap-7" flexDirection="col">
                            <Flex className="mt-5 w-full gap-4 flex-col md:flex-row">
                                <Flex flexDirection="col" alignItems="start">
                                    <Text className="capitalize">
                                        {t('usersEditHeaders.0')}:
                                    </Text>
                                    <TextInput defaultValue={user?.name} name="named" required={true} type="text" placeholder="John" />
                                </Flex>
                                <Flex flexDirection="col" alignItems="start">
                                    <Text className="capitalize">
                                        {t('usersEditHeaders.1')}:
                                    </Text>
                                    <TextInput defaultValue={user?.lastname} name="lastname" required={true} type="text" placeholder="Doe" />
                                </Flex>
                            </Flex>
                            <Flex className="w-full gap-4 flex-col md:flex-row">
                                <Flex flexDirection="col" alignItems="start">
                                    <Text className="capitalize">
                                        {t('usersEditHeaders.2')}:
                                    </Text>
                                    <TextInput defaultValue={user?.email} name="email" type="email" placeholder="JohnDoe@gmail.com" />
                                </Flex>
                                <Flex flexDirection="col" alignItems="start">
                                    <Text className="capitalize">
                                        {t('usersEditHeaders.3')}:
                                    </Text>
                                    <TextInput defaultValue={user?.password} name="password" type="password" placeholder="***********" />
                                </Flex>
                            </Flex>
                            <div className="text-left w-full">
                                <Text className="capitalize">
                                    {t('usersEditHeaders.4')}:
                                </Text>
                                <Select name='roles' defaultValue={user?.role}>
                                    <SelectItem value={"editor"}>
                                        Editor
                                    </SelectItem>
                                    <SelectItem value={"viewer"}>
                                        Viewer
                                    </SelectItem>
                                </Select>
                            </div>
                        </Flex>
                        <Text color="red" className="mt-5">
                            {error}
                        </Text>
                        <Button type="submit" variant="primary" className="mt-8" iconPosition="right" icon={PaperAirplaneIcon}>
                            {t('usersAction')}
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    )
}