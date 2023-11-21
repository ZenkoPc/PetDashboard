import { Tab, TabGroup, TabList, TabPanel, TabPanels, Text, Title } from "@tremor/react"
import { AllUsers } from "./allUsers"
import { NewUser } from "./newUsers"

export const Register = () => {
    return (
        <main className="h-screen [&>*]:px-5 max-h-screen pb-10 overflow-y-scroll w-full">
                <div className="py-5 border-b px-5 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent font-bold text-lg">
                    / Dashboard 
                </div>
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