import axiosInstance from "../services/axiosInstance";

// CREATE ORDER
export const createOrder = (data) => {
  return axiosInstance.post("/orders", data);
};

// GET ALL ORDERS
export const getAllOrders = () => {
  return axiosInstance.get("/orders");
};

// GET SINGLE ORDER
export const getSingleOrder = (id) => {
  return axiosInstance.get(`/orders/${id}`);
};

// UPDATE ORDER STATUS
export const updateOrderStatus = (id, status) => {
  return axiosInstance.patch(`/orders/${id}/status`, { status });
};

// CANCEL ORDER
export const cancelOrder = (id) => {
  return axiosInstance.patch(`/orders/${id}/cancel`);
};