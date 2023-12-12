import { PlusIcon } from "@heroicons/react/24/outline"
import { Flex, Title, Text, Button } from "@tremor/react"
import { useUserStatus } from "../../store/useUserStatus"

interface Props{
    title: string
    desc: string
    buttonText: string
    buttonAction: (value: boolean) => void
}

export const Header = ({ title, desc, buttonText, buttonAction }: Props) => {
    
    const role = useUserStatus(store => store.role)
    return (
        <>
            <Flex className="mt-5 w-full" flexDirection="col" alignItems="start">
                    <Flex justifyContent="between" className="w-full gap-3 flex-col md:flex-row ">
                        <Flex flexDirection="col" alignItems="start">
                            <Title>
                                {title}
                            </Title>
                            <Text>
                                {desc}
                            </Text>
                        </Flex>
                       {role !== 'viewer' && <Flex justifyContent="end">
                            <Button onClick={() => buttonAction(true)} icon={PlusIcon} className="rounded-tremor-full py-3">
                                {buttonText}
                            </Button>
                        </Flex>}
                    </Flex>
                </Flex>
        </>
    )
}