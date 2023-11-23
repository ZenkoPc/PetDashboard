import { Card, Title, TabGroup, TabList, Tab, TabPanels, Text, TabPanel, Grid } from "@tremor/react"
import { LogoDashboard } from "./logoDashboard"

export const HomeDashboard = () => {
    return (
            <main className="h-screen [&>*]:px-5 max-h-screen pb-10 overflow-y-scroll w-full">
                <LogoDashboard />
                <Title className="pt-5">
                    Dashboard
                </Title>
                <Text>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </Text>
                <TabGroup className="mt-5">
                    <TabList>
                        <Tab>
                            A
                        </Tab>
                        <Tab>
                            B
                        </Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Grid className="gap-3 mt-4" numItems={1} numItemsSm={2} numItemsMd={3}>
                                <Card className="h-40"></Card>
                                <Card className="h-40"></Card>
                                <Card className="h-40"></Card>
                            </Grid>
                            <Card className="h-80 mt-5"></Card>
                        </TabPanel>
                        <TabPanel>
                            
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </main>
            
    )
}