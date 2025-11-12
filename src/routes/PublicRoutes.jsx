import { Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Home } from "../features/public";
import { Products } from "../features/public/products";
import { ProductDetails } from "../features/public/productDetails";
import { WebLayout } from "../layouts";

function PublicRoutes() {
  return (
    <Routes>
      <Route element={<WebLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default PublicRoutes;
