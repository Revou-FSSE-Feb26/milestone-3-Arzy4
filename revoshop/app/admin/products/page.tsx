"use client"

import { useEffect, useState } from "react"
import Navbar from "../../components/navbar"
import { Product } from "../../context/cartContext"

export default function Products() {
    const [products, setProducts] = useState<Product[]>([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")


    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch(`https://fakestoreapi.com/products/`);
            const data = await response.json();

            setProducts(data);
        }

        fetchProducts();
    }, []);

    async function handleAddProduct(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!title || !description || !image || !category || Number(price) <= 0) {
            alert("Please fill all fields correctly.");
            return;
        }

        const newProduct = {
            title,
            description,
            image,
            category,
            price: Number(price),
        };

        const response = await fetch(`https://fakestoreapi.com/products/`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            alert("Failed to add product.");
            return;
        }

        const createdProduct = await response.json();

        setProducts((prevProducts) => [...prevProducts, createdProduct]);

        setTitle("");
        setDescription("");
        setImage("");
        setCategory("");
        setPrice("");
    }
    
    return (
        <main className="min-h-screen bg-zinc-800 text-white">
      <Navbar />

      <section className="p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Admin Product Management
        </h1>

        <form 
            onSubmit={handleAddProduct}
            className="max-w-2xl mx-auto bg-zinc-900 p-6 rounded-2xl space-y-4 mb-10">
          <input
            type="text"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border-1 border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border-1 border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Product category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border-1 border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Product image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border-1 border-white rounded-lg text-white"
          />

          <textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-1 border-white rounded-lg text-white"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl font-bold duration-300"
          >
            Add Product
          </button>
        </form>

        <table className="w-full border border-zinc-600 table-fixed">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-center">Title</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-zinc-600">
                <td className="p-4 text-center">{product.title}</td>
                <td className="p-4 text-center">{product.category}</td>
                <td className="p-4 text-center">${product.price}</td>
                <td className="p-4 text-center">
                  <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2">
                    Edit
                  </button>

                  <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
    );

}