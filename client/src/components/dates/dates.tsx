import { Title, Text, TabGroup, Tab, TabList, TabPanel, TabPanels } from "@tremor/react"
import { Principal } from "./principal"

export const Dates = () => {

    return (
        <main className="w-full [&>*]:px-5 max-h-screen h-screen">
            <div className="py-5 border-b px-5 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent font-bold text-lg">
                / Dashboard
            </div>
            <Title className="mt-5">
                Appointments
            </Title>
            <Text>
                See all the dates when people is coming out with their pets to their Appointments
            </Text>
            <TabGroup className="mt-5">
                <TabList>
                    <Tab>
                        Programmed Appointments
                    </Tab>
                    <Tab>
                        New Appointment
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Principal />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    )
}