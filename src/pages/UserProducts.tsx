import { Navbar } from "../components/Navbar";
import { useState, useEffect } from 'react';
import { IAllProductsResponse } from "../interfaces/api.interfaces";
import { strapiApi } from "../domain/general.api";
import axios from "axios";

export const UserProducts = () => {
    const [products, setProducts] = useState<IAllProductsResponse>()
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams]= useState({starDate: "", userId: ""});

    const getProducts = async () => {
        setLoading(true)
        try {
            const url= "products" + (params ? `?${new URLSearchParams(params).toString()}`: "");
            const { data } = await strapiApi.get<IAllProductsResponse>("products")
            setProducts(data)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }
    const handleSearchParamsChange= ()=> {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value});
    };
    const handleSearch = () =>{
        getProducts(searchParams);
    }

    useEffect(() => {
        getProducts()
        
        /**
         * Cuando vayas a usar la pagina para listar las compras hechas (Facturas)
         * esta seria el endpoint http://localhost:1337/api/bills?populate=*
         * y para ver la informacion de una factura especifica seria:
         * http://localhost:1337/api/bills/:id
         * Donde id seria el id de la factura
         * 
         * Debes hacer la interfaz de las consultas para que tengas el tipado
         * consejo usa la pagina quicktype.io https://app.quicktype.io/
         * pega ahi lo que te retorne el endpoint y te genera el tipado
         * 
         * tienes un ejemplo en este archivo en la funcion getProducts en la linea 10
         * 
         */
        const startDate= "2023-01-01";
        const userId= 123;
        getProducts({startDate, userId});
    }, []);

    // if(loading) return <>Loading</>


    return (
        <>
            <Navbar />
            <div className="bg-white p-4 rounded shadow-md">
                <h1 className="text-2x1 font-semibold mb-4">Productos consumidos</h1>
                <input
                        type="date"
                        name="startDate"
                        value={searchParams.startDate}
                        onChange={handleSearchParamsChange}
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                <input
                        type="date"
                        name="startDate"
                        value={searchParams.startDate}
                        onChange={handleSearchParamsChange}
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                <input
                        type="text"
                        placeholder="ID de usuario"
                        name="userId"
                        value={searchParams.userId}
                        onChange={handleSearchParamsChange}
                        className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    />
                    <button onClick={handleSearch} className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Buscar</button>
                <ul>
                    {
                        products?.data?.map((product) => (
                            <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="text-lg">{product.attributes.title}</p>
                                <p className="text-sm text-indigo-500">Precio: {product.attributes.price}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}