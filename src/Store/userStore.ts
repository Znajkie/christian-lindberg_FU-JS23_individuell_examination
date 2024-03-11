import { create } from 'zustand';

export interface UserState {
  name: string;
  password: string;
  setName: (name: string) => void;
  setPassword: (password: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: '',
  password: '',
  setName: (name) => {
    console.log('namn', name)
    set({ name });
  },
  setPassword: (password) => set({ password }),
}));

export default useUserStore;
