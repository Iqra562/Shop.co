import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { Navbar } from "../../components/layout/Navbar";

export const DashboardLayout=()=>{
    return(
        <div className="flex">
<div className="">

        <Sidebar />
</div>
<div className="w-full">

        <Navbar/>
      <Outlet/>
</div>
        </div>
    )
}