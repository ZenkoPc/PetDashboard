import { useNavigate } from "react-router-dom"
import { useUserStatus } from "../store/useUserStatus"
import { useEffect } from "react"

export const Root = () => {
    const auth = useUserStatus(store => store.isAuth)

    const navigate = useNavigate()

    useEffect(() => {
        auth ? navigate('/dashboard') : navigate('/login')
    }, [])

    return (
        <>
        </>
    )

}