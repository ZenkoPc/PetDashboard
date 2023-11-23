import { Button, Flex, Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { AllUsers } from "./allUsers"
import { LogoDashboard } from "../logoDashboard"
import { PlusCircleIcon } from "@heroicons/react/24/solid"

export const Register = () => {
    return (
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
                        <Button className="p-3 rounded-tremor-full" size="xl" icon={PlusCircleIcon}>
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
                            <AllUsers />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
    )
}