import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import Cookies from 'js-cookie';

export const AddProductPage = () => {
  const [productToInsert, setProductToInsert] = useState({
    title: "",
    price: 0,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProductToInsert({
      ...productToInsert,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("http://localhost:1337/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get("USER_TOKEN") ?? ""}`
      },
      body: JSON.stringify({data:productToInsert}),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Producto agregado exitosamente:", productToInsert);
          // Limpiar el formulario después de agregar el producto
          setProductToInsert({ title: "", price: 0 });
        } else {
          console.error("Error al agregar el producto: ", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Ingresar Producto</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                Título del Producto:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={productToInsert.title}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
                Precio del Producto:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productToInsert.price}
                onChange={handleInputChange}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Agregar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
