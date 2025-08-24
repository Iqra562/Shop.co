import React  from "react";
import logo from '../../assets/images/logo.png'
import { HiOutlineShoppingBag } from "react-icons/hi2";

function Header(){
    return(

        <div className="flex justify-between items-center border-b px-6 pt-4 pb-2 mb-4" >
            <div className="flex items-center space-x-2">
                <img src={logo} alt="" className="w-10" />
                <span className="text-3xl font-bold">Shop.co</span>
            </div>
     <nav>
        <ul className="flex space-x-10 ">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li></li>
        </ul>
     </nav>
     <div className="flex items-center space-x-1   ">
        <span><HiOutlineShoppingBag />
</span>
<span>

        Login
</span>

     </div>
  </div>
)
}
export default Header;