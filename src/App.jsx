import { Route, Routes } from "react-router-dom";
import { Signup,Login } from "./features/auth";
import  {Home} from './features/public'
import { WebLayout,DashboardLayout } from "./layouts";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./features/admin/dashoard";
import './App.css'
export default function App() {
  return (
    <>
      
       <Routes>
        <Route element={<WebLayout/>}>

        <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<DashboardLayout/>}>

        <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      
    </>
  )
}