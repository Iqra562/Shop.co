import React from "react";
import logo from "@assets/images/logo.png";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetProducts } from "@hooks/useProducts";
import { AdminRoutes } from "../../../utils/util.constant.js";
import { Link } from "react-router-dom";
import { TiEye } from "react-icons/ti";
import { MdOutlineAdd } from "react-icons/md";
import { Collapse, Form, Input, Switch } from "antd";
import { RightOutlined } from "@ant-design/icons";
import Collapsible from "../../../components/common/Collapsible/index.jsx";


function AddEditProduct() {
   


  return (
     <div className="container">
        <div className="mb-10 flex items-center ">
          <div className="space-y-5 ">
            <h1 className="text-2xl font-bold mt-5">List</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm ">
                <Link to={AdminRoutes.DASHBOARD}>Dashboard</Link>
              </span>{" "}
              <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
              <span className="text-sm ">
                <Link to={AdminRoutes.FETCHPRODUCTS}>Product</Link>
              </span>{" "}
              <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
              <span className="text-sm text-gray-400  ">Create</span>{" "}
            </div>
          </div>
          <button className="bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-sm font-bold text-white  rounded-md">
            <MdOutlineAdd className="font-bold" />
            Add product{" "}
          </button>
          <div></div>
        </div>
    <Collapsible/>
  </div>
  );
}

export default AddEditProduct;
