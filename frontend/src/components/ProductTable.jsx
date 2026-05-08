import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../apis/productApi";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  // GET ALL PRODUCTS
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts();

      setProducts(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // OPEN PREVIEW MODAL
  const handlePreview = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TOP RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back 
        </button>
      </div>
        
      <h1 className="text-2xl font-bold mb-6">
        All Products
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-blue-500 mb-4">
          Loading products...
        </p>
      )}

      {/* TABLE */}
      <div className="bg-white p-4 rounded shadow overflow-x-auto">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Preview</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="text-center border">

                <td className="p-2">{p.name}</td>
                <td>{p.sku}</td>
                <td>₹{p.price}</td>
                <td>{p.stock}</td>

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

                {/* PREVIEW */}
                <td>
                  <button
                    onClick={() => handlePreview(p)}
                    className="text-blue-600 text-lg"
                  >
                    <FaEye />
                  </button>
                </td>

                {/* EDIT */}
                <td>
                  <button
                    onClick={() => navigate(`/products/edit/${p._id}`)}
                    className="text-green-600 font-bold"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* PREVIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-6 rounded w-96 relative">

            {/* CLOSE BUTTON */}
            <button
              className="absolute top-2 right-2 text-red-500"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">
              Product Preview
            </h2>

            <p><b>Name:</b> {selectedProduct.name}</p>
            <p><b>SKU:</b> {selectedProduct.sku}</p>
            <p><b>Price:</b> ₹{selectedProduct.price}</p>
            <p><b>Stock:</b> {selectedProduct.stock}</p>

            <p>
              <b>Status:</b>{" "}
              {selectedProduct.isActive ? "Active" : "Inactive"}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProductTable;