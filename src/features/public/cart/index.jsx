import { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useGetCart } from "@hooks/cart/useCartData.js";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { notification, Spin } from "antd";
import { AuthContext } from "@context/AuthContext";
import { OrderContext } from "@context/OrderContext";
import { TbShoppingBagPlus } from "react-icons/tb";
import { PublicRoutes } from "../../../utils/util.constant";
import { HiOutlineShoppingBag } from "react-icons/hi";
import CartSkeleton from "./components/cartSkeleton";
import { LoadingOutlined } from "@ant-design/icons";
import EmptyPageLayout from "@components/common/EmptyPageLayout";
import { useCartActions } from "@hooks/cart/useCartActions.js";
import { useCartSelection } from "@hooks/cart/useCartSelection.js";
import { useCartSummary } from "@hooks/cart/useCartSummary.js";
function Cart() {
  const {
    data: cartData,
    dataUpdatedAt,
    isFetched,
    isPending,
    error,
  } = useGetCart();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
const notify = (type, message) => {
  api[type]({
    description: message,
    icon: false,
  });
};


  const cart = useMemo(
    () => cartData?.data?.data.items || [],
    [cartData?.data?.data.items]
  );
  const { itemsSummary, setItemsSummary } = useCartSelection({ cart });
  const {increaseQuantity,
    decreaseQuantity,
    removeCartItemHandler,} = useCartActions()

  const {
    subTotal,
    totalItems,
    grandTotal,
    totalProductSummaryHandler,
    proceedToCheckout,
    loader,
  } = useCartSummary({ itemsSummary, setItemsSummary, cart ,onNotify:notify ,onNavigate:navigate });

  const { isAuthenticated } = useContext(AuthContext);

 
  return (
    <section className="container min-h-screen ">
      {contextHolder}
      {isAuthenticated ? (
        <div>
          {isPending ? (
            <CartSkeleton />
          ) : cart.length === 0 ? (
            <div className=" h-[80vh]">
              <EmptyPageLayout
                icon={HiOutlineShoppingBag}
                title="Your cart is empty"
                text="Looks like you haven't added anything to your cart yet. Start  exploring and shop your favorite items!"
                btnText="Browse Products"
                link={PublicRoutes.PRODUCTS}
              />
            </div>
          ) : (
            <>
              <div className="border-b py-4 ">
                <h1 className="text-2xl text-primary font-bold uppercase">
                  Your cart
                </h1>
              </div>
              <div className="flex flex-col md:flex-row pt-3">
                <div className="w-full md:w-8/12 border-b-2 pb-10 mb-10 md:border-b-0 md:border-r-2 md:pr-4 lg:pr-5 xl:pr-20  space-y-4 md:min-h-screen ">
                  {cart.map((item, i) => {
                    const isItemAdded = itemsSummary.some(
                      (summary) => summary.product._id === item.product._id
                    );
                    return (
                      <div
                        key={i}
                        className={`md:h-36  flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg px-4 py-4 w-full cursor-pointer ${isItemAdded ? "bg-gray-100" : "bg-white"}`}
                        onClick={() => totalProductSummaryHandler(item._id)}
                      >
                        <div className="flex  w-full h-full">
                          <div className="w-6/12 md:w-3/12 h-full rounded-md overflow-hidden">
                            <Link to={`/product-details/${item.product._id}`}>
                              <img
                                src={item.product.thumbnail.url}
                                alt=""
                                className="w-full h-20 md:h-full object-cover object-top"
                              />
                            </Link>
                          </div>

                          <div className="pl-2 md:pl-8 w-full flex flex-col justify-between ">
                            <div className="flex justify-between  w-full items-center">
                              <h2 className="text-2xl font-bold">
                                {item.product.name}
                              </h2>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCartItemHandler(item._id);
                                }}
                                className="cursor-pointer z-10"
                              >
                                <RxCross2 className="text-black text-sm" />
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <h3 className="text-xl font-bold text-[#3a4e66]">
                                ${item.product.price}
                              </h3>
                              <div>
                                <div className="space-x-1 flex items-center">
                                  <button
                                    className="bg-slate-200 px-4 py-1 rounded-md text-lg   "
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      decreaseQuantity(item.product._id);
                                    }}
                                  >
                                    <span className="mb-1">-</span>{" "}
                                  </button>
                                  <span className="font-bold">
                                    {String(item.quantity).padStart(2, "0")}
                                  </span>
                                  <button
                                    className="bg-slate-200  px-4 py-1 rounded-md text-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      increaseQuantity(item.product._id);
                                    }}
                                  >
                                    <span className="mb-1">+</span>{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="md:pl-2 lg:pl-8 space-y-14 w-full md:w-5/12 sticky top-36  self-start">
                  <div className=" h-80 border-2  rounded-md p-4 flex flex-col justify-between">
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h5 className="text-lg text-gray-500">
                            Subtotal ({totalItems} items):
                          </h5>
                          <span>${subTotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <h5 className="text-lg text-gray-500">
                            Shipping fee:
                          </h5>
                          {/* <span>${shippingFee}</span> */}
                          <span>Free</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between border-t pt-5">
                        <h6 className="text-xl font-bold">Total:</h6>
                        <span className="">${grandTotal}</span>
                      </div>
                      {/* <Link to="/order-summary"> */}
                      <button
                        className="bg-primary-button-gradient w-full text-white py-2 rounded-md   "
                        onClick={proceedToCheckout}
                        disabled={loader}
                      >
                        {loader ? (
                          <Spin
                            indicator={
                              <LoadingOutlined
                                style={{
                                  fontSize: 15,
                                  color: "white",
                                  marginRight: "10px",
                                }}
                                spin
                              />
                            }
                            size="small  "
                            colorPrimary="#000"
                            dotSizeSM={50}
                            spinning={loader}
                          />
                        ) : (
                          "Proceed To Checkout"
                        )}
                      </button>
                      {/* </Link>
                       */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="h-[90vh] flex flex-col items-center justify-center ">
          <div className="px-6 py-4 rounded-lg border-[#537090] border-2 shadow-lg  w-6/12">
            <div className="border-b border-[#537090]">
              <span>Shop Cart (0)</span>
            </div>
            <div className="mx-auto">
              <TbShoppingBagPlus className="mx-auto text-7xl" />
            </div>
            <div className="text-xl font-semibold text-center">
              You are not loggedin
            </div>
            <p className="text-md  text-center">
              Please{" "}
              <Link to="/login " className="underline decoration-[#537090]">
                <span>sign in</span>
              </Link>{" "}
              to check your cart!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export { Cart };
