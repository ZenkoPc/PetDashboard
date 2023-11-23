import { HomeIcon, Cog6ToothIcon, ServerIcon, CalendarDaysIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Icon, Text } from "@tremor/react"
import { Link } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"

export const Aside = () => {

    const closeSession = useUserStatus(store => store.closeSesion)

    return (
        <aside className="h-screen lg:block min-w-[200px] hidden">
                <Card className="h-full flex flex-col justify-between pt-2 px-0">
                    <Flex alignItems="center" justifyContent="start" className="flex-col gap-5">
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
                        <Link to={'/dashboard/users'} className="flex justify-start px-5 py-2 w-full items-center">
                            <Icon icon={ServerIcon} />
                            <Text>
                                Users
                            </Text>
                        </Link>
                        <Link to={'/dashboard/settings'} className="flex justify-start px-5 py-2 w-full items-center">
                            <Icon icon={Cog6ToothIcon} />
                            <Text>
                                Settings
                            </Text>
                        </Link>
                    </Flex>
                    <Button onClick={closeSession} color="red" variant="secondary" className="ml-3 max-w-max">
                        Close Session
                    </Button>
                </Card>
            </aside>
    )
}