import React, { useState, useEffect } from "react";
import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import logo from "../../../assets/images/logo.webp";
import { MdMenu } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../config/utilities/utils.constant";

function DesktopHeader({glassEffect = false, gradient = false, navItems, toggleMenuOpen }) {
  const location = useLocation();
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
        className={` w-full  fixed z-50 py-6 transition-all duration-300 transform ${
          atTop
            ? `${
                gradient && " bg-gradient-to-br from-[#6D1349] to-[#DF73FF]   "
                
              } ${glassEffect && "liquidGlassEffectForHeader"}  translate-y-0 bgtransparent duration-100 text-white `
            : showHeader
            ? "translate-y-0 text-dark bg-white backdrop-blur shadow-[0_0_5px_rgb(204,204,204)]   "
            : "-translate-y-full    bg-white"
        }`}
      >
        <div className="container flex items-center justify-between ">
          {/* Logo */}
          <div>
            <Link to={routes.HOME}>
            <img
              src={logo}
              alt="logo"
              className=" w-[10rem]  xl:w-[15rem] h-[px]"
              />
              </Link>
          </div>

          {/*  Nav Links */}
          <nav>
        <ul className="flex space-x-10 ">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li></li>
        </ul>
     </nav>

          {/*  Contact Button */}
          <div className="hidden lg:flex items-center space-x-4 px-2">
            <div
              className={`${
                atTop ? "bg-[#FFC067] text-dark  " : " bg-[#DF73FF] text-dark"
              }   text-lg font-semibold px-3 py-2 rounded shadow flex items-center space-x-2 transition`}
            >
              <FaPhoneAlt />
              

              <span> <a href="tel:+17033812998">(703) 381-2998</a></span>
            </div>
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
