import {BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup,Login } from "./features/auth";
import  {Home} from './features/public'
import { WebLayout,DashboardLayout } from "./layouts";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./features/admin/dashoard";
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContextProvider, { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

export default function App() {
  const {isAuthenticated} = useContext(AuthContext)
  return (
    <>
    
  
      
       <Routes>
        
        <Route element={<WebLayout/>}>
        <Route path="/" element={<Home/>} />
        </Route>
        <Route element={<DashboardLayout/>}>

        <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
        {!isAuthenticated  &&(

        <Route >
          
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
                  </Route>

        )
      }     
      </Routes>
       
  
    </>
  )
}