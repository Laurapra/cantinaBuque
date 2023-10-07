import { Navbar } from "../components/Navbar";
import { useState, useEffect } from 'react';
import { IAllBill, IAllBillDatum, IAllProductsResponse } from "../interfaces/api.interfaces";
import { strapiApi } from "../domain/general.api";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";

export const UserProducts = () => {
    // const [products, setProducts] = useState<IAllProductsResponse>()
    const [loading, setLoading] = useState(false)
    const [bills, setBills] = useState<IAllBill>()
    const [filteredBills, setFilteredBills] = useState<IAllBillDatum[]>([])
    const navigate = useNavigate()

    const billsToShow = filteredBills.length == 0 ? bills?.data : filteredBills

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

    const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldData = event.target.value
        const filteredData = bills?.data.filter((bill) => bill.attributes.docNumber.toString().includes(`${fieldData}`))
        
        if(filteredData) {
            setFilteredBills(filteredData)
        } else {
            setFilteredBills([])
        }

    }

    useEffect(() => {
        // getProducts()

        getBills()

    }, [])

    // if(loading) return <>Loading</>


    return (
        <>
            <Navbar />
            <div className="bg-white p-4 rounded shadow-md">
                <h1 className="text-2x1 font-semibold mb-4">Clientes</h1>
                <InputText onChange={onChangeFilter} className="mb-5" keyfilter="int" placeholder="Buscar por cedula" />
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
                    billsToShow?.map((bill) => {

                        return (
                            <div key={bill.id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                                {/* <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="" alt="" /> */}
                                <div className="flex flex-col justify-between p-4 leading-normal">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{ bill.attributes.Client }</h5>
                                    <p className="mb-3 font-normal text-gray-700">$ { bill.attributes.TotalBill }</p>
                                    <p className="mb-3 font-normal text-gray-700">Cedula: { bill.attributes.docNumber } </p>
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