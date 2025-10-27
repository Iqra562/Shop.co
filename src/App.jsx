import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup, Login } from "./features/auth";
import { Home } from "./features/public";
import { WebLayout, DashboardLayout } from "./layouts";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./features/admin/dashoard";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { Products } from "./features/public/products";
import { ProductDetails } from "./features/public/productDetails";
import { Cart } from "./features/public/cart";
import { OrderSummary } from "./features/public/orderSummary";
import { Orders } from "./features/public/orders";

export default function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {!isAuthenticated && (
          <Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        )}
      </Routes>
    </>
  );
}
