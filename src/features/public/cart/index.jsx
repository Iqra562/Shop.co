import Card from "@components/common/Card";
import { useGetProducts, useGetProductById } from "../../../hooks/useProducts";
import img from "@assets/images/img3.jpg";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useGetCart } from "../../../hooks/useCart";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { cartServices } from "../../../services/cart.service";
import { AuthContext } from "../../../context/AuthContext";
import { BsCart3 } from "react-icons/bs";
import { OrderContext } from "../../../context/OrderContext";
function Cart() {
  const queryClient = useQueryClient();
  const { data: cartData, isPending, error } = useGetCart();
  const [quantities, setQuantities] = useState({});
  const { isAuthenticated } = useContext(AuthContext);
  const [itemsSummary, setItemsSummary] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [total, setTotal] = useState(0);
    const { setProducts } = useContext(OrderContext); 
  const { mutate: removeCartItem, isPending: removeCartFromLoader } =
    useMutation({
      mutationFn: cartServices.removeFromCart,
    });

  const cart = cartData?.data?.data.items ?? [];
  console.log("cart", cart);

  const removeCartItemHandler = (id) => {
    removeCartItem(
      {
        cartItemId: id,
      },
      {
        onSuccess: (response) => {
          console.log(" Inline success for this item:", response);
          queryClient.invalidateQueries(["cart"]);
        },
        onError: (error) => {
          console.error(" Inline error:", error);
        },
      }
    );
  };
  useEffect(() => {
    if (cart.length) {
      const initialQuantities = {};
      cart.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
    // update the item summary when quantity changes
    setItemsSummary((prevSummary) => {
      const updatedSummary = [...prevSummary];

      cart.forEach((item) => {
        const existingIndex = updatedSummary.findIndex(
          (summaryItem) => summaryItem._id === item._id
        );
        // console.log('existing index' , existingIndex)
        if (existingIndex !== -1) {
          updatedSummary[existingIndex] = item;
        }
      });

      return updatedSummary;
    });

  }, [cart]);

  const { mutate: cartRequest, isPending: addToCartLoader } = useMutation({
    mutationFn: cartServices.addToCart,
  });
  const increaseQuantity = (productId, cartItemId) => {
    // setProductQuantity((prev) => (prev >= 15 ? prev : prev + 1));
    const newQuantity = Math.min((quantities[cartItemId] || 1) + 1, 15);
    setQuantities((prev) => ({
      ...prev,
      [cartItemId]: newQuantity,
    }));

    cartRequest(
      { productId: String(productId), quantity: newQuantity },
      {
        onSuccess: () => {
          //  When mutation succeeds, refetch the cart data
          queryClient.invalidateQueries(["cart"]);
        },
      }
    );
  };
  const decreaseQuantity = (productId, cartItemId) => {
    // setProductQuantity((prev) => (prev >= 15 ? prev : prev + 1));
    const newQuantity = Math.max((quantities[cartItemId] || 1) - 1, 1);
    setQuantities((prev) => ({
      ...prev,
      [cartItemId]: newQuantity,
    }));

    cartRequest(
      { productId: String(productId), quantity: newQuantity },
      {
        onSuccess: () => {
          //  When mutation succeeds, refetch the cart data
          queryClient.invalidateQueries(["cart"]);
        },
      }
    );
  };

  const totalProductSummaryHandler = (id) => {
    //  console.log(id)
    const items = cart.find((item) => item._id === id);
    const isItemInSummaryArray = itemsSummary.find((item) => item._id === id);
    if (isItemInSummaryArray) {
      setItemsSummary((prev) =>
        prev.filter((summaryItem) => summaryItem._id !== id)
      );
    } else {
      setItemsSummary((pre) => [...pre, items]);
    }
    //  console.log(itemsSummary)
  };

  console.log(itemsSummary);
  const orderSummaryCalculation = () => {
    if (itemsSummary.length > 0) {
      setSubTotal(
        itemsSummary.reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0)
      );
    } else {
      setSubTotal(0);
      setShippingFee(0);
    }
  };
  useEffect(() => {
    orderSummaryCalculation();
      if (subTotal !== 0 && shippingFee === 0) {
      setShippingFee(Math.floor(Math.random() * 20) + 5);
    }
    setTotal(shippingFee + subTotal);
         setProducts(itemsSummary)

  }, [itemsSummary,shippingFee,subTotal]);

 
  return (
    <section className="container    ">
      {isAuthenticated ? (
        <div>
          <div className="border-b pb-4 ">
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          {cart.length === 0 ? (
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
                {cart.map((item, i) => (
                  <div
                    key={i}
                    className="md:h-36  flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg px-4 py-4 w-full"
                  >
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      onClick={() => totalProductSummaryHandler(item._id)}
                    />
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
                            <div className="space-x-1 flex items-center">
                              <button
                                className="border-black border flex items-center justify-center  bg-white text-black  rounded-full h-8 w-8 text-center  text-2xl  "
                                onClick={() =>
                                  decreaseQuantity(item.product._id, item._id)
                                }
                              >
                                <span className="mb-1">-</span>{" "}
                              </button>
                              <span className="font-bold">
                                {quantities[item._id] > 9 ? "" : 0}
                                {quantities[item._id]}{" "}
                              </span>
                              <button
                                className="bg-black text-white   flex items-center justify-center  rounded-full h-8 w-8 text-center  text-xl"
                                onClick={() =>
                                  increaseQuantity(item.product._id, item._id)
                                }
                              >
                                <span className="mb-1">+</span>{" "}
                              </button>
                            </div>
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
                          Subtotal (0 items):
                        </h5>
                        <span>${subTotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <h5 className="text-lg text-gray-500">Shipping fee:</h5>
                        <span>${shippingFee}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between border-t pt-5">
                      <h6 className="text-xl font-bold">Total:</h6>
                      <span className="">${total}</span>
                    </div>
<Link to='/order-summary'>
                    <button className="bg-black  bg-gradient-to-r from-[#3a4e66] to-[#537090] w-full text-white py-2 rounded-md place-self-end  ">
                      Proceed To Checkout
                    </button>
</Link>
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
export { Cart };
