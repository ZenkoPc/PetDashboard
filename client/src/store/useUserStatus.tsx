import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Props {
    isAuth: boolean
    token: string
    role: string
    setSession: (token: string, role: string) => void
    closeSesion: () => void
}

export const useUserStatus = create(persist<Props>((set) => ({
        isAuth: false,
        token: '',
        role: '',
        setSession: (token: string, role: string) => {
            set({ 
                isAuth: true,
                token,
                role
            })
        },
        closeSesion: () => set({ isAuth: false, role: '' })
    }), {
        name: 'auth'
    }
))