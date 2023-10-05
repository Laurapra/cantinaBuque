import { Navbar } from "../components/Navbar"

export const HomePage = () => {
    return(
        <>
        <Navbar/>
            <div className="bg-white bg-opacity-90 p-4 rounded-md shadow-md">
                <h1 className="text-4x1 font-bold mb-4">Cantina del Buque</h1>
                <p className="text-lg">¡Bienvenidos a nuestra cantina! Servimos deliciosas comidas y bebidas para satisfacer tus antojos.</p>
                <p className="text-lg mt-4">Horario de atención: Depende de la temporada</p>
                <p className="text-lg">Disfruta de nuestro servicio.</p>
            </div>
        </>
    )
}