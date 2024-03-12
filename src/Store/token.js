import { create } from 'zustand';

export const useTokenStore = create()((set) => ({
  token: '',
  setToken: (token) => set((state) => ({ token })),
}));

export default useTokenStore;
