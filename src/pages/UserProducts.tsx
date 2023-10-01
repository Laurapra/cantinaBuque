import { Navbar } from "../components/navbar";

export const UserProducts = ()=>{
    const productosConsumidos = [
        {id: 1, nombre: 'Doritos', cantidad: 2},
        {id: 2, nombre: 'Coca-Cola', cantidad: 4},
        {id: 3, nombre: 'Flips', cantidad: 10},
        {id: 4, nombre: 'Jugo', cantidad: 1},
    ];
    return(
        <div className="bg-white p-4 rounded shadow-md">
            <h1 className="text-2x1 font-semibold mb-4">Productos consumidos</h1>
            <ul>
                {productosConsumidos.map((producto) => (
                    <li key={producto.id} className="flex justify-between items-center border-b border-gray-300 py-2">
                        <div>
                            <p className="text-lg">{producto.nombre}</p>
                            <p className="text-sm text-gray-500">Cantidad: {producto.cantidad}</p>
                        </div>
                    </li>
                ) )}
            </ul>
        </div>
    )
}