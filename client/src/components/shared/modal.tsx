import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { Color, Flex, Icon } from "@tremor/react"
import { Alert } from "flowbite-react"

interface Props{
    color: Color
    method: string
    message: string
    close: () => void
}

export const BaseModal = ({ color, method, message, close }: Props) => {
    return(
        <>
            <div className="z-[9999] top-2 flex justify-center fixed w-full">
                <Alert className={'animate-fade-up max-w-max animate-duration-1000 flex rounded-xl justify-between items-center'} color={color} onDismiss={close}>
                    <Flex>
                        <div className="h-full flex items-center">
                            <Icon color={color} icon={InformationCircleIcon} />
                            <span className="font-medium p-0 mr-2">
                                {method}
                            </span>
                            {message}
                        </div>
                    </Flex>
                </Alert>
            </div>
        </>
    )
}