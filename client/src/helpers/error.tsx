import { useRouteError } from "react-router-dom"
import { ErrorFound } from "../pages/error"

export const ErrorBoundary = () => {
    
    const error = useRouteError()
    console.error(error)

    return <ErrorFound />

}