import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Props {
    isAuth: boolean
    validate: (user: string, password: string) => void
    closeSesion: () => void
}

export const useUserStatus = create(persist<Props>((set) => ({
        isAuth: false,
        validate: (user: string, password: string) => {
            if(user === 'asddd' && password === '12345678'){
                set({ isAuth: true })
            }
        },
        closeSesion: () => set({ isAuth: false })
    }), {
        name: 'auth'
    }
))