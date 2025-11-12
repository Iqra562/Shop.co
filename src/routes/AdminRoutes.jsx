import { DashboardLayout, WebLayout } from "../layouts";
import { AuthContext } from "../context/AuthContext";
import { Dashboard } from "../features/admin/dashoard";
import { AdminRoutes } from "../utils/util.constant";
import {Routes, Route, Outlet } from "react-router-dom";
import { useContext } from "react";
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
        </Route> 
        </Route>
        </Routes>
    )
}
export default  AdminRoutesApp;