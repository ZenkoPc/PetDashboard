import { PaperAirplaneIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Select, SelectItem, Text, TextInput, Title } from "@tremor/react"

export const Modal = ({ close, submit, error }:{ close: () => void, submit: (e: React.FormEvent<HTMLFormElement>) => void, error: string }) => {

    return (
        <div className="w-full h-full flex justify-center items-center fixed top-0 z-[10000] bg-black/80">
            <Card className="max-w-[500px] text-center relative">
                <div className="absolute top-5 right-5 z-[10001]">
                    <Button onClick={close} color="neutral" variant="light" icon={XMarkIcon} className="p-0">
                    </Button>
                </div>
                <Title className="text-xl">
                    Register
                </Title>
                <form onSubmit={(e) => submit(e)}>
                    <Flex className="gap-7" flexDirection="col">
                        <Flex className="mt-5 w-full gap-4 flex-col md:flex-row">
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Name:
                                </Text>
                                <TextInput name="named" required={true} type="text" placeholder="John" />
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Lastname:
                                </Text>
                                <TextInput name="lastname" required={true} type="text" placeholder="Doe" />
                            </Flex>
                        </Flex>
                        <Flex className="w-full gap-4 flex-col md:flex-row">
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Email:
                                </Text>
                                <TextInput name="email" type="email" placeholder="JohnDoe@gmail.com" />
                            </Flex>
                            <Flex flexDirection="col" alignItems="start">
                                <Text>
                                    Password:
                                </Text>
                                <TextInput name="password" type="password" placeholder="***********" />
                            </Flex>
                        </Flex>
                        <div className="text-left w-full">
                            <Text>
                                Role:
                            </Text>
                            <Select name='roles' defaultValue="viewer">
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
                        Submit
                    </Button>
                </form>
            </Card>
        </div>
    )
}