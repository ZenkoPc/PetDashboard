import { Outlet, useNavigate } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"
import { useEffect } from "react"

interface Props {
    children?: React.ReactNode
}

export const ProtectedSuperAdmin = ({ children }: Props) => {

    const role = useUserStatus(store => store.role)
    const navigate = useNavigate()

    useEffect(() => {
        if(role !== 'super_admin'){
            navigate('/')
        }
    }, [role])

    return children ? <>{children}</> : <Outlet />

}