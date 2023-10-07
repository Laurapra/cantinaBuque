import  { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useCartStore } from "../interfaces/carStore";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

interface Product {
  id: number;
  attributes: {
    title: string;
    price: number;
  };
  quantity: number;
}

interface Invoice {
  purchaseDate: string | null;
  TotalBill: number;
  Client: string;
  billSlug: string;
}

export const ShoppingCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cartItems = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:1337/api/products");
        if (response.ok) {
          const data = await response.json();
          const formattedProducts: Product[] = data.data.map(
            (productData: any) => ({
              id: productData.id,
              attributes: {
                title: productData.attributes.title,
                price: productData.attributes.price,
              },
              quantity: 0,
            })
          );
          setProducts(formattedProducts);
        } else {
          console.log("Error al obtener los datos de la API");
        }
      } catch (error) {
        console.log("Error al conectarse a la API", error);
      }
    }
    fetchProducts();
  }, []);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (acc, product) => acc + product.attributes.price * product.quantity,
      0
    );
    return total;
  };

  const increaseProductQuantity = (product: Product) => {
    increaseQuantity(product);
  };

  const decreaseProductQuantity = (product: Product) => {
    decreaseQuantity(product);
  };

  const createInvoice = async () => {
    try {
      const totalBill = calculateTotal();
      const client = "1"; 

      const invoiceData: Invoice = {
        purchaseDate: new Date().toISOString(),
        TotalBill: totalBill,
        Client: client,
        billSlug: `billPruebaTexto`,
      };

      const response = await fetch("http://localhost:1337/api/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get("USER_TOKEN") ?? ""}`
        },
        body: JSON.stringify({ data: invoiceData }),
      });

      if (response.ok) {
        // La factura se creó con éxito
        console.log("Factura creada con éxito");
      } else {
        console.error("Error al crear la factura");
      }
    } catch (error) {
      console.error("Error al crear la factura", error);
    }
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
                    onClick={() => {
                      addToCart({ ...product, quantity: 1 });
                      increaseProductQuantity(product);
                    }}
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
                  <span>{item.attributes.title}</span>
                  <span>${item.attributes.price}</span>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        decreaseProductQuantity(item);
                      }}
                      className="text-red-500"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => {
                        addToCart(item);
                        increaseProductQuantity(item);
                      }}
                      className="text-green-500"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="text-red-500"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <button
              onClick={clearCart}
              className="bg-red-500 text-white rounded-md px-4 py-2 mr-4"
            >
              Vaciar Carrito
            </button>
            <button
              onClick={createInvoice}
              className="bg-blue-500 text-white rounded-md px-4 py-2 mr-4"
            >
              Crear Factura
            </button>
            <span>Total: ${calculateTotal()}</span>
          </div>
          <button onClick={() => navigate("/addProduct")}>Ingresar nuevos productos</button>
        </div>
      </div>
    </>
  );
};
