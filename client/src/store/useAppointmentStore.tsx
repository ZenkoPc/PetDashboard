import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Props {
    success: number
    failed: number
    setSuccess: () => void
    setFailed: () => void
    reset: () => void
}

export const useAppointmentStore = create(persist<Props>((set, get) => ({
    success: 0,
    failed: 0,
    setSuccess: () => {
        const { success } = get()
        set({ success: success + 1 })
    },
    setFailed: () => {
        const { failed } = get()
        set({ failed: failed + 1 })
    },
    reset: () => set({ success: 0, failed: 0 })
}),{
    name: 'Appointments'
}
))