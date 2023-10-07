import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaFileInvoiceDollar, FaCashRegister } from 'react-icons/fa';
import { useShallowGeneralStore } from '../store/general.store';
import { logout } from '../store/general.actions';

export const Navbar = () => {
    const [userInfo] = useShallowGeneralStore((state) => ([state.userInfo]))
    const navigate = useNavigate()

    const goToLogin = () => {
        navigate("/auth")
    }

    const closeSession = () => {
        logout()
    }

    return (
        <>
        <nav className='bg-indigo-200 py-4 px-2 flex justify-between items-center'>
            <ul className='flex space-x-4'>
                <li>
                    <Link to= "/availableProducts" className='text-black flex items-center'>
                    <FaShoppingCart className="mr-2"/> Productos
                    </Link>
                </li>
                <li>
                    <Link to= "/bills" className='text-black flex items-center'>
                    <FaFileInvoiceDollar className="mr-2"/> Facturas
                    </Link>
                </li>
                <li>
                    <Link to= "/ventas" className='text-black flex items-center'>
                        <FaCashRegister className="mr-2"/> Ventas
                    </Link>
                </li>
            </ul>

            <div>
                {
                    userInfo ? (
                        <div>
                            <p>{userInfo.user.username}</p>
                            <button onClick={closeSession}>Cerrar Sesión</button>
                        </div>
                    ) : (
                        <button onClick={goToLogin}>Login</button>
                    )
                }
            </div>
        </nav>
        </>
    )
}