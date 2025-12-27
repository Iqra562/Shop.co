import React, { useState, useEffect, use, useContext, useMemo } from "react";
import logo from "../../../../assets/images/logo.png";
import { MdMenu } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../../../context/AuthContext";
import { userServices } from "../../../../services/user.service";
import { Button, Dropdown, Space } from "antd";
import { FaUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { AuthenticatedUserRoutes } from "@utils/util.constant.js";
import { PiSignOutBold } from "react-icons/pi";
import { LiaBoxSolid } from "react-icons/lia";
import { BiUser } from "react-icons/bi";
import CartDrawer from "../../CartDrawer";
import WishlistDrawer from "../../WishlistDrawer";
import { useGetCart } from "@hooks/cart/useCartData.js";

function DesktopHeader({
  glassEffect = false,
  gradient = false,
  navItems,
  toggleMenuOpen,
}) {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const openCart = () => setCartOpen(true);
  const openWishlist = () => setWishlistOpen(true);

  const closeCart = () => setCartOpen(false);
  const closeWishlist = () => setWishlistOpen(false);
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

  const { data: cartData } = useGetCart();

  const cartCount = cartData?.data?.data?.items?.length || 0;
const location = useLocation();

const isWishlistPage = location.pathname === "/wishlist";
const isCartPage = location.pathname === "/cart";
  return (
    <>
      {/* Header for desktop */}
      <CartDrawer open={cartOpen} onClose={closeCart} />
      <WishlistDrawer open={wishlistOpen} onClose={closeWishlist} />
      <header
        className={`z-50 py-4 transition-all duration-300 transform md:px-4  border-b  ${
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
            <span className="text-3xl hidden md:block uppercase font-extrabold">
              Shop.co
            </span>
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
            <span     onClick={!isWishlistPage ? openWishlist : undefined}
 className="cursor-pointer">
              <FiHeart className="text-lg" />
            </span>
            <span     onClick={!isCartPage ? openCart : undefined}
 className="relative cursor-pointer">
              <HiOutlineShoppingBag className="text-lg" />

               {isAuthenticated &&  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>}
             </span>

            {isAuthenticated ? (
              <div className="flex">
                <Dropdown
                  trigger={["click"]}
                  popupRender={() => (
                    <div className="p-4 w-64 bg-white shadow-lg rounded-lg border">
                      <div className="flex items-center space-x-2 border-b pb-3">
                        <div className="border-2 border-gray-200 rounded-full h-8 w-8 flex justify-center items-center">
                          <FaUser className="cursor-pointer text-lg" />
                        </div>
                        <span className="capitalize">
                          {user?.data?.data?.name ||
                            user?.data?.data?.user?.name ||
                            "User"}
                        </span>
                      </div>

                      <div className="">
                        <div className="  py-2 space-y-2">
                          <Link to={AuthenticatedUserRoutes.PROFILE}>
                            <button className=" flex items-center text-gray-600  space-x-3 ">
                              <BiUser className="text-lg font-bold" />{" "}
                              <span>Profile</span>
                            </button>
                          </Link>
                          <Link
                            className="block"
                            to={AuthenticatedUserRoutes.WISHLIST}
                          >
                            <button className=" flex items-center text-gray-600  space-x-3 ">
                              <FiHeart className="text-lg font-bold" />{" "}
                              <span>My Wishlist</span>
                            </button>
                          </Link>
                          <Link
                            className="block"
                            to={AuthenticatedUserRoutes.ORDERS}
                          >
                            <button className=" flex items-center text-gray-600  space-x-3 ">
                              <LiaBoxSolid className="text-lg font-bold" />{" "}
                              <span>Orders</span>
                            </button>
                          </Link>
                          <Link
                            className="block"
                            to={AuthenticatedUserRoutes.CART}
                          >
                            <button className=" flex items-center text-gray-600  space-x-3 ">
                              <HiOutlineShoppingBag className="text-lg font-bold" />{" "}
                              <span>My Cart</span>
                            </button>
                          </Link>
                        </div>
                        <div className="border-t pt-2">
                          <button
                            className=" flex items-center text-gray-600  space-x-3 "
                            onClick={() => logoutMutation.mutate()}
                          >
                            <PiSignOutBold className="text-lg font-bold" />{" "}
                            <span>Logout</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                >
                  <div className="border-2 border-gray-200 rounded-full h-8 w-8 flex justify-center items-center cursor-pointer">
                    <FaUser className="cursor-pointer text-lg" />
                  </div>
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
