import { create } from 'zustand'

const store = (set) => ({
  user: null,
  loginUser: () => set((state) => ({ user: state.user }))
})

export const useStore = create(store)