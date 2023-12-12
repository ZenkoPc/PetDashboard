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
                    Configuracion
                </Title>
                <Text className="mb-5">
                    Personaliza el menu de la forma que desees.
                </Text>
                <Flex alignItems="start" className="border-t flex-col gap-5 py-5 w-full text-xl">
                    <Title>
                        Cambiar tema :
                    </Title>
                    <Flex justifyContent="start" className="gap-4">
                        <Switch onChange={toggleTheme} />
                        <Text>
                            Cambiar
                        </Text>
                    </Flex>
                </Flex>
            </div>
        </main>
    )
}