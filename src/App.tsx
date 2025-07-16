import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import { AuthProvider } from "./contexts/auth";
import PrivateRoute from "./lib/private-route";
import { CartProvider } from "./contexts/cart";
import RegisterPage from "./pages/Register";
import Header from "./components/Header";
import TransferPointsPage from "./pages/Transfer";
import AdminRoute from "@/lib/admin-route";
import AdminDashboard from "@/pages/Dashboard";
import CreateProduct from "@/pages/CreateProduct";
import UpdateProduct from "@/pages/UpdateProduct";
import RestorePage from "./pages/RestorePage";
import MyOrdersPage from "./pages/MyOrder";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/favorite"
              element={
                <PrivateRoute>
                  <Favorite />
                </PrivateRoute>
              }
            />
            <Route
              path="/transfer"
              element={
                <PrivateRoute>
                  <TransferPointsPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/my-orders"
              element={
                <PrivateRoute>
                  <MyOrdersPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/create"
              element={
                <AdminRoute>
                  <CreateProduct />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/update/:productId"
              element={
                <AdminRoute>
                  <UpdateProduct />
                </AdminRoute>
              }
            />
            <Route path="/admin/restore" element={<RestorePage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
