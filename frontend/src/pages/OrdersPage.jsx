import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const navigate = useNavigate();

  const orderModules = [
    {
      title: "Create New Order",
      desc: "Place a customer order with products",
      color: "bg-blue-500",
      path: "/orders/create",
    },
    {
      title: "All Orders",
      desc: "View all customer orders",
      color: "bg-green-500",
      path: "/orders/list",
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-8 text-center">
        Orders Management Module
      </h1>

      {/* ORDER API CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {orderModules.map((item, index) => (
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

export default OrdersPage;