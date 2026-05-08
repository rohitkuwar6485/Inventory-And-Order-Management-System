import { useEffect, useState } from "react";
import {
  getAllOrders,
  cancelOrder,
  updateOrderStatus,
} from "../apis/orderApi";

function OrderTable() {
  const [orders, setOrders] = useState([]);

  // GET ALL ORDERS
  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // CANCEL ORDER
  const handleCancel = async (id) => {
    try {
      const res = await cancelOrder(id);
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  // COMPLETE ORDER
  const handleComplete = async (id) => {
    try {
      const res = await updateOrderStatus(id, "COMPLETED");
      alert(res.data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">
        All Orders
      </h1>

      <div className="bg-white p-4 rounded shadow">

        <table className="w-full border">

          <thead>
            <tr className="bg-gray-200">
              <th>Order ID</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="text-center border">

                {/* ORDER ID */}
                <td className="p-2">
                  {o._id.slice(-6)}
                </td>

                {/* PRODUCTS */}
                <td>
                  {o.products.map((p, i) => (
                    <div key={i}>
                      {p.product?.name} × {p.quantity}
                    </div>
                  ))}
                </td>

                {/* TOTAL */}
                <td>₹{o.totalAmount}</td>

                {/* STATUS */}
                <td>
                  <span
                    className={`font-bold ${
                      o.status === "COMPLETED"
                        ? "text-green-600"
                        : o.status === "CANCELLED"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="space-x-2">

                  {/* COMPLETE */}
                  {o.status === "PENDING" && (
                    <button
                      onClick={() => handleComplete(o._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Complete
                    </button>
                  )}

                  {/* CANCEL */}
                  {o.status !== "CANCELLED" &&
                    o.status !== "COMPLETED" && (
                      <button
                        onClick={() => handleCancel(o._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    )}

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default OrderTable;