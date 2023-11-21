import { PaperAirplaneIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Icon, Subtitle, Text, TextInput, Title } from "@tremor/react"

export const NewUser = () => {
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.currentTarget.reset()
    }

    return (
        <>
            <Card className="h-[590px] py-6">
                <form onSubmit={handleSubmit} className="flex flex-col h-full justify-between text-start">
                        <div>
                            <Title>
                                Register a new user
                            </Title>
                            <Text>
                                Put the user´s credentials in order to create a new user and add it to the system.
                            </Text>
                            <Title className="mt-5 border-t pt-4">
                                User Data
                            </Title>
                            <Flex justifyContent="start" alignItems="start" flexDirection="col" className="gap-5">
                                <div>
                                    <Subtitle className="text-left mt-4">
                                        Email
                                    </Subtitle>
                                    <Flex justifyContent="start" alignItems="center">
                                        <TextInput placeholder="johndoe@gmail.com" className="w-[230px] max-w-xs mt-2" type="email" />
                                        <Icon icon={QuestionMarkCircleIcon} tooltip="It must contain at least 4 letters and 1 number" />
                                    </Flex>
                                </div>
                                <div>
                                    <Subtitle className="text-left">
                                        Password
                                    </Subtitle>
                                    <Flex justifyContent="start" alignItems="center">
                                        <TextInput placeholder="JohnDoe12" className="w-[230px] max-w-xs mt-2" type="password" />
                                        <Icon icon={QuestionMarkCircleIcon} tooltip="It must contain at least 8 letters and 2 number" />
                                    </Flex>
                                </div>
                            </Flex>
                        </div>
                        <Button icon={PaperAirplaneIcon} iconPosition="right" className="max-w-max" type="submit">
                            Register
                        </Button>
                </form>
            </Card>
        </>
    )
}