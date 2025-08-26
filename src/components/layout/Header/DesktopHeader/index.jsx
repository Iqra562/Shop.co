import React, { useState, useEffect } from "react";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import logo from "../../../../assets/images/logo.png";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { routes } from "../../../config/utilities/utils.constant";

function DesktopHeader({glassEffect = false, gradient = false, navItems, toggleMenuOpen }) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);


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
const handleSubMenuToggle=()=>{
  setIsSubMenuOpen(false)
}


  return (
    <>
      {/* Header for desktop */}

      <header
        className={` w-full   z-50 py-6 transition-all duration-300 transform px-4 ${
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
      className={`transition after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px]  after:rounded-full after:transition-all after:duration-300 group-hover:after:w-full flex  items-center space-x-2 `
    
      }
    >
      {item.label}
    </Link>

  
  </li>
))}

            </ul>
          </nav>

           <div className="flex items-center space-x-1   ">
                 <span><HiOutlineShoppingBag />
         </span>
         <Link to='/login'>
         <span className="" >
         
                 Login
         </span>
         </Link>
         
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
