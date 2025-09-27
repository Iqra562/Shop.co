import { useState } from "react";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { HiMiniChevronRight } from "react-icons/hi2";
import logo from "@assets/images/logo.png";
import { BiSolidTachometer } from "react-icons/bi";

import { Dropdown } from "../../common/Dropdown";
export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

 const menuItems = {
  overview: [
    {
      icon: <BiSolidTachometer className="text[#919EAB] text-xl" />,
      label: "App",
    },
    {
      icon: <BiSolidTachometer className="text-xl" />,
      label: "Profile",
    },
  ],
  management: [
    {
      icon: <BiSolidTachometer className="text-xl" />,
      label: "User",
      list: ["List", "Create", "Edit"],
    },

  ],
};


  
  return (
    <>
      <div
        className={`h-screen  text-black m-0 p-0 transition-all duration-500
        ${isCollapsed ? "w-24" : "w-72"} bor\r-[#f4f4f4]  border-r-[1px] relative flex flex-col`}
      >
        {/* Toggle Button */}

        <div className=" top-0 h-20 bg-white">
          <div
            className={`flex  ${!isCollapsed ? "px-6" : "px-1 justify-center"}  py-6  relative space-x-2  `}
          >
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1  border rounded-full absolute -right-3  z-[9999]  bg-white   `}
            >
              {isCollapsed ? (
                <HiMiniChevronRight color="#637381 " className=""/>
              ) : (
                <HiMiniChevronLeft color="#637381" />
              )}
            </button>
            <img src={logo} alt="" className="w-10 " />
            <span
              className={`ml-2 text-2xl font-extrabold uppercase whitespace-nowrap transition-all duration-500 
   ${isCollapsed ? "hidden" : "w-full overflow-hidden"}`}
            >
              Shop.co
            </span>{" "}
          </div>
        </div>
        {/* Menu */}
        <div className={`flex-1 overflow-y-scroll ${isCollapsed &&  'no-scrollbar'} `}>
        <div className={`${!isCollapsed ? "pl-6" : "px-1"}  space-y-2 `}>
            <div className="flex flex-col">
{
  Object.entries(menuItems).map(([category, items]) => {
        return(
            <>
           {!isCollapsed && (
            <span className="uppercase text-[#919EAB] font-semibold text-xs px-3 my-3">
              {category}
            </span>
          )}
            {items.map((item, index) => 
                
                    item.list ?(
        <Dropdown isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}   Icon={item.icon} List={item.list}/>

                    ):(
   <div
                key={index}
                className={`flex ${!isCollapsed ? "flex-row space-x-3" : "flex-col space-y-2"}  transition-all duration-500 items-center px-3 py-3 rounded hover:bg-gray-100 cursor-pointer mb-2     ${index === 0 && "bg-gray-100"}`}
              >
                {item.icon}
                <span className="text-[#637381] font-smibold text-xs font-semibold">
                  {item.label}
                </span>
              </div>
                    )
                
           
            )}
         
          </>
        )
    })
}
          
         

          

      
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
