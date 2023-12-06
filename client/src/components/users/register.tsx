import { Button, Flex, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { AllUsers } from "./allUsers"
import { LogoDashboard } from "../logoDashboard"
import { InformationCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { Modal } from "./modal"
import { useUsers } from "../../hooks/useUsers"
import { useMutation } from "@tanstack/react-query"
import { petAdmin } from "../../api/petadmin"
import { useUserStatus } from "../../store/useUserStatus"
import { Alert } from "flowbite-react"
import { UserPlusIcon } from "@heroicons/react/24/outline"

interface newUser {
    name: string
    lastname: string
    email: string
    password: string
    role: string
}



export const Register = () => {

    const [modal, setModal] = useState(false)
    const users = useUsers()
    const token = useUserStatus(store => store.token)
    const [error, setError] = useState('')
    const [visible, setVisible] = useState(false)

    const createUser = useMutation({
        mutationFn: async (users: newUser) => {
            return await petAdmin.post('/register',{
                name: users.name,
                lastname: users.lastname,
                email: users.email,
                password: users.password,
                role: users.role
            },{
                headers: {
                    "x-auth-token": "Bearer "+token
                }
            }).catch(err => err.response.data)
        }
    })

    const handleClose = () => {
        setModal(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const name = e.currentTarget.named?.value
        const lastname = e.currentTarget?.lastname.value
        const email = e.currentTarget?.email.value
        const password = e.currentTarget?.password.value
        const role = e.currentTarget.roles?.value
        
        createUser.mutate({
            name,
            lastname,
            email,
            password,
            role
        })

    }

    useEffect(() => {
        if(createUser?.data?.status === 200){
            setVisible(true)
            setError('')
            setModal(false)
            users.refetch()
            return
        }else{
            if(createUser?.data?.errors){
                setVisible(true)
                setError(createUser?.data?.errors[0])
                return
            }else{
                setVisible(true)
                setError(createUser?.data?.message)
                return
            }
        }
    }, [createUser.isSuccess])

    return (

        <>
            {modal && <Modal close={handleClose} submit={handleSubmit} error={error} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Flex alignItems="center" className="mt-5 gap-4 items-start md:items-center flex-col md:flex-row">
                    <div>
                        <Title className="">
                            Usuarios
                        </Title>
                        <Text>
                            Administra a todos los usuarios desde este modulo, añade, modifica o elimina a los usuarios segun tu desees.
                        </Text>
                    </div>
                    <div>
                        <Button onClick={() => setModal(true)} className="p-3 rounded-tremor-full" size="xl" icon={UserPlusIcon}>
                            Nuevo Usuario
                        </Button>
                    </div>
                </Flex>
                <TabGroup className="mt-5">
                    <TabList>
                        <Tab>
                            Todos los usuarios
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-5">
                        <TabPanel>
                            <AllUsers users={users} create={createUser} />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
            {createUser.isError && 
                <Alert className={`${visible === true ? 'fixed flex justify-between items-center top-3 left-[35%] z-[9999]' : 'hidden'}`} color={'failure'} onDismiss={() => setVisible(false)}>
                    <div className="h-full flex items-center">
                        <Icon color="red" icon={InformationCircleIcon} />
                        <span className="font-medium p-0">
                            A ocurrido un error!
                        </span>
                        Algo ha fallado, intenta mas tarde
                    </div>
                </Alert>
            }
            {createUser.isSuccess && 
                <Alert className={`${visible === true ? 'fixed top-3 left-[35%] z-[9999]' : 'hidden'}`} color={'success'} onDismiss={() => setVisible(false)}>
                    <div className="h-full flex items-center">
                        <Icon color="green" icon={InformationCircleIcon} />
                        <span className="font-medium">
                            Exito!
                        </span>
                        El usuario fue creado exitosamente
                    </div>
                </Alert>
            }
        </>

    )
}