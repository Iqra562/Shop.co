import {BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup,Login } from "./features/auth";
import  {Home} from './features/public'
import { WebLayout,DashboardLayout } from "./layouts";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./features/admin/dashoard";
import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
defaultOptions : {
  queries : {
    refetchOnwindowFocus : false,
    refetchOnmount:false,
    refetchOnReconnect : false,
    retry: 0,
    staleTime : 5 * 1000,
  },
},
});
export default function App() {
  
  return (
    <>
     <QueryClientProvider client={queryClient}>
      
        <BrowserRouter>
      
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
           </BrowserRouter>
       
     </QueryClientProvider>
    </>
  )
}