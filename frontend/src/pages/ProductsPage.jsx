import { useNavigate } from "react-router-dom";

function ProductsPage() {
  const navigate = useNavigate();

  const productModules = [
    {
      title: "Add New Product",

      desc: "Create a new inventory product",
      color: "bg-blue-500",
      path: "/products/create",
    },
    {
      title: "Get All Products / Update Product",
      desc: "View all available products",
      color: "bg-green-500",
      path: "/products/list",
    },
    {
      title: "Deactivate Product",
      desc: "Disable product from inventory",
      color: "bg-red-500",
      path: "/products/deactivate",
    },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      {/* TOP RIGHT BUTTON */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center">
        Products Management Module
      </h1>

      {/* API MODULE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {productModules.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className={`${item.color} text-white p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition duration-300`}
          >
            <h2 className="text-2xl font-bold mb-3">
              {item.title}
            </h2>


            <p className="text-md">
              {item.desc}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}

export default ProductsPage;