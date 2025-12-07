import { AuthContext } from "../context/AuthContext";
import {AuthenticatedUserRoutes} from '@utils/util.constant.js' 
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { WebLayout } from "../layouts";
import { Cart } from "../features/public/cart";
import { OrderSummary } from "../features/public/orderSummary";
import { Orders } from "../features/public/orders";
import { useContext } from "react";
import {SubLayout} from "../layouts";
import Profile from "../features/public/profile";
import AddressBook from "../features/public/addressBook";
import Wishlist from "../features/public/wishlist";
import EditAddressBook from "../features/public/profile/components/editaddressBook";
import EditProfileInfo from "../features/public/profile/components/editProfileInfo";
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
                      <Route path={AuthenticatedUserRoutes.ORDERSUMMARY} element={<OrderSummary />} />
                      <Route element={<SubLayout/>}>
                      <Route path={AuthenticatedUserRoutes.ORDERS} element={<Orders />} />
                      <Route path={AuthenticatedUserRoutes.PROFILE} element={<Profile />} />
                      <Route path={AuthenticatedUserRoutes.ADDRESSBOOK} element={<AddressBook/>} />
                      <Route path={AuthenticatedUserRoutes.WISHLIST} element={<Wishlist/>} />
                      <Route path={AuthenticatedUserRoutes.EDITADDRESS} element={<EditAddressBook/>} />
                      <Route path={AuthenticatedUserRoutes.ADDADDRESS} element={<EditAddressBook/>} />
                      <Route path={AuthenticatedUserRoutes.EDITPROFILE} element={<EditProfileInfo/>} />
                      </Route>
                    </Route>
        </Route>
        </Routes>
    )
}

export default AuthenticatedUserRoutesApp;