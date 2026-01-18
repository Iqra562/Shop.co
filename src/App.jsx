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
import { AdminRoutes, PublicRoutes } from "./utils/util.constant";
import AppRoutes from "./routes/AppRoutes";
import { VerifyOTP } from "./features/auth/VerifyOTP";

export default function App() {
  const { isAuthenticated , user} = useContext(AuthContext);
  // console.log(isAuthenticated)
  return (
    <>
         {/* <Route element={<WebLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
        </Route> */}

        <AppRoutes/>
        {!isAuthenticated && (
          <Routes>
          <Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path={PublicRoutes.VERIFYOTP} element={<VerifyOTP />} />
          </Route>
          </Routes>
        )}
     </>
  );
}
