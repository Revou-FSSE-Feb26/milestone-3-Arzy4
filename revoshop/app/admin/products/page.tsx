"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

type PlatziProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
};

export default function Products() {
  const [products, setProducts] = useState<PlatziProduct[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<PlatziProduct | null>(
    null
  );

  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<PlatziProduct | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
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
      price: Number(price),
      description,
      categoryId: Number(category),
      images: [image],
    };

    const response = await fetch("/api/products", {
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

  function handleOpenEdit(product: PlatziProduct) {
    setEditingProduct(product);
    setEditTitle(product.title);
    setEditCategory(String(product.category.id));
    setEditPrice(String(product.price));
    setEditImage(product.images?.[0] || "");
    setEditDescription(product.description);
    setIsEditOpen(true);
  }

  function handleCloseEdit() {
    setIsEditOpen(false);
    setEditingProduct(null);
  }

  async function handleUpdateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!editingProduct) return;

    if (!editTitle || !editCategory || Number(editPrice) <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    const updatedProduct = {
      title: editTitle,
      price: Number(editPrice),
      categoryId: Number(editCategory),
      images: [editImage],
      description: editDescription,
    };

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${editingProduct.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Failed to update product.");
      return;
    }

    const data = await response.json();

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              title: data.title,
              price: data.price,
              description: data.description,
              category: data.category || product.category,
            }
          : product
      )
    );

    handleCloseEdit();
  }

  async function handleDeleteProduct(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Failed to delete product.");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );

    alert("Product deleted successfully!");
  }

  function handleOpenDelete(product: PlatziProduct) {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  }

  function handleCloseDelete() {
    setDeletingProduct(null);
    setIsDeleteOpen(false);
  }
  
  async function handleConfirmDelete() {
    if (!deletingProduct) return;

    const response = await fetch(
      `https://api.escuelajs.co/api/v1/products/${deletingProduct.id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      alert("Failed to delete product.");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== deletingProduct.id)
    );

    handleCloseDelete();
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
          className="max-w-2xl mx-auto bg-zinc-900 p-6 rounded-2xl space-y-4 mb-10"
        >
          <input
            type="text"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Category ID, example: 2 for Electronics"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-white rounded-lg text-white"
          />

          <input
            type="text"
            placeholder="Product image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-3 border border-white rounded-lg text-white"
          />

          <textarea
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-white rounded-lg text-white"
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
              <th className="p-4 text-center">Image</th>
              <th className="p-4 text-center">Title</th>
              <th className="p-4 text-center">Category</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              const productImage =
                product.images?.[0]?.startsWith("https://")
                  ? product.images[0]
                  : "/placeholder.png";

              return (
                <tr key={product.id} className="border-t border-zinc-600">
                  <td className="p-4 text-center">
                    <img
                      src={productImage}
                      alt={product.title}
                      className="w-16 h-16 object-contain mx-auto"
                    />
                  </td>

                  <td className="p-4 text-center">{product.title}</td>

                  <td className="p-4 text-center">
                    {product.category?.name || "No Category"}
                  </td>

                  <td className="p-4 text-center">${product.price}</td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg mr-2"
                    >
                      Edit
                    </button>

                    <button
                    onClick={() => handleOpenDelete(product)} 
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {isEditOpen && editingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <form
            onSubmit={handleUpdateProduct}
            className="bg-zinc-900 w-full max-w-2xl p-6 rounded-2xl space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">
              Edit Product
            </h2>

            <input
              type="text"
              placeholder="Product title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-3 border border-white rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Product price"
              value={editPrice}
              onChange={(e) => setEditPrice(e.target.value)}
              className="w-full p-3 border border-white rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Category ID"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className="w-full p-3 border border-white rounded-lg text-white"
            />

            <textarea
              placeholder="Product description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-3 border border-white rounded-lg text-white"
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl font-bold"
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleCloseEdit}
                className="w-full bg-zinc-600 hover:bg-zinc-700 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isDeleteOpen && deletingProduct && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 w-full max-w-md p-6 rounded-2xl text-center space-y-6">
            <h2 className="text-2xl font-bold text-red-400">
              Delete Product
            </h2>

            <p className="text-zinc-300">
              Are you sure you want to delete{" "}
              <span className="font-bold text-white">
                {deletingProduct.title}
              </span>
              ?
            </p>

            <div className="flex gap-4">
              <button
                onClick={handleConfirmDelete}
                className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-bold"
              >
                Yes, Delete
              </button>

              <button
                onClick={handleCloseDelete}
                className="w-full bg-zinc-600 hover:bg-zinc-700 py-3 rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}