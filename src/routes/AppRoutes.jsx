import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthenticatedUserRoutes from "./AuthenticatedUserRoutes";
import AdminRoutes from "./AdminRoutes";
import AdminRoutesApp from "./AdminRoutes";
import AuthenticatedUserRoutesApp from "./AuthenticatedUserRoutes";

function AppRoutes(){
    return(
        <>
             
          <AuthenticatedUserRoutesApp/>
         <PublicRoutes/>
         <AdminRoutesApp/>
         </>
     )
}

export default AppRoutes;