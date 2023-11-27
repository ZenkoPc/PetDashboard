import { HomeIcon, CalendarDaysIcon, ServerIcon, Cog6ToothIcon, Bars3Icon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Icon, Text, Title } from "@tremor/react"
import { Link } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"

export const MenuResponsive = ({ close, width }: { close: () => void, width: string }) => {

    const role = useUserStatus(store => store.role)
    const closeSesion = useUserStatus(store => store.closeSesion)

    return (
        <>
            <Card style={{ width: width }} className="md:max-w-[400px] p-0 duration-500 overflow-hidden transition-all h-full flex flex-col justify-between lg:hidden fixed top-0 z-[1000]">
                <Flex alignItems="center" justifyContent="start" className="flex-col gap-5">
                    <Flex className="p-5 gap-3" justifyContent="start">
                        <Button onClick={close} variant="secondary" icon={Bars3Icon}></Button>
                        <div className="bg-gradient-to-r from-blue-700 to-blue-700 bg-clip-text">
                            <Title className="text-transparent min-w-[200px]">
                                Pet Admin
                            </Title>
                        </div>
                    </Flex>
                    <Link to={'/dashboard'} className="flex justify-start px-5 py-2 w-full items-center">
                        <Icon icon={HomeIcon} />
                        <Text>
                            Home
                        </Text>
                    </Link>
                    <Link to={'/dashboard/dates'} className="flex justify-start px-5 py-2 w-full items-center">
                        <Icon icon={CalendarDaysIcon} />
                        <Text>
                            Appointments
                        </Text>
                    </Link>
                    {role === 'super_admin' && <Link to={'/dashboard/users'} className="flex justify-start px-5 py-2 w-full items-center">
                        <Icon icon={ServerIcon} />
                        <Text>
                            Users
                        </Text>
                    </Link>}
                    <Link to={'/dashboard/settings'} className="flex justify-start px-5 py-2 w-full items-center">
                        <Icon icon={Cog6ToothIcon} />
                        <Text>
                            Settings
                        </Text>
                    </Link>
                </Flex>
                <Button onClick={closeSesion} color="red" variant="secondary" className="mb-4 ml-3 max-w-max">
                    Close Session
                </Button>
            </Card>
        </>
    )
}