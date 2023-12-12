import { Card } from "@tremor/react"
import { RoutesMenu } from "./shared/routes"

export const MenuResponsive = ({ width, close }: { width: string, close: () => void }) => {

    return (
        <>
            <Card style={{ width: width }} className="md:max-w-[400px] py-3 px-0 duration-500 overflow-hidden transition-all h-full flex flex-col justify-between lg:hidden fixed top-0 z-[1000]">
                <RoutesMenu close={close} />
            </Card>
        </>
    )
}