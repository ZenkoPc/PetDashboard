import { Title, Button, Flex, Text, Switch } from "@tremor/react"
import { useUserStatus } from "../store/useUserStatus"

export const Settings = () => {

    const toggleTheme = () => {
        document.body.classList.toggle('dark')
    }

    const close = useUserStatus(store => store.closeSesion)

    return (
        <main className="flex flex-col w-full h-screen justify-start items-start">
            <div className="py-5 w-full border-b px-5 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent font-bold text-lg">
                / Dashboard
            </div>
            <div className="px-5 w-full mt-5">
                <Title>
                    Settings
                </Title>
                <Text className="mb-5">
                    Personalize the dashboard as you wish.
                </Text>
                <Flex alignItems="start" className="border-t flex-col gap-5 py-5 w-full text-xl">
                    <Title>
                        Change Theme :
                    </Title>
                    <Flex justifyContent="start" className="gap-4">
                        <Switch onChange={toggleTheme} />
                        <Text>
                            Toggle Theme
                        </Text>
                    </Flex>
                </Flex>
                <Title>
                    Logout
                </Title>
                <Button color="red" onClick={close} variant="secondary" className="mt-4">
                    Close Session
                </Button>
            </div>
        </main>
    )
}