import { create } from "zustand";
import { persist } from "zustand/middleware";

type ResUser = {
    id: string,
    email: string,
    name: string,
    lastname: string,
    role: string
}

export interface Props {
    isAuth: boolean
    token: string
    role: string
    setSession: (token: string, res: ResUser) => void
    closeSesion: () => void
    userData: {
        name: string,
        lastname: string,
        email: string
    }
}

export const useUserStatus = create(persist<Props>((set) => ({
        isAuth: false,
        token: '',
        role: '',
        userData: {
            name: '',
            lastname: '',
            email: ''
        },
        setSession: (token: string, res: ResUser) => {
            console.log(res)
            set({ 
                isAuth: true,
                token,
                role: res.role,
                userData: {
                    name: res.name,
                    lastname: res.lastname,
                    email: res.email
                }
            })
        },
        closeSesion: () => set({ isAuth: false, role: '', token: '' })
    }), {
        name: 'auth'
    }
))