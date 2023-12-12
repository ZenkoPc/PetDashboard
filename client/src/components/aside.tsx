import { Card } from "@tremor/react"
import { RoutesMenu } from "./shared/routes"

export const Aside = () => {

    return (
        <aside className="h-screen lg:block min-w-[200px] hidden">
            <Card style={{ borderRadius: '0px' }} className="h-full flex flex-col justify-between pt-2 px-0">
                <RoutesMenu />
            </Card>
        </aside>
    )
}