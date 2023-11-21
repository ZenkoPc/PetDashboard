import { Flex } from "@tremor/react"
import { Outlet } from "react-router-dom"
import { Aside } from "../components/aside"

export const Dashboard = () => {

    return (
        <Flex className="w-full min-h-full">
            <Aside />
            <Outlet />
        </Flex>
    )
}