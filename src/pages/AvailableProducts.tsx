import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";

type Product = {
    id: number;
    attributes: {
        title: string;
        price: number;
    };
};

export const AvailableProducst = () => {
    const [products, setProducts]= useState<Product[]>([]);
    const apiUrl= 'http://localhost:1337/api/products';

    useEffect(()=> {
        async function fetchProducts() {
            try {
                const response = await fetch(apiUrl);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data.data);
                }else{
                    console.log('Error al obtener datos de la api');
                }
            }catch (error) {
                console.log('Error al conectarse a la API: ', error);
            }
        }
        fetchProducts();
    }, [apiUrl]);
    return (
        <>
        <div className="bg-white p-4 rounded shadow-md">
            <h1 className="text-2x1 font-semibold mb-4">Stock de productos disponibles:</h1>
            <ul>
                {products.map((product)=>(
                    <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                        <div>
                            <p className="text-lg">{product.attributes.title}</p>
                            <p className="text-sm text-blue-900">Precio: {product.attributes.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </>
    )
}