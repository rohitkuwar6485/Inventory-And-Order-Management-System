import { useState } from "react";
import { createProduct } from "../apis/productApi.js";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createProduct(form);

      alert(res.message);

      setForm({
        name: "",
        sku: "",
        price: "",
        stock: "",
      });

      navigate("/products");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 p-4">
      {/* TOP RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>
      {/* FORM CENTER */}
      <div className="flex justify-center items-center flex-1">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow w-96"
        >

          <h1 className="text-2xl font-bold mb-4 text-center">
            Create Product
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border w-full p-2 mb-3"
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border w-full p-2 mb-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border w-full p-2 mb-3"
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border w-full p-2 mb-3"
          />

          <button className="bg-blue-500 text-white w-full p-2 rounded">
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}

export default ProductForm;