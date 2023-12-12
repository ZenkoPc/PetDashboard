import { petAdmin } from "../../api/petadmin"

const getLogin = async (email: string, password: string) => {

    const data = await petAdmin.post('/login',{
        email,
        password
    }).catch((err) => err.response.data)

    return data

}

export const fetchLogin = async (email: string, password: string) => {
    
    const data = await getLogin(email, password)

    return data

}