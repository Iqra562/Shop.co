import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { HiMiniChevronRight } from "react-icons/hi2";
import logo from "@assets/images/logo.png";
import { BiSolidTachometer } from "react-icons/bi";
import { IoChevronForward } from "react-icons/io5";
import { HiMiniChevronDown } from "react-icons/hi2";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import { useLocation } from "react-router-dom";
import svg from "@assets/images/icon.svg";
import { Link } from "react-router-dom";
export function Dropdown({ isCollapsed, setIsCollapsed, Icon, List, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const content = (
    <div className=" ">
      <ul className="space-y-2 w-28">
        {List.map((item, index) => {
          const isActive = location.pathname === (item.link || "");
          return (
            <li
              key={index}
              className={`${
                isActive ? "bg-gray-200" : ""
              } hover:bg-gray-100 rounded-md`}
            >
              <Link
                to={item.link || "#"}
                className="text-[#637381]  flex font-smibold text-xs font-semibold py-1.5 px-1  cursor-pointer"
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
  // document.writeln(label)
  return (
    <>
      <div>
        {!isCollapsed && (
          <div className="space-y-1  ">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`flex  flex-row ${!isCollapsed ? " space-x-3 justify-between items-center  px-3 " : " justify-center items-start px-0"}  transition-all duration-500     py-3 rounded hover:bg-gray-100 cursor-pointer    `}
            >
              <div
                className={`flex ${!isCollapsed ? "flex-row space-x-3 items-center " : "flex-col flex-1 justify-center items-center space-y-2"}`}
              >
                {Icon}{" "}
                <span className="text-[#637381] font-semibold text-xs text-center">
                  {label}{" "}
                </span>
              </div>

              {!isCollapsed &&
                (isOpen ? (
                  <HiMiniChevronDown className="text-xs " />
                ) : (
                  <HiMiniChevronRight className="text-xs" />
                ))}

              {isCollapsed && (
                <IoChevronForward className="text-xs mt-1.5 absolute right-1" />
              )}
            </div>
            <div
              className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                isOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {!isCollapsed && (
                <ul className="ul-list space-y-1 pl-3 ">
                  {List.map((item, index) => {
                    const isActive = location.pathname === (item.link || "");
                    return (
                      <li key={index}>
                        <Link
                          to={item.link || "#"}
                          className={`li-list flex  transition-all duration-500 items-center   cursor-pointer `}
                        >
                          <span
                            className={`text-[#637381] font-smibold text-xs font-semibold  px-3 py-3 w-full rounded   ${isActive ? "bg-gray-200 text-dark hover:bg-gray-200" : "bg-white"}  hover:bg-gray-100`}
                          >
                            {item.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        )}

        {isCollapsed && (
          <Popover
            placement="right"
            content={content}
            arrow={false}
            className=""
          >
            <Button className="w-full h-auto p-0 border-none shadow-none">
              <div
                className={`flex  flex-row ${!isCollapsed ? " space-x-3 justify-between items-center  px-3 " : " justify-center items-start px-0"}  transition-all duration-500   w-full    py-3 rounded hover:bg-gray-100 cursor-pointer    `}
              >
                <div
                  className={`flex ${!isCollapsed ? "flex-row space-x-3 items-center " : "flex-col flex-1 justify-center items-center space-y-2"}`}
                >
                  {/* <Icon className="text-[#000] text-xl" /> */}
                  {Icon}
                  <span className="text-[#637381] font-semibold text-xs text-center">
                    {label}
                  </span>
                </div>

                {isCollapsed && (
                  <IoChevronForward className="text-xs mt-1.5 absolute right-1 hover:text-black" />
                )}
              </div>
            </Button>
          </Popover>
        )}
      </div>
    </>
  );
}
