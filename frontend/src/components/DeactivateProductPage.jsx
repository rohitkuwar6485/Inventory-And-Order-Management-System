import { useEffect, useState } from "react";
import {
  getProducts,
  deactivateProduct,
} from "../apis/productApi";

import { useNavigate } from "react-router-dom";

function DeactivateProductPage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // GET ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // TOGGLE ACTIVE/INACTIVE
  const handleToggle = async (product) => {
    try {
      await deactivateProduct(product._id);
      fetchProducts();

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => navigate("/products")}
          className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-gray-800"
        >
          ← Products
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">
        Deactivate Products
      </h1>

      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th>Name</th>
              <th>SKU</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border">

                <td className="p-2">{p.name}</td>
                <td>{p.sku}</td>

                {/* STATUS */}
                <td>
                  {p.isActive ? (
                    <span className="text-green-600 font-bold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-bold">
                      Inactive
                    </span>
                  )}
                </td>

                {/* TOGGLE BUTTON */}
                <td>

                  <label className="inline-flex items-center cursor-pointer">

                    <input
                      type="checkbox"
                      checked={p.isActive}
                      onChange={() => handleToggle(p)}
                      className="sr-only peer"
                    />

                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition">

                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>

                    </div>

                  </label>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
}

export default DeactivateProductPage;