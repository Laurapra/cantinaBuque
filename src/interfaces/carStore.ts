import { create } from 'zustand';

interface Product {
  id: number;
  attributes: {
    title: string;
    price: number;
  };
  quantity: number;
}

interface CartState {
  items: Product[]; 
}

interface CartActions {
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  clearCart: () => void;
  increaseQuantity: (product: Product) => void;
  decreaseQuantity: (product: Product) => void;
} 

export const useCartStore = create<CartState & CartActions>((set, get) => ({
  items: [], 
  addToCart: (product) => {
    const productsCar = get().items

    const hasPreviousItem = productsCar.find((item) => item.id === product.id)

    if(hasPreviousItem) return

    set((state) => ({
      ...state,
      items: [...state.items, { ...product, quantity: 0}],
    }));
  },
  removeFromCart: (product) => {
    set((state) => ({
      ...state,
      items: state.items.filter((cartProduct) => cartProduct.id !== product.id),
    }));
  },
  clearCart: () => {
    set({ items: [] });
  },
  increaseQuantity: (product) => {

    set((state) => ({
      ...state,
      items: state.items.map((cartProduct) =>
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      ),
    }));
  },
  decreaseQuantity: (product) => {
    set((state) => ({
      ...state,
      items: state.items.map((cartProduct) =>
        cartProduct.id === product.id && cartProduct.quantity > 1
          ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
          : cartProduct
      ),
    }));
  },
}));
