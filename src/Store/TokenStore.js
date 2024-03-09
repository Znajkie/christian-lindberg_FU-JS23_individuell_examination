import {create} from 'zustand';

const TokenStore = create((set) => ({
  token: '',
  setToken: (token) => set((state) => ({ token })),
}));

export default TokenStore;
