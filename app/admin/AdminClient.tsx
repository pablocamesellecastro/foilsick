"use client";

import { useState } from "react";
import { supabase } from "@/lib/server/supabaseClient";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  created_at: string;
  image: string;
  size: string;
  genre: string;
  audio: string;
  display_index: number;
  image_path: string;
}

interface Props {
  products: Product[];
}

export default function AdminClient({ products }: Props) {
  const [sortedProducts, setSortedProducts] = useState<Product[]>(products);
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [Size, setSize] = useState("");
  const [Genre, setGenre] = useState("");
  const [Audio, setAudio] = useState("");
  const [DisplayIndex, setDisplayIndex] = useState("");
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const deleteProduct = async (id: string, image_path: string) => {
    const { error: storageError } = await supabase.storage
      .from("products-images")
      .remove([image_path]);

    if (storageError) {
      console.error("Error deleting image:", storageError.message);
      return;
    }

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error("Error deleting product:", error.message);
      return;
    }

    setSortedProducts((prev) => prev.filter((product) => product.id !== id));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let sorted: Product[] = [];

    if (value === "asc") {
      sorted = [...products].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    } else if (value === "desc") {
      sorted = [...products].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else {
      sorted = [...products];
    }

    setSortedProducts(sorted);
  };

  const uploadImage = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("products-images")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      return null;
    }

    const { data } = supabase.storage
      .from("products-images")
      .getPublicUrl(fileName);

    return { imageUrl: data.publicUrl, imagePath: fileName };
  };

  const createProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return console.log("No image selected");
    if (!zipFile) return console.log("No zip selected");

    const uploadData = await uploadImage(file);
    if (!uploadData) return;

    const { imageUrl, imagePath } = uploadData;

    const zipFileName = `${Date.now()}-${zipFile.name}`;
    const { error: zipError } = await supabase.storage
      .from("products")
      .upload(zipFileName, zipFile);

    if (zipError) {
      console.error("Error uploading zip:", zipError.message);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        name: Name,
        description: Description,
        price: parseFloat(Price),
        image: imageUrl,
        size: Size,
        genre: Genre,
        audio: Audio,
        display_index: parseInt(DisplayIndex),
        image_path: imagePath,
        file_path: zipFileName,
      })
      .select();

    if (error) {
      console.error(error);
      return;
    }

    console.log("Product created", data);
  };

  const replaceImage = async (file: File, oldImagePath: string) => {
    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("products-images")
      .upload(fileName, file);

    if (uploadError) {
      console.error("Error uploading new image:", uploadError.message);
      return null;
    }

    const { error: deleteError } = await supabase.storage
      .from("products-images")
      .remove([oldImagePath]);

    if (deleteError) {
      console.warn("No se pudo borrar la imagen antigua:", deleteError.message);
    }

    const { data } = supabase.storage
      .from("products-images")
      .getPublicUrl(fileName);

    return { imageUrl: data.publicUrl, imagePath: fileName };
  };

  const updateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingProduct) return;

    let imageUrl = editingProduct.image;
    let imagePath = editingProduct.image_path;

    if (newImageFile) {
      const result = await replaceImage(
        newImageFile,
        editingProduct.image_path,
      );

      if (!result) return;
      imageUrl = result.imageUrl;
      imagePath = result.imagePath;
    }

    const { error } = await supabase
      .from("products")
      .update({
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        size: editingProduct.size,
        genre: editingProduct.genre,
        audio: editingProduct.audio,
        display_index: editingProduct.display_index,
        image: imageUrl,
        image_path: imagePath,
      })
      .eq("id", editingProduct.id);

    if (error) {
      console.error("Error updating product:", error.message);
      return;
    }

    const updatedProduct = {
      ...editingProduct,
      image: imageUrl,
      image_path: imagePath,
    };

    setSortedProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p)),
    );

    setEditingProduct(null);
    setNewImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-black">Admin Dashboard</h1>
        <p className="text-black mt-2">
          Welcome back! Manage your store inventory and products here.
        </p>
      </header>

      <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-10">
        <h2 className="text-xl font-semibold mb-6 text-black uppercase tracking-wider">
          Create New Product
        </h2>

        <form
          onSubmit={createProduct}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
          <input
            value={Size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="Size"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            value={Genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Genre"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            value={Audio}
            onChange={(e) => setAudio(e.target.value)}
            placeholder="Audio (Soundcloud Link)"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            value={DisplayIndex}
            onChange={(e) => setDisplayIndex(e.target.value)}
            placeholder="Display Index"
            className="border border-gray-300 rounded-lg p-3"
          />
          <input
            type="file"
            accept=".zip"
            onChange={(e) => setZipFile(e.target.files?.[0] || null)}
          />

          <button type="submit">Create Product</button>
        </form>
      </section>

      <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-semibold text-black">
            Product Inventory
          </h2>
          <select
            id="sort"
            className="border border-gray-300 px-4 py-2 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSortChange}
          >
            <option value="">Ordenar por fecha</option>
            <option value="asc">Más antiguo primero</option>
            <option value="desc">Más reciente primero</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                {["Product", "Price", "Description", "Date"].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-black font-semibold">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 text-black max-w-xs truncate">
                    {product.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {product.created_at.split("T")[0].replaceAll("-", "/")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() =>
                        deleteProduct(product.id, product.image_path)
                      }
                      className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Editar producto
            </h2>

            <form onSubmit={updateProduct} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-black font-medium">
                  Imagen del producto
                </label>

                <img
                  src={imagePreview || editingProduct.image}
                  alt={editingProduct.name}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setNewImageFile(selectedFile);

                    if (selectedFile) {
                      if (imagePreview) URL.revokeObjectURL(imagePreview);
                      setImagePreview(URL.createObjectURL(selectedFile));
                    }
                  }}
                />
              </div>

              <input
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, name: e.target.value })
                }
                placeholder="Name"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="number"
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Price"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                value={editingProduct.size}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, size: e.target.value })
                }
                placeholder="Size"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                value={editingProduct.genre}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    genre: e.target.value,
                  })
                }
                placeholder="Genre"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                value={editingProduct.audio}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    audio: e.target.value,
                  })
                }
                placeholder="Audio (Soundcloud Link)"
                className="border border-gray-300 rounded-lg p-3"
              />
              <input
                type="number"
                value={editingProduct.display_index}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    display_index: parseInt(e.target.value),
                  })
                }
                placeholder="Display Index"
                className="border border-gray-300 rounded-lg p-3"
              />

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setNewImageFile(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-black"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-black text-white font-bold"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
