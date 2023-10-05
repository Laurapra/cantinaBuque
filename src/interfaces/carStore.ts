import create from 'zustand';

interface Product {
    name: string;
    price: number;
}
//defino el estado del carrito
interface CartState{
    items: Product[];
}
//def las acciones disponibles para el carrito
interface CarActions{
    addToCart: (product: Product)=> void;
    removeFromCart: (product: Product)=> void;
    clearCart: ()=> void;
}

export const useCarStore= create<CartState & CarActions>((set) => ({
    items: [],
    addToCart: (product) => {
        set((state) => ({items: [...state.items, product] }));
    },
    removeFromCart: (product) => {
        set((state) =>  ({
            items: state.items.filter((cartProduct) => cartProduct != product),
        }));
    },
    clearCart: () => {
        set({ items: [] });
    },
}));