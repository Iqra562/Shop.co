import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { HiMiniChevronRight } from "react-icons/hi2";
import logo from '@assets/images/logo.png'
import { BiSolidTachometer } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Button, ConfigProvider, Flex, Popover } from 'antd';

import svg from '@assets/images/icon.svg'
export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "App" },
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Profile" },
        // { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        // { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        // { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
        { icon: <BiSolidTachometer className="text[#919EAB] text-xl" />, label: "Settings" },
    ];
    const content = (
        <div>
            <p className="hover:bg-red-900">Content</p>
            <p>Content</p>
        </div>
    );
    return (
        <>
            <div
                className={`h-screen   text-black m-0 p-0 transition-all duration-500
        ${isCollapsed ? "w-24" : "w-72"} border-[#f4f4f4]  border-r-[1px] relative`}
            >
                {/* Toggle Button */}


                <div className="sticky top-0 h-20">
                    <div className={`flex  ${!isCollapsed ? 'px-6' : 'px-1 justify-center'}  py-6  relative space-x-2  `} >
                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className={`p-1 border[#f4f4f4] border rounded-full absolute -right-3 bg-white  `}
                        >
                            {isCollapsed ? <HiMiniChevronRight color="#637381" /> : <HiMiniChevronLeft color="#637381" />}
                        </button>
                        <img src={logo} alt="" className="w-10 " />
                        <span
                            className={`ml-2 text-2xl font-extrabold uppercase whitespace-nowrap transition-all duration-500 
   ${isCollapsed ? "hidden" : "w-full overflow-hidden"}`}
                        >
                            Shop.co
                        </span>                    </div>
                </div>
                {/* Menu */}
                <div className={`${!isCollapsed ? 'px-6' : 'px-1'}  space-y-2 `}>
                    {!isCollapsed && <span className="uppercase text-[#919EAB] font-semibold text-xs px-3">overview</span>}
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                className={`flex ${!isCollapsed ? 'flex-row space-x-3' : 'flex-col space-y-2'}  transition-all duration-500 items-center px-3 py-3 rounded hover:bg-gray-100 cursor-pointer    ${index === 0 && 'bg-gray-100'}`}
                            >
                                {item.icon}
                                <span className="text-[#637381] font-smibold text-xs font-semibold">{item.label}</span>
                            </li>
                        ))}
                    </ul>
                   {!isCollapsed && <div className="space-y-1 ">
                        <div onClick={() => setIsOpen(!isOpen)}
                            className={`flex  flex-row ${!isCollapsed ? ' space-x-3 justify-between items-center  px-3 ' : ' justify-center items-start px-0'}  transition-all duration-500     py-3 rounded hover:bg-gray-100 cursor-pointer    `}

                        >

                            

                            <div
                                className={`flex ${!isCollapsed ? "flex-row space-x-3 items-center " : "flex-col flex-1 justify-center items-center space-y-2"}`}
                            >
                                <BiSolidTachometer className="text-[#000] text-xl" />
                                <span className="text-[#637381] font-semibold text-xs text-center">
                                    User
                                </span>
                            </div>


                            {
                                !isCollapsed && (isOpen ? <HiMiniChevronDown className="text-xs " /> : <HiMiniChevronRight className="text-xs" />
                                )
                            }




                            {isCollapsed && <IoChevronForward className="text-xs mt-1.5 absolute right-1" />}
                        </div>
                        <div
                            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? "max-h-96" : "max-h-0"
                                }`}
                        >
                            {!isCollapsed && <ul className="ul-list space-y-1 pl-3 ">

                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`li-list flex  transition-all duration-500 items-center   cursor-pointer `}
                                    >
                                        <span className={`text-[#637381] font-smibold text-xs font-semibold  px-3 py-3 w-full rounded    ${index === 0 && 'bg-gray-100'}  hover:bg-gray-100`}>{item.label}</span>
                                    </li>
                                ))}
                            </ul>}

                        </div>



                    </div>}

                    {isCollapsed && <Popover placement="right" content={content} arrow={false}  >
              <Button className="w-full h-auto p-0 border-none shadow-none"   >
     <div 
                            className={`flex  flex-row ${!isCollapsed ? ' space-x-3 justify-between items-center  px-3 ' : ' justify-center items-start px-0'}  transition-all duration-500   w-full    py-3 rounded hover:bg-gray-100 cursor-pointer    `}

                        >

                            

                            <div
                                className={`flex ${!isCollapsed ? "flex-row space-x-3 items-center " : "flex-col flex-1 justify-center items-center space-y-2"}`}
                            >
                                <BiSolidTachometer className="text-[#000] text-xl" />
                                <span className="text-[#637381] font-semibold text-xs text-center">
                                    User
                                </span>
                            </div>


                            




                            {isCollapsed && <IoChevronForward className="text-xs mt-1.5 absolute right-1 hover:text-black" />}
                        </div>
</Button>
            </Popover>}
                        
                </div>


            </div>
        </>

    );
}
