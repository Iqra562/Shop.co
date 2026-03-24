import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { Navbar } from "../../components/layout/Navbar";

export const DashboardLayout=()=>{
    return(
    <div className="flex h- overflow-hidden">
<div className="">

        <Sidebar />
</div>
<div className="w-full h-screen bg-gray-100 overflow-y-auto">

        <Navbar/>

      <Outlet/>
</div>
        </div>
    )
}