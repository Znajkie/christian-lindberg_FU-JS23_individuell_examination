import { create } from 'zustand';

export interface UserState {
  name: string;
  password: string;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  name: '',
  password: '',
  setName: (e) => set((state) => ({ name: e })),
  setPassword: (e) => set((state) => ({ password: e })),
}));

export default useUserStore;
