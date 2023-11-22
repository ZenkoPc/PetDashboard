import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"
import { Card, Title, Flex, Button, Metric, TextInput, Text } from "@tremor/react"
import { useState } from "react"
import { fetchLogin } from "../hooks/fetchLogin"
import { useUserStatus } from "../store/useUserStatus"

export const Login = () => {

    const [error, setError] = useState('')
    const setSession = useUserStatus(store => store.setSession)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username.value.toString()
        const password = e.currentTarget.password.value.toString()

        const data = await fetchLogin(username, password)
        
        switch (data.status){
            case 'auth:login:invalid' : {
                setError(data?.message)
                return
            }
            case 'validation:bad-request': {
                setError(data?.errors[0])
                return
            }
            case 'global:server-error': {
                setError(data?.message)
                return
            }
            case 200: {
                setSession(data?.data?.data?.session?.token?.value, data?.data?.data?.user?.role)
                return
            }
        }

    }

    return (
        <main className="flex flex-col items-center justify-center w-full h-screen">
            <Metric className="mb-5 text-6xl hidden md:block">
                Login
            </Metric>
            <Card className="flex flex-col justify-center items-center md:h-[400px] w-[450px]">
                <Title className="text-4xl mb-10 md:hidden">Login</Title>
                <form onSubmit={handleSubmit} className="w-full h-full px-5 flex flex-col justify-between">
                    <Flex className="gap-2 mt-10 flex-col items-start">
                        <Title className="text-2xl mb-2">
                            Email:
                        </Title>
                        <TextInput
                        onChange={() => setError('')}
                            name="username" icon={UserIcon} 
                            placeholder="JohnDoe123" 
                        />
                        <Title className="mt-3 text-2xl mb-2">
                            Password:
                        </Title>
                        <TextInput 
                        onChange={() => setError('')}
                            name="password" icon={LockClosedIcon} 
                            type="password" 
                            placeholder="*****" 
                        />
                        <Text color="red" className="capitalize mt-5">
                            {error}
                        </Text>
                    </Flex>
                    <Flex justifyContent="end" className="border-t w-full space-x-2 pt-4">
                        <Button type="submit">
                            Iniciar Sesion
                        </Button>
                    </Flex>
                </form>
            </Card>
        </main>
    )
}