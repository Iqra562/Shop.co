import { DashboardLayout, WebLayout } from "../layouts";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../features/admin/dashoard";
import { AdminRoutes } from "../utils/util.constant";
import {Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
import FetchProducts from "../features/admin/products/FetchProducts";
import AddEditProduct from "../features/admin/products/AddEditProduct";
import AddEditCategory from "../features/admin/category/AddEditCategory";
import FetchCategory from "../features/admin/category/FetchCategory";
const AdminRoutesWrapper = ()=>{
    const {isAuthenticated , isAdmin } = useContext(AuthContext)
         if(!isAdmin) return;
        return <Outlet/>
    
}

function AdminRoutesApp(){
    return(
        <Routes>

      <Route element={<AdminRoutesWrapper />}>

           <Route element={<DashboardLayout />}>
          <Route path={AdminRoutes.DASHBOARD} element={<Dashboard />} />
          <Route path={AdminRoutes.FETCHPRODUCTS} element={<FetchProducts />} />
          <Route path={AdminRoutes.PRODUCT_ADD} element={<AddEditProduct />} />
          <Route path={`${AdminRoutes.PRODUCT_EDIT}/:id`} element={<AddEditProduct />} />
          <Route path={AdminRoutes.FETCHCATEGORY} element={<FetchCategory />} />
          <Route path={AdminRoutes.CATEGORY_ADD} element={<AddEditCategory />} />
          <Route path={AdminRoutes.CATEGORY_EDIT} element={<AddEditCategory />} />
        </Route> 
        </Route>
        </Routes>
    ) 
}
export default  AdminRoutesApp;