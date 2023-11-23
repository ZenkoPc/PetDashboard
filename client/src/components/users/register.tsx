import { Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { AllUsers } from "./allUsers"
import { NewUser } from "./newUsers"
import { LogoDashboard } from "../logoDashboard"

export const Register = () => {
    return (
        <main className="h-screen [&>*]:px-5 max-h-screen pb-10 overflow-y-scroll w-full">
                <LogoDashboard />
                <Title className="mt-5">
                    Users
                </Title>
                <Text>
                    Manage all users from this module, add, edit or delete some users if you wish.
                </Text>
                <TabGroup className="mt-5">
                    <TabList>
                        <Tab>
                            All Users
                        </Tab>
                        <Tab>
                            Register
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-5">
                        <TabPanel>
                            <AllUsers />
                        </TabPanel>
                        <TabPanel>
                            <NewUser />
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
    )
}