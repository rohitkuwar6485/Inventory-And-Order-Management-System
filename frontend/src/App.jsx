import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import OrdersPage from "./pages/OrdersPage";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import EditProduct from "./components/EditProduct";
import DeactivateProductPage from "./components/DeactivateProductPage";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";

function App() {
  const token = localStorage.getItem("token");

  // Protected Route wrapper
  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/" />;
  };

  // Public Route wrapper
  const PublicRoute = ({ children }) => {
    return !token ? children : <Navigate to="/dashboard" />;
  };

  return (
    <Routes>

      {/* LOGIN / REGISTER */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* PRODUCTS */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      {/* ORDERS */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />

      {/* CREATE PRODUCT */}
      <Route
        path="/products/create"
        element={
          <ProtectedRoute>
            <ProductForm />
          </ProtectedRoute>
        }
      />

      {/* Get All Products */}
      <Route
        path="/products/list"
        element={
          <ProtectedRoute>
            <ProductTable />
          </ProtectedRoute>
        }
      />

      {/* Edit Product */}
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />

      {/* Deactivate Product */}
      <Route
        path="/products/deactivate"
        element={
          <ProtectedRoute>
            <DeactivateProductPage />
          </ProtectedRoute>
        }
      />

      {/* Order Creation */}
      <Route
        path="/orders/create"
        element={
          <ProtectedRoute>
            <OrderForm />
          </ProtectedRoute>
        }
      />

      {/* Order List */}
      <Route
        path="/orders/list"
        element={
          <ProtectedRoute>
            <OrderTable />
          </ProtectedRoute>
        }
      />

      </Routes>
  );
}

export default App;