import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"
import { Card, Title, Flex, Button, Metric, TextInput, Text } from "@tremor/react"
import { useState } from "react"
import { fetchLogin } from "../hooks/login/fetchLogin"
import { useUserStatus } from "../store/useUserStatus"
import { useTranslation } from "react-i18next"

export const Login = () => {

    const [error, setError] = useState('')
    const setSession = useUserStatus(store => store.setSession)
    const { t } = useTranslation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username.value.toString()
        const password = e.currentTarget.password.value.toString()

        const data = await fetchLogin(username, password)
        
        if(data.status === 200){
            setSession(data?.data?.data?.session?.token?.value, data?.data?.data?.user)
            return
        }else{
            if(data?.errors){
                setError(data?.errors[0])
                return
            }else{
                setError(data?.message)
                return
            }
        }

    }

    return (
        <main className="flex flex-col items-center justify-center w-full h-screen">
            <Metric className="mb-5 text-6xl hidden md:block">
                {t('login')}
            </Metric>
            <Card className="flex flex-col justify-center items-center w-full md:h-[400px] md:w-[450px]">
                <Title className="text-xl md:hidden">Login</Title>
                <form onSubmit={handleSubmit} className="w-full h-full px-5 flex flex-col justify-between">
                    <Flex className="gap-2 mt-10 flex-col items-start">
                        <Title className="text-2xl mb-2 capitalize">
                            {t('loginUser')}
                        </Title>
                        <TextInput
                        onChange={() => setError('')}
                            name="username" icon={UserIcon} 
                            placeholder="JohnDoe123" 
                        />
                        <Title className="mt-3 text-2xl mb-2 capitalize">
                            {t('loginPass')}
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
                            {t('loginAction')}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </main>
    )
}