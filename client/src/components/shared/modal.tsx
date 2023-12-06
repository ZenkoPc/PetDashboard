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
            <Alert className={'fixed animate-fade-up animate-duration-1000 flex rounded-xl justify-between items-center top-3 left-[7%] md:left-[25%] lg:left-[35%] xl:left-[40%] z-[99999]'} color={color} onDismiss={close}>
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
        </>
    )
}