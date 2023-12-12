import { HomeIcon, CalendarDaysIcon, UserIcon, BarsArrowDownIcon, UserGroupIcon, UsersIcon, Cog6ToothIcon } from "@heroicons/react/24/solid"
import { Button, Flex, Icon, Text, Title } from "@tremor/react"
import { Link } from "react-router-dom"
import { useUserStatus } from "../../store/useUserStatus"
import { XMarkIcon } from "@heroicons/react/24/outline"

interface Props{
    close?: () => void
}

export const RoutesMenu = ({ close }: Props) => {

    const { role, closeSesion } = useUserStatus()

    return(
        <>
            <Flex alignItems="center" justifyContent="start" className="flex-col gap-5 [&>a]:flex [&>a]:justify-start [&>a]:px-5 [&>a]:py-2 [&>a]:w-full [&>a]:items-center">
                <Flex justifyContent="between" className="lg:hidden px-6">
                    <Title color="blue">
                        Pet Admin
                    </Title>
                    <Button onClick={close} type="button" color="gray" variant="light" icon={XMarkIcon} />
                </Flex>
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
        </>
    )
}