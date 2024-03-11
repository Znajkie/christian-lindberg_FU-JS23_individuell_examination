import { create } from 'zustand';

interface ShoppingListItem {
  id: string;
  quantity: number;
}

interface MenuItem {
  id: string;
  title: string;
  desc: string;
  price: number;
}

interface ShopState {
  shoppingList: ShoppingListItem[];
  menuItems: MenuItem[];
  addToShoppingList: (id: string) => void;
  getTotalItemCount: () => number;
  getTotalPrice: () => number;
  incrementItemQuantity: (id: string) => void;
  decrementItemQuantity: (id: string) => void;
  setMenuItems: (menuItems: MenuItem[]) => void;
}

export const useShopStore = create<ShopState>((set, get) => ({
  shoppingList: [],
  menuItems: [], // Initialize an empty array for menu items
  addToShoppingList: (id) =>
    set((state) => {
      const index = state.shoppingList.findIndex((item) => item.id === id);
      if (index >= 0) {
        // Item exists, increment quantity
        let newList = [...state.shoppingList];
        newList[index] = {
          ...newList[index],
          quantity: newList[index].quantity + 1,
        };
        return { shoppingList: newList };
      } else {
        // Item doesn't exist, add new item
        return { shoppingList: [...state.shoppingList, { id, quantity: 1 }] };
      }
    }),

  incrementItemQuantity: (id) => {
    set((state) => {
      const index = state.shoppingList.findIndex((item) => item.id === id);
      if (index !== -1) {
        const newList = [...state.shoppingList];
        newList[index] = {
          ...newList[index],
          quantity: newList[index].quantity + 1,
        };
        return { shoppingList: newList };
      }
      return state;
    });
  },

  decrementItemQuantity: (id) => {
    set((state) => {
      const index = state.shoppingList.findIndex((item) => item.id === id);
      if (index !== -1 && state.shoppingList[index].quantity > 1) {
        const newList = [...state.shoppingList];
        newList[index] = {
          ...newList[index],
          quantity: newList[index].quantity - 1,
        };
        return { shoppingList: newList };
      } else if (index !== -1 && state.shoppingList[index].quantity === 1) {
        const newList = state.shoppingList.filter((item) => item.id !== id);
        return { shoppingList: newList };
      }
      return state;
    });
  },

  getTotalItemCount: () => {
    const { shoppingList } = get();
    return shoppingList.reduce((total, item) => total + item.quantity, 0);
  },
  getTotalPrice: () => {
    const { shoppingList, menuItems } = get();
    return shoppingList.reduce((total, cartItem) => {
      const item = menuItems.find((menuItem) => menuItem.id === cartItem.id);
      return total + (item?.price || 0) * cartItem.quantity;
    }, 0);
  },
  setMenuItems: (menuItems) => {
    set({ menuItems });
  },
}));

interface CountState {
  count: number;
  increment: () => void;
  decrement: () => void;
}
// Counter in Cart
export const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
