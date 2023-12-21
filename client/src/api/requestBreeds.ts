import { Breed } from "../types/types"
import { petAdminPetsInfo } from "./petadmin"

interface CreateProps{
    value: Breed
    token: string
}

interface DeleteProps{
    id: string
    token: string
}
export const getBreeds = async (token: string) => {

    const data = await petAdminPetsInfo.get('/breeds',{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    }).catch(err => err.response.data)

    return data

}

export const createBreedsMutation = async ({ value, token }: CreateProps) => {

    const data = await petAdminPetsInfo.post('/breeds',{
        name: value.name,
        type: value.type,
        desc: value.desc
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}

export const editBreedsMutation = async ({ value, token }: CreateProps) => {

    const data = await petAdminPetsInfo.put(`/breeds/${encodeURIComponent(value.id)}`,{
        name: value.name,
        type: value.type,
        desc: value.desc
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}

export const deleteBreedsMutation = async ({ id, token }: DeleteProps) => {

    const data = await petAdminPetsInfo.delete(`/breeds/${encodeURIComponent(id)}`,{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}