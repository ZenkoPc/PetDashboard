import { HomeIcon, Cog6ToothIcon, CalendarDaysIcon, UsersIcon, UserIcon, UserGroupIcon } from "@heroicons/react/24/solid"
import { Button, Card, Flex, Icon, Text } from "@tremor/react"
import { Link } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"
import { BarsArrowDownIcon } from "@heroicons/react/24/outline"

export const Aside = () => {

    const { role, closeSesion } = useUserStatus()

    return (
        <aside className="h-screen lg:block min-w-[200px] hidden">
                <Card style={{ borderRadius: '0px' }} className="h-full flex flex-col justify-between pt-2 px-0">
                    <Flex alignItems="center" justifyContent="start" className="flex-col gap-5 [&>a]:flex [&>a]:justify-start [&>a]:px-5 [&>a]:py-2 [&>a]:w-full [&>a]:items-center">
                        <Link to={'/dashboard'} >
                            <Icon icon={HomeIcon} />
                            <Text>
                                Inicio
                            </Text>
                        </Link>
                        <Link to={'/dashboard/dates'} >
                            <Icon icon={CalendarDaysIcon} />
                            <Text>
                                Citas
                            </Text>
                        </Link>
                        <Link to={'/dashboard/razas'} >
                            <Icon icon={UserIcon} />
                            <Text>
                                Razas
                            </Text>
                        </Link>
                        <Link to={'/dashboard/pets'} >
                            <Icon icon={UserIcon} />
                            <Text>
                                Mascotas
                            </Text>
                        </Link>
                        <Link to={'/dashboard/types'}>
                            <Icon icon={BarsArrowDownIcon} />
                            <Text>
                                Tipos de mascotas
                            </Text>
                        </Link>
                        <Link to={'/dashboard/owners'}>
                            <Icon icon={UserGroupIcon} />
                            <Text>
                                Dueños
                            </Text>
                        </Link>
                        {role === 'super_admin' && <Link to={'/dashboard/users'}>
                            <Icon icon={UsersIcon} />
                            <Text>
                                Usuarios
                            </Text>
                        </Link>}
                        <Link to={'/dashboard/settings'}>
                            <Icon icon={Cog6ToothIcon} />
                            <Text>
                                Configuracion
                            </Text>
                        </Link>
                    </Flex>
                    <Button onClick={closeSesion} color="red" variant="secondary" className="ml-3 max-w-max">
                        Close Session
                    </Button>
                </Card>
            </aside>
    )
}