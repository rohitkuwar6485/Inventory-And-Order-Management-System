import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    stock: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);

  // GET SINGLE PRODUCT
  const fetchProduct = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(`/products/${id}`);

      setForm(res.data.data);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axiosInstance.put(`/products/${id}`, form);

      alert("Product Updated Successfully");

      navigate("/products/list"); // back to table
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96"
      >

        <h1 className="text-xl font-bold mb-4">
          Edit Product
        </h1>

        {/* NAME */}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
          placeholder="Name"
        />

        {/* SKU */}
        <input
          name="sku"
          value={form.sku}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
          placeholder="SKU"
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
          placeholder="Price"
          type="number"
        />

        {/* STOCK */}
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="border w-full p-2 mb-2"
          placeholder="Stock"
          type="number"
        />

        <button className="bg-green-600 text-white w-full p-2">
          Update Product
        </button>

      </form>

    </div>
  );
}

export default EditProduct;