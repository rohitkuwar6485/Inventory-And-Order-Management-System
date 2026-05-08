import axiosInstance from "../services/axiosInstance.js";

// CREATE PRODUCT
export const createProduct = async (data) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

// GET ALL PRODUCTS
export const getProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data;
};

// GET PRODUCT BY ID
export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

// UPDATE PRODUCT
export const updateProduct = async (id, data) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};

// DEACTIVATE/ACTIVATE PRODUCT
export const deactivateProduct = async (id) => {
  const res = await axiosInstance.patch(`/products/${id}/deactivate`);
  return res.data;
};