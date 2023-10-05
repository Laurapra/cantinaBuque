import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCarStore } from "../interfaces/carStore";

type Product = {
  id: number;
  attributes: {
    title: string;
    price: number;
  };
};

export const ShoppingCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cartItems = useCarStore((state) => state.items);
  const addToCart = useCarStore((state) => state.addToCart);
  const removeFromCart = useCarStore((state) => state.removeFromCart);
  const clearCart = useCarStore((state) => state.clearCart);
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:1337/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.data);
        } else {
          console.log("Error al obtener los datos de la api");
        }
      } catch (error) {
        console.log("Error al conectarse a la API", error);
      }
    }
    fetchProducts();
  }, []);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => acc + product.price, 0);
    return total;
  };
  return (
        <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6">Carrito de Compra</h1>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Productos disponibles:</h2>
            <ul>
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between items-center border-b border-gray-300 py-2"
                >
                  <span>{product.attributes.title}</span>
                  <span>${product.attributes.price}</span>
                  <button
                    onClick={() => addToCart({ name: product.attributes.title, price: product.attributes.price })}
                    className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2"
                  >
                    Agregar al carrito
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Productos en el carrito:</h2>
            <ul>
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b border-gray-300 py-2"
                >
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                  <button onClick={() => removeFromCart(item)} className="text-red-500">
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
            <div className="mb-4">
            <button onClick={clearCart} className="bg-red-500 text-white rounded-md px-4 py-2 mr-4">
              Vaciar Carrito
            </button>
              <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-4">
                Calcular Total
              </button>
              <span>Total: ${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </>
    );
};