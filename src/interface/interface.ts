interface CartItem {
  id: string;
  quantity: number;
}

interface MenuItem {
  id: string;
  title: string;
  desc: string;
  price: number;
  count?: number;
  increment?: number;
}

interface ApiResponse {
  success: boolean;
  menu: MenuItem[];
}

interface OrderResponseData {
  eta: number;
  orderNr: string;
}

interface ShopStore {
  shoppingList: CartItem[];
  menuItems: MenuItem[];
  getTotalPrice: () => number;
  incrementItemQuantity: (id: string) => void;
  decrementItemQuantity: (id: string) => void;
}

export { CartItem, MenuItem, OrderResponseData, ShopStore, ApiResponse };