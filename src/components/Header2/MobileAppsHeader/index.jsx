import React, { useState, useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../config/utilities/utils.constant";

function MobileHeader({ navItems,toggleMenuClose,shouldRender,isMenuOpen,isSubMenuOpen,setIsSubMenuOpen,openSubmenuIndex,setOpenSubmenuIndex}) {
  const location = useLocation();
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
            className={`flex  justify-end items-center mb-6 fixed top-4 right-4 z-10 ${
              isMenuOpen ? "animate-slideInLeft" : "animate-slideOutLeft"
            }  `}
          >
            <button
              onClick={toggleMenuClose}
              className="text-3xl text-white focus:outline-none "
            >
              <IoClose />
            </button>
          </div>

          <div
            className={` mx-auto  pt-12 pb-8 float-end bg-gradient-to-br from-[#6D1349] to-[#DF73FF]  overflow-y-auto w-[300px] min[425px]:w-[70%] md:w-[40%] min-[880px]:w-[35%]  ${
              isMenuOpen ? "animate-slideInLeft" : "animate-slideOutLeft"
            } `}
            onClick={(e) => e.stopPropagation()}
            style={{ height: `${windowHeight}px` }}
          >
            {/* Menu Items */}
            <div
              className={`flex flex-col space-y-1 transition-all duration-500 ease-out   `}
            >
              <ul>
                {navItems.map((item, index) => (
                  <li
                    key={index}
                    className={`relative  text-white text-lg  px-4    ${
                      location.pathname === item.link
                        ? "border-l-4 border-[#DF73FF]"
                        : ""
                    }  h-full   `}
                  >
                    {item.subItems ? (
                      <>
                        <button
                          onClick={() => handleToggleSubmenu(index)}
                          className="w-full text-left py-3 "
                        >
                          {item.label}
                        </button>
                        {openSubmenuIndex === index && (
                          <ul
                            className={`space-y-2  transition-all overflow-hidden duration-300 ${
                              isSubMenuOpen
                                ? "animate-slideDown"
                                : "animate-slideUp"
                            }`}
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <li
                                key={subIndex}
                                onClick={toggleMenuClose}
                                className={`last:pb-4 transition-all duration-200 text-white   ${
                                  location.pathname === subItem.link
                                    ? "border-l-4 border-[#DF73FF]"
                                    : " hover:pl-1"
                                } `}
                              >
                                <Link
                                  to={subItem.link}
                                  className="block px-4 py-2 text-md text-white"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link to={item.link} onClick={toggleMenuClose}>
                        <div className="py-3 ">{item.label}</div>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="px-4">
                <Link to={routes.CONTACTUS} onClick={toggleMenuClose}>
                <button
                  
                  className="bg-[#FFC067] w-full text-dark font-bold px-4 py-3 rounded shadow flex items-center justify-center space-x-2  transition mt-6 text-lg"
                  >
                  {/* <FaPhoneAlt /> */}
                  Get a Quote
                </button>
                  </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MobileHeader;
