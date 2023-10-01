import { Link } from 'react-router-dom';
import { FaShoppingCart, FaFileInvoiceDollar, FaCashRegister } from 'react-icons/fa';
export const Navbar = () => {
    
    return (
        <>
        <nav className='bg-indigo-200 p-4'>
            <ul className='flex space-x-4'>
                <li>
                    <Link to= "/mis-pedidos" className='text-black flex items-center'>
                    <FaShoppingCart className="mr-2"/> Productos
                    </Link>
                </li>
                <li>
                    <Link to= "/todos-los-pedidos" className='text-black flex items-center'>
                    <FaFileInvoiceDollar className="mr-2"/> Facturas
                    </Link>
                </li>
                <li>
                    <Link to= "/ventas" className='text-black flex items-center'>
                        <FaCashRegister className="mr-2"/> Ventas
                    </Link>
                </li>
            </ul>
        </nav>
        </>
    )
}