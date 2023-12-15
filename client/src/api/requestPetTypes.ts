import { APIRes } from "../types/types"
import { petAdminPetsInfo } from "./petadmin"

interface CreateProps{
    name: string
    token: string
}

interface EditProps extends CreateProps{
    id: string
}

interface DeleteProps {
    id: string
    token: string
}

export const getPetTypes = async (token: string) => {

    const { data } = await petAdminPetsInfo.get<APIRes>('/pet-type',{
        headers:{
            "x-auth-token": 'Bearer '+token
        }
    }).catch(err => err.response.data)

    return data
    
}

export const createPetTypeMutation = async ({ name, token } : CreateProps) => {

    const { data } = await petAdminPetsInfo.post('/pet-type',{
        name
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    }) 

    return data

}

export const editPetTypeMutation = async ({ name, id, token }: EditProps) => {

    const { data } = await petAdminPetsInfo.put(`/pet-type/${encodeURIComponent(id)}`,{
        name
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data
}

export const deletePetTypeMutation = async ({ id, token } : DeleteProps) => {
    
    const { data } = await petAdminPetsInfo.delete(`/pet-type/${encodeURIComponent(id)}`,
    {
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}