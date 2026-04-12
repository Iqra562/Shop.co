import { Button, ConfigProvider, Flex, Popover } from "antd";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useGetProducts } from "@hooks/useProducts";
import { AdminRoutes } from "../../../utils/util.constant.js";
import { Link } from "react-router-dom";
import { MdOutlineAdd } from "react-icons/md";
import Modal from "@components/common/Modal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notification } from "antd";
import { productServices } from "../../../services/product.service.js";
import { useQueryClient } from "@tanstack/react-query";
function FetchProducts() {
  const { data: productsData, isPending, error } = useGetProducts();
  const getProducts = productsData?.data?.data ?? [];
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [productId, setProductId] = useState(null);
const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending: deleteProductLoading } =
    useMutation({
      mutationFn: (id) => productServices.deleteProduct(id),
    }); 
  console.log(getProducts);
  const maxStock = 100;
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
      style: {
        backgroundColor: "#fff", 
      },
    });
  };
  const openModalHandler = (id) => {
    setIsModalOpen(true);
    setProductId(id);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setProductId(null);
  };
  const productDeleteHandler = () => {
    deleteProduct(productId, {
      onSuccess: () => {
        openNotificationWithIcon("success", "Product deleted successfully!");
        closeModalHandler();
              queryClient.invalidateQueries({ queryKey: ["products"] });

      },
      onError: (err) => {
        openNotificationWithIcon(
          "error",
          "Failed to delete product. Please try again.",
        );
        closeModalHandler();
       
      },
    });
  };
  return (
    <div className="container">
      {contextHolder}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        onDelete={productDeleteHandler}
        isLoading={deleteProductLoading}
        title="Delete Product?"
        text="Deleting this product will permanently remove it."
      />
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
          <table className=" w-full min-w-max table-auto  table-scrollbar  ">
            <thead className="py-10  rounded-lg bg-gray-50">
              <tr className="bg-gray-50 rounded-full   w-full">
                <th className="text-start  px-4 py-4  whitespace-nowrap w-20 ">
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
                <th className="text-gray-500 text-xs text-start   uppercase py-3 ">
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
                  <span className="border-l-2 border-gray-200 pl-2">
                    Create at
                  </span>
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
                        {/* <span className="flex items-center space-x-2 cursor-pointer">
            <TiEye className="text-dark text-base" />{" "}
            <span className="font-semibold text-sm">View</span>
          </span> */}
                        <Link to={`${AdminRoutes.PRODUCT_EDIT}/${element._id}`}>
                          <span className="flex items-center space-x-2 cursor-pointer">
                            <MdEdit className="text-dark text-base" />{" "}
                            <span className="font-semibold text-sm"> Edit</span>
                          </span>
                        </Link>
                        <span
                          className="flex items-center space-x-2 cursor-pointer"
                          onClick={() => openModalHandler(element._id)}
                        >
                          <MdDelete className="text-red-500 text-base" />{" "}
                          <span className="font-semibold text-sm text-red-500">
                            Delete
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                );
                return (
                  <tr
                    key={i}
                    className="w-full border border-gray-100 hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="px-4 ">
                      <input
                        type="checkbox"
                        id="vehicle1"
                        name="vehicle1"
                        value="Bike"
                        className=" w-4 h-4 border-gray-600 rounded "
                      />
                    </td>
                    <td className=" py-4 pl-2 text-base text-dark flex justify-start items-center space-x-4  max-w-full pr-5">
                      <img
                        src={element.thumbnail.url}
                        className="w-20 h-20 object-cover object-top rounded-md"
                      />{" "}
                      <span className="capitalize ">{element.name}</span>
                    </td>
                    <td className="py-2 pl-2 text-base text-dark  max-w-[350px] truncate pr-10">
                      {element.description}
                    </td>
                    <td className="py-2 pl-2 text-base text-dark  min-w-[100px] ">
                      {element?.category?.name}
                    </td>
                    <td className="py-2 pl-2 text-base text-dark min-w-[100px]">
                      {" "}
                      <span className="text-gray-400 font-semibold">
                        $
                      </span>{" "}
                      {element.price}
                    </td>
                    <td className="py-2 pl-2 text-base text-dark min-w-[100px]">
                      {element.discountPrice ? (
                        <>
                          {Number(element.discountPrice)}
                          <span className="text-gray-400 font-semibold">%</span>
                        </>
                      ) : (
                        "0.00"
                      )}
                    </td>
                    <td className="py-2 pl-2 text-base text-dark min-w-[100px] ">
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
                    <td className="py-2 pl-2 text-base text-dark min-w-[100px]">
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
                    <td className="py-2 pl-2 text-base text-dark min-w-[100px]">
                      {" "}
                      <div className="flex flex-col leading-tight">
                        <span className="text-sm ">
                          {new Date(element.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>

                        <span className="text-gray-500 text-xs">
                          {new Date(element.createdAt)
                            .toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .toLowerCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 text-base text-dark min-w-[100px]">
                      {" "}
                      <Popover
                        placement="right"
                        content={content}
                        arrow={false}
                        className=""
                      >
                        <Button className="w-full h-auto p-0 border-none shadow-none bg-transparent">
                          <div
                            className={`flex  flex-row justify-center items-start transition-all duration-500   w-full    py-3 rounded cursor-pointer    `}
                          >
                            <PiDotsThreeOutlineVerticalFill className="text-base   hover:text-black" />
                          </div>
                        </Button>
                      </Popover>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FetchProducts;
