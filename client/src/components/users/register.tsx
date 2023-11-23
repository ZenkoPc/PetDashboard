import { Button, Flex, Icon, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { AllUsers } from "./allUsers"
import { LogoDashboard } from "../logoDashboard"
import { InformationCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid"
import { useEffect, useState } from "react"
import { Modal } from "./modal"
import { useUsers } from "../../hooks/useUsers"
import { useMutation } from "@tanstack/react-query"
import { petAdmin } from "../../api/petadmin"
import { useUserStatus } from "../../store/useUserStatus"
import { Alert } from "flowbite-react"

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
        switch(createUser?.data?.status){
            case "validation:bad-request": {
                setVisible(true)
                setError(createUser?.data?.errors[0])
                return
            }
            case "auth:register:failed": {
                setVisible(true)
                setError(createUser?.data?.message)
                return
            }
            case "global:server-error": {
                setVisible(true)
                setError(createUser?.data?.message)
                return
            }
            case 200: {
                setVisible(true)
                setError('')
                setModal(false)
                users.refetch()
                return
            }
        }
    }, [createUser.isSuccess])

    return (

        <>
        {modal && <Modal close={handleClose} submit={handleSubmit} error={error} />}
            <main className="h-screen max-h-screen overflow-y-scroll [&>*]:px-5 pb-10 w-full">
                <LogoDashboard />
                <Flex alignItems="center" className="mt-5">
                    <div>
                        <Title className="">
                            Users
                        </Title>
                        <Text>
                            Manage all users from this module, add, edit or delete some users if you wish.
                        </Text>
                    </div>
                    <div>
                        <Button onClick={() => setModal(true)} className="p-3 rounded-tremor-full" size="xl" icon={PlusCircleIcon}>
                            New User
                        </Button>
                    </div>
                </Flex>
                <TabGroup className="mt-5">
                    <TabList>
                        <Tab>
                            All Users
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
                            An error has ocurred!
                        </span>
                        Something went wrong, try again later
                    </div>
                </Alert>
            }
            {createUser.isSuccess && 
                <Alert className={`${visible === true ? 'fixed top-3 left-[35%] z-[9999]' : 'hidden'}`} color={'success'} onDismiss={() => setVisible(false)}>
                    <div className="h-full flex items-center">
                        <Icon color="green" icon={InformationCircleIcon} />
                        <span className="font-medium">
                            Success!
                        </span>
                        The selected user was created successfully
                    </div>
                </Alert>
            }
        </>

    )
}