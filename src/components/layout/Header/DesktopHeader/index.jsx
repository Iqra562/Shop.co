import React, { useState, useEffect, use, useContext } from "react";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import logo from "../../../../assets/images/logo.png";
import userIcon from "@assets/images/user.png";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../../context/AuthContext";
import { userServices } from "../../../../services/user.service";
// import { routes } from "../../../config/utilities/utils.constant";
import { Button, Dropdown, Space } from 'antd';

function DesktopHeader({
  glassEffect = false,
  gradient = false,
  navItems,
  toggleMenuOpen,
}) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);
  const logoutMutation = useMutation({
    mutationFn: userServices.logoutUser,
    onSuccess: (data) => {
      console.log("Logout success:", data);
      // clear state, redirect, etc.
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  const { isAuthenticated, user } = useContext(AuthContext);
  console.log('user',user)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setAtTop(currentScrollY === 0);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // scrolling down
        setShowHeader(false);
      } else {
        // scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  const handleSubMenuToggle = () => {
    setIsSubMenuOpen(false);
  };
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];
  return (
    <>
      {/* Header for desktop */}

      <header
        className={` w-full   z-50 py-6 transition-all duration-300 transform px-4  ${
          atTop
            ? ` translate-y-0 bgtransparent duration-100 text-black bg-white `
            : showHeader
              ? "translate-y-0 text-dark bg-white backdrop-blur shadow-[0_0_5px_rgb(204,204,204)] sticky top-0 z-50  "
              : "-translate-y-full    bg-white"
        }`}
      >
        <div className="hd:container flex items-center justify-between ">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10" />
            <span className="text-3xl font-bold">Shop.co</span>
          </div>

          {/*  Nav Links */}
          <nav className="hidden lg:flex  text-black ">
            <ul className="flex space-x-4 xl:space-x-6">
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="relative group cursor-pointer transition text-lg"
                  onMouseEnter={() => setOpenSubMenuIndex(index)}
                  onMouseLeave={() => setOpenSubMenuIndex(null)}
                >
                  <Link
                    to={item.link}
                    className={`transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]  after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full flex  items-center space-x-2 `}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-1   ">
            <span>
              <HiOutlineShoppingBag />
            </span>
            {isAuthenticated ? (
              <div className="flex">
             
              
                      <Dropdown
      trigger={["click"]}
      dropdownRender={() => (
        <div className="p-4 w-64 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-2">Profile</h3>
          <p className="text-sm text-gray-600">Hello,{user.data.data.name}</p>
          <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded" onClick={() => logoutMutation.mutate()}>
            Logout
          </button>
        </div>
      )}
    >
     <div
                  className="relative w-8 h-8 rounded-full p-[2px] 
                       bg-[linear-gradient(270deg,#32CD32,#ffffff,#274690)] 
                       bg-[length:400%_400%] animate-borderGradient cursor-pointer"
                >
                  <div className="p-1 rounded-full bg-white">
                    <img
                      src={userIcon}
                      alt=""
                      className="w-full h-full object-cover object-top rounded-full"
                    />{" "}
                  </div>
                </div>
             
    </Dropdown>
                 
                </div>
            ) : (
              <Link to="/login">
                <span className="">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className=" lg:hidden pr-3">
            <button
              onClick={toggleMenuOpen}
              className="text-3xl focus:outline-none "
            >
              <MdMenu />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default DesktopHeader;
