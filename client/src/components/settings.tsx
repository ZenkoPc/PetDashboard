import { Title, Flex, Text, Switch } from "@tremor/react"
import { LogoDashboard } from "./logoDashboard"

export const Settings = () => {

    const toggleTheme = () => {
        document.body.classList.toggle('dark')
    }

    return (
        <main className="flex flex-col w-full h-screen justify-start items-start">
            <LogoDashboard />
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
            </div>
        </main>
    )
}