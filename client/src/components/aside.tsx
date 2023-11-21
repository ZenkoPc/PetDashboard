import { HomeIcon, Cog6ToothIcon, ServerIcon, CalendarDaysIcon } from "@heroicons/react/24/solid"
import { Card, Flex, Icon, Text } from "@tremor/react"
import { Link } from "react-router-dom"

export const Aside = () => {
    return (
        <aside className="h-screen min-w-[200px] hidden lg:block">
                <Card className="h-full p-0">
                    <Flex alignItems="center" justifyContent="start" className="flex-col h-full gap-5 pt-12">
                        <Link to={'/dashboard'} className="flex justify-center w-full items-center">
                            <Icon icon={HomeIcon} />
                            <Text>
                                Home
                            </Text>
                        </Link>
                        <Link to={'/dashboard/dates'} className="flex justify-center w-full items-center">
                            <Icon icon={CalendarDaysIcon} />
                            <Text>
                                Appointments
                            </Text>
                        </Link>
                        <Link to={'/dashboard/users'} className="flex justify-center w-full items-center">
                            <Icon icon={ServerIcon} />
                            <Text>
                                Users
                            </Text>
                        </Link>
                        <Link to={'/dashboard/settings'} className="flex justify-center w-full items-center">
                            <Icon icon={Cog6ToothIcon} />
                            <Text>
                                Settings
                            </Text>
                        </Link>
                    </Flex>
                </Card>
            </aside>
    )
}