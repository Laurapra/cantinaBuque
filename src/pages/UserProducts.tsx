import { Navbar } from "../components/Navbar";
import { useState, useEffect } from 'react';
import { IAllProductsResponse } from "../interfaces/api.interfaces";
import { strapiApi } from "../domain/general.api";

export const UserProducts = () => {
    const [products, setProducts] = useState<IAllProductsResponse>()
    const [loading, setLoading] = useState(false)

    const getProducts = async () => {
        setLoading(true)
        try {
            const { data } = await strapiApi.get<IAllProductsResponse>("products")
            setProducts(data)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
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
    }, [])

    // if(loading) return <>Loading</>


    return (
        <>
            <Navbar />
            <div className="bg-white p-4 rounded shadow-md">
                <h1 className="text-2x1 font-semibold mb-4">Productos consumidos</h1>
                <ul>
                    {
                        products?.data?.map((product) => (
                            <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="text-lg">{product.attributes.title}</p>
                                <p className="text-sm text-gray-500">Precio: {product.attributes.price}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}