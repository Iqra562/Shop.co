import { Outlet } from "react-router-dom";
import {Header,Footer} from '@components/layout'

export const WebLayout=()=>{
    return(
        <>
      <Header/>
      <Outlet/>
      <Footer/>
        </>
    )
}