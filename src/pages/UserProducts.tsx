import { Navbar } from "../components/Navbar";
import { useState, useEffect } from 'react';
import { IAllBill, IAllProductsResponse } from "../interfaces/api.interfaces";
import { strapiApi } from "../domain/general.api";
import { useNavigate, useParams } from "react-router-dom";

export const UserProducts = () => {
    // const [products, setProducts] = useState<IAllProductsResponse>()
    const [loading, setLoading] = useState(false)
    const [bills, setBills] = useState<IAllBill>()
    const navigate = useNavigate()


    // const getProducts = async () => {
    //     setLoading(true)
    //     try {
    //         const { data } = await strapiApi.get<IAllProductsResponse>("products")
    //         setProducts(data)
    //     } catch (error) {
    //         console.log('error', error)
    //     }
    //     setLoading(false)
    // }

    const getBills = async () => {
        setLoading(true)
        try {
            const { data } = await strapiApi.get<IAllBill>("bills?populate=*")
            setBills(data)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }

    useEffect(() => {
        // getProducts()

        getBills()

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
                <h1 className="text-2x1 font-semibold mb-4">Clientes</h1>
                {/* <ul>
                    {
                        products?.data?.map((product) => (
                            <li key={product.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                                <p className="text-lg">{product.attributes.title}</p>
                                <p className="text-sm text-gray-500">Precio: {product.attributes.price}</p>
                            </li>
                        ))
                    }
                </ul> */}


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    bills?.data?.map((bill) => {

                        return (
                            <div key={bill.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                                {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="" alt="" /> */}
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{ bill.attributes.Client }</h5>
                                    <p className="mb-3 font-normal text-gray-700">$ { bill.attributes.TotalBill }</p>
                                    <p className="mb-3 font-normal text-gray-700">Cedula: { bill.attributes.identification } </p>
                                </div>

                                <button onClick={() => navigate("132213")}>Ver compras realizadas</button>
                            </div>
                        )
                    })
                }
                </div>

            </div>
        </>
    )
}

export const BillByIdPage = () => {
    const { id } = useParams()
    console.log('id', id)
    return (
        <>
            <h2 className="text-red-500">Otra page</h2>
        </>
    )
}