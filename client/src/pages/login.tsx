import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid"
import { Card, Title, Flex, Button, Metric, TextInput } from "@tremor/react"
import { useState } from "react"
import { useUserStatus } from "../store/useUserStatus"

export const Login = () => {

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const validate = useUserStatus(store => store.validate)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const username = e.currentTarget.username.value.toString()
        const password = e.currentTarget.password.value.toString()

        if(username.length < 4){
            setUsernameError(true)
            
            if(password.length < 8){
                setPasswordError(true)
                return
            }

            return
        }

        validate(username, password)

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
                            onChange={() => setUsernameError(false)} 
                            error={usernameError} 
                            errorMessage="Put a valid username." 
                            name="username" icon={UserIcon} 
                            placeholder="JohnDoe123" 
                        />
                        <Title className="mt-3 text-2xl mb-2">
                            Password:
                        </Title>
                        <TextInput 
                            onChange={() => setPasswordError(false)} 
                            error={passwordError} 
                            errorMessage="The password is not valid." 
                            name="password" icon={LockClosedIcon} 
                            type="password" 
                            placeholder="*****" 
                        />
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