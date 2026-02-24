import React, { useState, useEffect, use, useContext } from "react";
import { MdMenu } from "react-icons/md";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { Button, Dropdown, Space } from "antd";
import { FaUser } from "react-icons/fa6";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { FiHeart } from "react-icons/fi";
import { AuthenticatedUserRoutes } from "@utils/util.constant.js";
import { PiSignOutBold } from "react-icons/pi";
import { LiaBoxSolid } from "react-icons/lia";
import { BiUser } from "react-icons/bi";

export const SubLayout = () => {
  return (
    <div className="flex container min-h-[90vh] ">
      <div className="w-2/12 border-r hidden lg:block pr-2 ">
        <div className="  py-2 space-y-2 rounded-md">
          <ul className="space-y-1" >
            <li className="text-base capitalize font-semibold"><Link to={AuthenticatedUserRoutes.PROFILE}> profile </Link>  </li>
 
            <li className="text-base capitalize font-semibold"><Link to={AuthenticatedUserRoutes.ORDERS}>
              Orders
            </Link></li>
            <li className="text-base capitalize font-semibold "><Link to={AuthenticatedUserRoutes.WISHLIST}>  Wishlist </Link></li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
