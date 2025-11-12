import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { AuthContext } from "../../../context/AuthContext";
import { OrderContext } from "../../../context/OrderContext";
import { useMutation } from "@tanstack/react-query";
import { orderServices } from "../../../services/order.service";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

function OrderSummary() {
  const { isAuthenticated } = useContext(AuthContext);
  const { products, setProducts } = useContext(OrderContext);
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [total, setTotal] = useState(0);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
    });
  };

  const removeCartItemHandler = (id) => {
    setProducts((prev) => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    setSubTotal(
      products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0)
    );
    setTotalItems(
      products.reduce((total, item) => {
        return total + item.quantity;
      }, 0)
    );
    setTotal(subTotal);
  }, [products, subTotal]);
  const { mutate: createOrderRequest, isPending: createOrderLoader } =
    useMutation({
      mutationFn: orderServices.createOrder,
      onSuccess: (res) => {
        openNotificationWithIcon("success", "Order placed successfully!");
        setTimeout(() => {
      navigate("/orders", { replace: true });
          setProducts([]);

        }, 1000);
      },

      onError: (err) => {},
    });
  const createOrderHandler = () => {
    console.log(products);
    createOrderRequest({ itemDetails: products });
  };
  
if(!products.length){
  navigate('/cart')
}

  return (
    <section className="container">
      {contextHolder}

      {isAuthenticated ? (
        <div>
          <div className="border-b pb-4 ">
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          {products.length === 0 ? (
            <div className="pt-10 ">
              <div className="   bg-gray-50 px-20 py-10 rounded-lg w-fit mx-auto">
                <h1 className="text-2xl font-bold text-center">
                  Your Cart is Empty
                </h1>
                <p className="text-lg  text-center">
                  {" "}
                  <Link to="/products" className="">
                    <span> continue the shopping.. </span>{" "}
                  </Link>{" "}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row pt-3">
              <div className="w-full md:w-8/12 border-b-2 pb-10 mb-10 md:border-b-0 md:border-r-2 md:pr-4 lg:pr-5 xl:pr-20  space-y-4 md:min-h-80 ">
                {products.map((item, i) => (
                  <div
                    key={i}
                    className="md:h-36  flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg px-4 py-4 w-full"
                  >
                    <div className="flex  w-full h-full">
                      <div className="w-6/12 md:w-3/12 h-full rounded-md overflow-hidden">
                        <Link to={`/product-details/${item.product._id}`}>
                          <img
                            src={item.product.thumbnail.url}
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                        </Link>
                      </div>

                      <div className="pl-2 md:pl-8 w-full flex flex-col justify-between ">
                        <div className="flex justify-between  w-full items-center">
                          <h2 className="text-2xl font-bold">
                            {item.product.name}
                          </h2>
                          <span
                            onClick={() => removeCartItemHandler(item._id)}
                            className="cursor-pointer"
                          >
                            <RxCross2 className="text-black text-sm" />
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <h3 className="text-xl font-bold text-[#3a4e66]">
                            ${item.product.price}
                          </h3>
                          <div>
                            <span className="font-semibold">Quanity : </span>
                            {item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                        <h5 className="text-lg text-gray-500">Shipping fee:</h5>
                        {/* <span>${shippingFee}</span> */}
                        <span>Free</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-t pt-5">
                      <h6 className="text-xl font-bold">Total:</h6>
                      <span className="">${total}</span>
                    </div>

                    <button
                      className="bg-black  bg-gradient-to-r from-[#3a4e66] to-[#537090] w-full text-white py-2 rounded-md place-self-end  "
                      onClick={createOrderHandler}
                    >
                      {createOrderLoader ? (
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
                          spinning={createOrderLoader}
                        />
                      ) : (
                        "Proceed To Pay"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[80vh] flex flex-col items-center justify-center">
          <div className="   bg-gray-50 px-20 py-10 rounded-lg">
            <h1 className="text-3xl font-bold text-center">
              You are not loggedin
            </h1>
            <p className="text-xl  text-center">
              Please{" "}
              <Link to="/login " className="underline">
                <span> sign in </span>{" "}
              </Link>{" "}
              to check your cart!
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
export { OrderSummary };
