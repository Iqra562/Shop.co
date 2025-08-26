import { Route, Routes } from "react-router-dom";
import { Signup,Login } from "./features/auth";
import  {Home} from './features/public'
import { WebLayout } from "./layouts";

export default function App() {
  return (
    <>
      
       <Routes>
        <Route element={<WebLayout/>}>

        <Route path="/" element={<Home/>} />
        </Route>
        {/* <Route element={<DashboardLayout/>}>

        <Route path="/" element={<Home/>} />
        </Route> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </>
  )
}