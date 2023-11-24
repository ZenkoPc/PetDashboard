import { Bars3Icon } from "@heroicons/react/24/solid"
import { Button } from "@tremor/react"
import { useState } from "react"
import { MenuResponsive } from "./menuResponsive"

export const LogoDashboard = () => {

    const [menu, setMenu] = useState(false)

    const handleClose = () => {
        setMenu(false)
    }

    return (
        <>
            {menu && <MenuResponsive close={handleClose} />}
            <div className="py-5 flex items-center w-full border-b px-5 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent font-bold text-lg">
                <Button onClick={() => setMenu(true)} variant="secondary" icon={Bars3Icon} className="mr-3 lg:hidden"></Button>
                Pet Admin
            </div>
        </>
    )
}