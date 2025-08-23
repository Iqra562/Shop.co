import React  from "react";
import logo from '../../assets/images/logo.png'
function Header(){
    return(

        <div className="flex justify-between items-center border-b" >
            <div className="flex items-center">
                <img src={logo} alt="" className="w-20" />
                <span className="text-2xl font-bold">Shop.co</span>
            </div>
     <nav>
        <ul className="flex space-x-10 ">
            <li>Home</li>
            <li>ABout</li>
            <li>Conact</li>
            <li></li>
        </ul>
     </nav>
     <div>
        Login
     </div>
  </div>
)
}
export default Header;