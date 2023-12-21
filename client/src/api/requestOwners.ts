import { Owner } from "../types/types"
import {  petAdminPetsInfo } from "./petadmin"

interface CreateProps{
    value: Owner
    token: string
}

export const getOwners = async (token: string) => {

    const { data } = await petAdminPetsInfo.get('/owners',{
        headers:{
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    }).catch(err => err.response.data)

    return data

}

export const createOwnersMutation = async ({ value, token} :CreateProps) => {

    const { data } = await petAdminPetsInfo.post('/owners',{
        name: value.name,
        email: value.email,
        address: value.address,
        contact1: value.contact1,
        contact2: value.contact2
    },{
        headers:{
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}

export const editOwnersMutation = async ({ value, token }:CreateProps) => {
    const { data } = await petAdminPetsInfo.put(`/owners/${encodeURIComponent(value.id)}`,{
        name: value.name,
        email: value.email,
        address: value.address,
        contact1: value.contact1,
        contact2: value.contact2
    },{
        headers:{
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data
}

export const deleteOwnersMutation = async ({ id, token }:{ id: string, token: string }) => {

    const { data } = await petAdminPetsInfo.delete(`/owners/${encodeURIComponent(id)}`,{
        headers:{
            "x-auth-token": `Bearer ${encodeURIComponent(token)}`
        }
    })

    return data

}