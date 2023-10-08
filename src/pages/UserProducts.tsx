import { Navbar } from "../components/Navbar";
import { useState, useEffect } from 'react';
import { Data, IAllBill, IAllBillDatum, IAllProductsResponse, IBillData, Products } from "../interfaces/api.interfaces";
import { strapiApi } from "../domain/general.api";
import { Outlet, useNavigate, useParams } from "react-router-dom";
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

        if (filteredData) {
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
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{bill.attributes.Client}</h5>
                                        <p className="mb-3 font-normal text-gray-700">$ {bill.attributes.TotalBill}</p>
                                        <p className="mb-3 font-normal text-gray-700">Cedula: {bill.attributes.docNumber} </p>
                                    </div>

                                    <button onClick={() => navigate(`/bills/${bill.id}`)}>Ver compras realizadas</button>
                                </div>
                            )
                        })
                    }
                </div>

                {/* <Outlet /> */}

            </div>
        </>
    )
}

export const BillByIdPage = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [bill, setBill] = useState<IBillData>()
    const navigate = useNavigate()

    const getBill = async () => {
        setLoading(true)
        try {
            const { data } = await strapiApi.get<IBillData>(`bills/${id}?populate=*`)
            // console.log('data', data)

            setBill(data)
        } catch (error) {
            console.log('error', error)
        }
        setLoading(false)
    }
    useEffect(() => {
        getBill()
    }, [id])

    if (loading) return <></>

    return (
        <>
            <button onClick={() => { navigate(-1) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Regresar
            </button>

            <Invoice data={bill?.data!} />
        </>
    )
}

export interface DataInvoice {
    id: number;
    attributes: DataAttributes;
}

export interface DataAttributes {
    purchaseDate: Date;
    TotalBill: number;
    Client: string;
    billSlug: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    docNumber: number;
    products: Products;
}

const Invoice = ({ data }: { data: DataInvoice }) => {
    return (
        <div className="p-8 border w-fit mx-auto mt-5 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">Factura</h1>
            <div className="mb-4">
                <strong>Número de Documento:</strong> {data?.attributes?.docNumber}
            </div>
            <div className="mb-4">
                <strong>Fecha de Compra:</strong> {`${data?.attributes?.purchaseDate}`}
            </div>
            <div className="mb-4">
                <strong>Cliente:</strong> {data?.attributes?.Client}
            </div>
            <div className="mb-4">
                <strong>Productos:</strong>
                <ul>
                    {data?.attributes?.products.data.map((product) => (
                        <li key={product.id}>
                            {product.attributes.title} - ${product.attributes.price}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mb-4">
                <strong>Total:</strong> ${data?.attributes?.TotalBill}
            </div>
        </div>
    );
};
