import React, { useEffect, useState } from "react";

type Product = {
    id: number;
    attributes: {
        title: string;
        price: number;
    };
};

export const AddProductPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProdcut, setSelectedProduct] = useState<Product | null>(null);
    const [productToInsert, setProductToInsert] = useState({
        title: "",
        price: 0,
    });
    useEffect(()=>{
        fetch("http://localhost:1337/api/products")
        .then((response)=> {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data)=>{
            setProducts(data.data);
        })
        .catch((error)=>{
            console.error("Error: ", error);
        });
    }, []);
    const handleProductSelect = (product: Product): void => {
        setSelectedProduct(product);
        setToInsert({
            title: product.attributes.title,
            price: product.attributes.price,
        });
    };
    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const {name, value } = event.target;
        setProductToInsert({ ...productToInsert, [name]: value});
    };
    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        if (selectedProdcut) {
            fetch("http://localhost:1337/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productToInsert),
            })
            .then((response) => {
                if (response.ok) {
                    console.log("Producto agregado ecitosamente: ")
                }
            })
        }
    }
};