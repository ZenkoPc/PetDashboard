import { Pet } from "../types/types"
import { petAdminPetsInfo } from "./petadmin"

interface CreateProps{
    value: Pet
    token: string
}

interface DeleteProps{
    id: string
    token: string
}

export const getPets = async (token: string) => {

    const data = await petAdminPetsInfo.get('/pets',{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    }).catch(err => err.response.data)

    return data

}

export const createPetsMutation = async ({ value, token }: CreateProps) => {

    const data = await petAdminPetsInfo.post('/pets',{
        name: value.name,
        breed: value.raza,
        owner: value.owner,
        desc: value.desc
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}

export const editPetsMutation = async ({ value, token }: CreateProps) => {

    const data = await petAdminPetsInfo.put(`/pets/${encodeURIComponent(value.id)}`,{
        name: value.name,
        breed: value.raza,
        owner: value.owner,
        desc: value.desc
    },{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}

export const deletePetsMutation = async ({ id, token }: DeleteProps) => {

    const data = await petAdminPetsInfo.delete(`/pets/${encodeURIComponent(id)}`,{
        headers: {
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}