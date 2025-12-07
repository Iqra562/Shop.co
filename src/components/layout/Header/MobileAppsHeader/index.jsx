import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
// import { routes } from "../../../config/utilities/utils.constant";

function MobileHeader({ navItems,toggleMenuClose,shouldRender,isMenuOpen,isSubMenuOpen,setIsSubMenuOpen,openSubmenuIndex,setOpenSubmenuIndex}) {
  const [isTargetWidth, setIsTargetWidth] = useState(false);
  const [isSubMenuAnimating, setIsSubMenuAnimating] = useState(false);
const [windowHeight, setWindowHeight] = useState(
  typeof window !== "undefined" ? window.innerHeight : 0
);

useEffect(() => {
    if (typeof window === "undefined") return; 
  const handleResize = () => {
    setWindowHeight(window.innerHeight);
  };
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

// Then use style={{ height: `${windowHeight}px` }}

  const handleToggleSubmenu = (index) => {
    if (isSubMenuAnimating) return; // prevent toggle during animation

    setIsSubMenuAnimating(true); // lock interaction

    if (openSubmenuIndex === index && isSubMenuOpen) {
      setIsSubMenuOpen(false);

      setTimeout(() => {
        setOpenSubmenuIndex(null);
        setIsSubMenuAnimating(false); // unlock after closing
      }, 400); // match animation duration
    } else {
      setOpenSubmenuIndex(index);
      setIsSubMenuOpen(true);

      setTimeout(() => {
        setIsSubMenuAnimating(false); // unlock after opening
      }, 350);
    }
  };

  // reason to check window size if we open sidebar in sm screen  it sets document body's scrollbar to hidden. and  If we then resize to a large screen without closing the sidebar, the scrollbar remains hidden.
  useEffect(() => {
      if (typeof window === "undefined") return; 
    const handleResize = () => {
      setIsTargetWidth(window.innerWidth <= 1023);
    };

    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);  


  useEffect(() => {
    if (isTargetWidth && shouldRender) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isTargetWidth, shouldRender]);

  return (
    <>
      {shouldRender && (
        <div
          className={`lg:hidden  fixed  top-0 left-0 right-0  w-screen transition-all   z-50 shadow-lg  ${
            isMenuOpen
              ? "animateslideInLeft bg-opacity-60  bg-[#000]"
              : "animateslideOutLeft bg-opacity-60  bg-[#000] "
          }    `}
          onClick={toggleMenuClose}
        >

          
          {/* Menu Header with Close Button */}
          <div
            className={`flex  justify-end items-center mb-6 fixed top-4 right-10 md:right-auto md:left-64 z-10 ${
              isMenuOpen ? "animate-slideInLeft" : "animate-slideOutLeft"
            }  `}
          >
            <button
              onClick={toggleMenuClose}
              className="text-3xl text-black focus:outline-none "
            >
              <IoClose />
            </button>
          </div>
            
          <div
            className={` mx-auto  pt-3 px-4 pb-8 float-start bg-white  overflow-y-auto w-[300px] min[425px]:w-[70%] md:w-[40%] min[880px]:w[35%]  ${
              isMenuOpen ? "animate-slideInLeft" : "animate-slideOutLeft"
            } `}
            onClick={(e) => e.stopPropagation()}
            style={{ height: `${windowHeight}px` }}
          > 
              <nav>
            <span className="text-3xl font-bold">Shop.co</span>

         <ul className=" space-x-0 mt-10 space-y-2 ">
            <li className="text-lg font-semibold">Home</li>
            <li className="text-lg font-semibold">About</li>
            <li className="text-lg font-semibold">Contact</li>
            <li className="text-lg font-semibold"></li>
        </ul>
     </nav>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileHeader;
