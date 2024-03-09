import {create} from 'zustand';

interface UserState {
  name: string;
  password: string;
  setName: (name: string) => void;
  setPassword: (email: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  name: '',
  password: '',
  setName: (name : string) => set(() => ({ name })),
  setPassword: (password : string) => set(() => ({ password })),
}));

export default useUserStore;
