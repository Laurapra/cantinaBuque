import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCarStore } from "../interfaces/carStore";

export const ShoppingCart = () => {
    const [showInvoice, setShowInvoice] = useState(false); //state para mostar oculto el modal
    const cartItems = useCarStore((state) => state.items);
    const addToCart = useCarStore((state) => state.addToCart);
    const removeFromCart = useCarStore((state) => state.removeFromCart);
    const clearCart = useCarStore((state) => state.clearCart);

    const [product, setProduct] = useState<string>('');
    const [price, setPrice] = useState<number>(0);

    const calculateTotal = () => {
        const total = cartItems.reduce((acc, product) => acc + product.price, 0);
        return total;
    };
    return (
        <>
        <Navbar/>
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6">Carrito de Compra</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mr-2"
          />
          <input
            type="number"
            placeholder="Precio del producto"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border border-gray-300 rounded-md p-2"
          />
          <button onClick={() => addToCart({ name: product, price })} className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2">
            Agregar al carrito
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Productos en el carrito:</h2>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-300 py-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button onClick={() => removeFromCart(item)} className="text-red-500">Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <button className="bg-blue-500 text-white rounded-md px-4 py-2 mr-4">
            Calcular Total
          </button>
          <span>Total: ${calculateTotal()}</span>
        </div>
        <div>
          <button className="bg-green-500 text-white rounded-md px-4 py-2">
            Crear Factura
          </button>
        </div>
        {showInvoice && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-bg fixed inset-0 bg-black opacity-30"></div>
            <div className="modal-container bg-white rounded-lg p-4 z-50">
              <span className="close absolute top-0 right-0 p-4 cursor-pointer" onClick={() => setShowInvoice(false)}>&times;</span>
              <h2 className="text-xl font-semibold mb-2">Factura</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );

        </>
      );

}