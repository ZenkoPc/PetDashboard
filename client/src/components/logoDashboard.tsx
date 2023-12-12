import { Bars3Icon } from "@heroicons/react/24/solid"
import { Button, Title } from "@tremor/react"
import { useState } from "react"
import { MenuResponsive } from "./menuResponsive"
import { useUserStatus } from "../store/useUserStatus"

export const LogoDashboard = () => {

    const [menu, setMenu] = useState(false)
    const userData = useUserStatus(store => store.userData)

    const handleClose = () => {
        setMenu(false)
    }

    return (
        <>
            <div style={{ paddingLeft: '0' }} className="w-full border-b flex flex-row justify-between items-center">
                <div>
                <MenuResponsive width={`${menu ? '100%' : '0px' }`} close={handleClose} />
                    <div className="py-5 flex items-center w-full px-5 bg-gradient-to-r from-purple-600 to-purple-950 bg-clip-text text-transparent font-bold text-lg">
                        <Button onClick={() => setMenu(true)} variant="secondary" icon={Bars3Icon} className="mr-3 lg:hidden"></Button>
                        Pet Admin
                    </div>
                </div>
                <div className="flex md:p-0 items-center gap-2">
                    <div className="p-3 w-12 h-12 bg-blue-700 text-white font-semibold text-xl overflow-hidden border-white border rounded-full relative">
                        <div className="absolute w-full h-full top-0 flex justify-center items-center font-normal left-0">
                            {userData.name.split("")[0]+userData.lastname.split("")[0]}
                        </div>
                    </div>
                    <Title color="blue" className="mr-3 hidden md:block">
                        Hola, {userData.name} {userData.lastname}
                    </Title>
                </div>
            </div>
        </>
    )
}