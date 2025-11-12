import { AuthContext } from "../context/AuthContext";
import {AuthenticatedUserRoutes} from '@utils/util.constant.js' 
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { WebLayout } from "../layouts";
import { Cart } from "../features/public/cart";
import { OrderSummary } from "../features/public/orderSummary";
import { Orders } from "../features/public/orders";
import { useContext } from "react";
const  AuthenticatedRoutesWrapper =()=>{
const {isAuthenticated} = useContext(AuthContext);
      if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
    return <Outlet/>
}

function AuthenticatedUserRoutesApp(){
    return(
        <Routes>

      <Route element={<AuthenticatedRoutesWrapper />}>
                    <Route element={<WebLayout />}>                  
                      <Route path={AuthenticatedUserRoutes.CART} element={<Cart />} />
                      <Route path="/order-summary" element={<OrderSummary />} />
                      <Route path="/orders" element={<Orders />} />
                    </Route>
        </Route>
        </Routes>
    )
}

export default AuthenticatedUserRoutesApp;