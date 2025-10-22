import React, { useState, useEffect, use, useContext } from "react";
import logo from "../../../../assets/images/logo.png";
import userIcon from "@assets/images/user.png";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../../context/AuthContext";
import { userServices } from "../../../../services/user.service";
import { Button, Dropdown, Space } from "antd";
import { FaUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";

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
  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: userServices.logoutUser,
    onSuccess: (data) => {
      // console.log("Logout success:", data);
      navigate("/login");
      logout();
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  // console.log('user',user)
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
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <>
      {/* Header for desktop */}

      <header
        className={`z-50 py-4 transition-all duration-300 transform md:px-4  border-b mb-2  ${
          atTop
            ? ` translate-y-0 bgtransparent duration-100 text-black bg-white `
            : showHeader
              ? "translate-y-0 text-dark bg-white backdrop-blur shadow-[0_0_5px_rgb(204,204,204)] sticky top-0 z-50  "
              : "-translate-y-full    bg-white"
        }`}
      >
        <div className="container flex items-center justify-between">
            {/* Mobile Menu Button */}
          <div className=" lg:hidden md:pr-3 flex justify-end items-end">
            <button
              onClick={toggleMenuOpen}
              className="text-3xl focus:outline-none "
            >
              <MdMenu />
            </button>
          </div>
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="" className="w-10 hidden md:block" />
            <span className="text-3xl font-bold">Shop.co</span>
          </div>

          {/*  Nav Links */}
          {/* <nav className="hidden lg:flex  text-black ">
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
          </nav> */}

          <div className="flex items-center space-x-3   ">
              <span>
                <FiHeart  className="text-lg" />
              </span>
            <Link to="/cart">
              <span>
                <HiOutlineShoppingBag className="text-lg" />
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="flex">
                <Dropdown
                  trigger={["click"]}
                  dropdownRender={() => (
                    <div className="p-4 w-64 bg-white shadow-lg rounded-lg">
                      <h3 className="text-lg font-bold mb-2">Profile</h3>
                      <p className="text-sm text-gray-600">
                        Hello,{user.data.data.name || user.data.data.user.name}
                      </p>
                      <button
                        className="mt-2 w-full bg-blue-500 text-white py-1 rounded"
                        onClick={() => logoutMutation.mutate()}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                >
                    <FaUser className="cursor-pointer text-lg"  />
                </Dropdown>
              </div>
            ) : (
              <Link to="/login">
                <span className="">Login</span>
              </Link>
            )}
          </div>

        
        </div>
      </header>
    </>
  );
}

export default DesktopHeader;
