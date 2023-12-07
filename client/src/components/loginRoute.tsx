import { Outlet, useNavigate } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"
import { useEffect } from "react"

interface Props{
    children?: React.ReactNode
}

export const LoginRoute = ({ children }: Props) => {

    const isAuth = useUserStatus(store => store.isAuth)
    const navigate = useNavigate()
    
    useEffect(() => {
        if(isAuth) navigate('/dashboard')
    }, [isAuth])

    return children ? <>{children}</> : <Outlet />

}