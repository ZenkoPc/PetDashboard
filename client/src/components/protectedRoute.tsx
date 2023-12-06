import { Outlet, useNavigate } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"
import { useEffect } from "react"

interface Props{
    children?: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {

    const isAuth = useUserStatus(store => store.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuth) navigate('/')
    }, [isAuth])

    return children ? <>{children}</> : <Outlet />

}