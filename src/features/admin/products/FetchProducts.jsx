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

function FetchProducts() {
  const { data: productsData, isPending, error } = useGetProducts();
  const getProducts = productsData?.data?.data ?? [];
  console.log(getProducts);
  const maxStock = 100;
 
  
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
            <span className="text-sm text-gray-400  ">List</span>{" "}
          </div>
        </div>
        <button className="bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-sm font-bold text-white  rounded-md">
          <MdOutlineAdd className="font-bold" />
          Add product{" "}
        </button>
        <div></div>
      </div>
      <div className="">
        <div className="w-full overflow-x-auto table-scrollbar bg-white rounded-xl">
          <table className=" w-full min-w-[1000px]  ">
            <thead className="py-10 bg-red-900 rounded-lg">
              <tr className="bg-gray-50 rounded-full   w-full">
                <th className="text-start  px-4 py-4  whitespace-nowrap w-20">
                  <input
                    type="checkbox"
                    id="vehicle1"
                    name="vehicle1"
                    value="Bike"
                    className=" w-4 h-4 border-gray-600 rounded "
                  />
                </th>
                <th className="text-gray-500 text-xs text-start uppercase py-3 ">
                  <span className="border-l-2 border-gray-200 pl-2">
                    Product
                  </span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3 min-w-40">
                  <span className="border-l-2 border-gray-200 pl-2">
                    Description
                  </span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">
                    Category
                  </span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">Price</span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">
                    Discount Price
                  </span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">
                    On Sale
                  </span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">Stock</span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3">
                  <span className="border-l-2 border-gray-200 pl-2">Create at</span>
                </th>
                <th className="text-gray-500 text-xs text-start   uppercase py-3"></th>
              </tr>
            </thead>
            <tbody>
              {getProducts.map((element, i) => {
                const content = (
    <div className=" ">
      <ul className="space-y-2 w-20">
        <li className="space-y-2">
          <span className="flex items-center space-x-2 cursor-pointer">
            <TiEye className="text-dark text-base" />{" "}
            <span className="font-semibold text-sm">View</span>
          </span>
          <Link to={`${AdminRoutes.PRODUCT_EDIT}/${element._id}`}>
          <span className="flex items-center space-x-2 cursor-pointer">

            <MdEdit className="text-dark text-base" />{" "}
            <span className="font-semibold text-sm"> Edit</span>
          </span>
          </Link>
          <span className="flex items-center space-x-2 cursor-pointer">
            <MdDelete className="text-red-500 text-base" />{" "}
            <span className="font-semibold text-sm text-red-500">Delete</span>
          </span>
        </li>
      </ul>
    </div>
  );
               return(
                 <tr key={i} className="w-full border border-gray-100 hover:bg-gray-100 cursor-pointer">
                  <td className="px-4 ">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      className=" w-4 h-4 border-gray-600 rounded "
                    />
                  </td>
                  <td className=" py-4 pl-2 text-base text-dark flex justify-start items-center space-x-4">
                    <img
                      src={element.thumbnail.url}
                      className="w-20 h-20 object-cover object-top rounded-md"
                    />{" "}
                    <span className="capitalize">{element.name}</span>
                  </td>
                  <td className="py-2 pl-2 text-base text-dark">
                    {element.description}
                  </td>
                  <td className="py-2 pl-2 text-base text-dark">
                    {element?.category?.name}
                  </td>
                  <td className="py-2 pl-2 text-base text-dark">
                    {" "}
                    <span className="text-gray-400 font-semibold">$</span>{" "}
                    {element.price}
                  </td>
                  <td className="py-2 pl-2 text-base text-dark ">
                    {element.discountPrice ? (
                      <>
                        {Number(element.discountPrice)}
                        <span className="text-gray-400 font-semibold">%</span>
                      </>
                    ) : (
                      "0.00"
                    )}
                  </td>
                  <td className="py-2 pl-2 text-base text-dark ">
                    {" "}
                    {element.onsale ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        On Sale
                      </span>
                    ) : (
                      <span className=" text-gray-600 rounded-2xl text-xs">
                        —
                      </span>
                    )}
                  </td>
                  <td className="py-2 pl-2 text-base text-dark ">
                    <div className="flex flex-col gap-1 w-20">
                      {/* stock bar */}
                      <div
                        className={`w-full h-1.5 ${element.stock < 10 ? "bg-red-50" : element.stock === 0 ? "bg-red-50" : "bg-green-200"}  rounded-full overflow-hidden relative`}
                      >
                        <div
                          className={`h-1.5 ${element.stock < 10 ? "bg-red-100" : element.stock === 0 ? "bg-red-50" : "bg-green-500"}   rounded-full`}
                          style={{
                            width: `${(element.stock / maxStock) * 100}%`,
                          }}
                        ></div>
                      </div>

                      {/* stock text */}
                      <span className="text-xs font-medium text-gray-500">
                        {element.stock === 0
                          ? "Out of stock"
                          : element.stock < 10
                            ? "Low stock"
                            : `${element.stock} in stock`}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 pl-2 text-base text-dark">
                    {" "}
                     <div className="flex flex-col leading-tight">
    
     <span className="text-sm ">
      {new Date(element.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>

     <span className="text-gray-500 text-xs">
      {new Date(element.createdAt).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).toLowerCase()}
    </span>

  </div>
                  </td>
                  <td className="py-2 text-base text-dark">
                    {" "}
                    <Popover
                      placement="right"
                      content={content}
                      arrow={false}
                      className=""
                    >
                      <Button className="w-full h-auto p-0 border-none shadow-none">
                        <div
                          className={`flex  flex-row justify-center items-start transition-all duration-500   w-full    py-3 rounded cursor-pointer    `}
                        >
                           <PiDotsThreeOutlineVerticalFill className="text-base   hover:text-black" />
                         </div>
                      </Button>
                    </Popover>
                  </td>
                </tr>)
})}
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FetchProducts;
