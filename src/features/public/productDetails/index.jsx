import Card from "@components/common/Card";
import { useGetProducts, useGetProductById } from "../../../hooks/useProducts";
import img from "@assets/images/img3.jpg";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { cartServices } from "../../../services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCart } from "../../../hooks/useCart";
import { Button, notification, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Alert } from "antd";
import { AuthContext } from "../../../context/AuthContext";

function ProductDetails() {
  const { data: cartData } = useGetCart();
  const { data: productsData, isPending, error } = useGetProducts();
  const [productQuantity, setProductQuantity] = useState(1);
  const { id: productId } = useParams();
  const { data: getProductDataById } = useGetProductById(productId);
  const [api, contextHolder] = notification.useNotification();
  const [showMaxQuantityError, setShowMaxQuantityError] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
    });
  };

  const queryClient = useQueryClient();

  const cart = cartData?.data?.data.items ?? [];
  const findProductInCart = cart.find((item) => item.product._id === productId);
  //  const products = productsData.data
  const product = getProductDataById?.data?.data ?? [];
  console.log(findProductInCart);
  const increaseQuantity = () => {
    setProductQuantity((prev) => (prev >= 15 ? prev : prev + 1));
  };
  const decreaseQuantity = () => {
    setProductQuantity((prev) => (prev <= 1 ? prev : prev - 1));
  };
  const { mutate: cartRequest, isPending: addToCartLoader } = useMutation({
    mutationFn: cartServices.addToCart,
    onMutate: async () => {
      setShowMaxQuantityError(false);
    },
    onError: (err) => {
      const code = err.response?.data?.code;
      if (code === "Max_Quantity") {
        setShowMaxQuantityError(true);
      }
    },
  });
  
  const addToCart = (id) => {
    if (!isAuthenticated) {
      openNotificationWithIcon("error", "Sign in to add items to your cart.");
      return;
    }
    // console.log(id)
    const existingItem = cart.find((item) => item.product._id === id);
    const newQuantity = existingItem
      ? existingItem.quantity + productQuantity
      : productQuantity;
    console.log("existing item", newQuantity);
    cartRequest(
      { productId: String(id), quantity: newQuantity },
      {
        onSuccess: () => {
          //  When mutation succeeds, refetch the cart data
          queryClient.invalidateQueries(["cart"]);
          openNotificationWithIcon("success", "Item added to cart");
        },
      },
     
    );
  };

  return (
    <section className="container    ">
      {contextHolder}

      <div className="flex flex-col  md:flex-row pt-10">
        <div className="w-full md:w-8/12 md:border-r-2 md:pr-2 lg:pr-20">
          <div className=" h-[  ]  rounded-md overflow-hidden">
            <img
              src={product.thumbnail?.url}
              className="w-full h-auto  "
              alt=""
            />
          </div>
        </div>
        <div className="md:pl-8 pt-2 md:pt-0 space-y-4 md:space-y-14 w-full md:w-5/12">
          <div className="flex justify-between items-center ">
            <h2 className="text-3xl font-bold capitalize">{product.name}</h2>
            <span className="block text-[#537090] font-bold text-lg">
              ${product.price}
            </span>
          </div>
          <div>
            <h3 className="text-base font-bold">Description:</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div>
            <div className="flex space-x-4 items-center">
              <h3 className="text-base font-bold">Quantity:</h3>
              <div className="space-x-4">
                <button
                  className="bg-slate-100 px-4 py-2 rounded-md text-lg"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span>{productQuantity}</span>

                <button
                  className="bg-slate-100 px-4 py-2 rounded-md text-lg"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            {showMaxQuantityError && (
              <p className="text-red-500 text-sm mt-2">
                Limit reached: The maximum quantity per product is 15. You
                already have {findProductInCart.quantity} units in your cart.
              </p>
            )}
          </div>
          {/* <Alert message="Error Text" type="error" /> */}

          <button
            className="bg-black  bg-gradient-to-r from-[#3a4e66] to-[#537090] w-full text-white py-2 rounded-md"
            onClick={() => addToCart(productId)}
            disabled={addToCartLoader}
          >
            {addToCartLoader ? (
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
                spinning={addToCartLoader}
              />
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
export { ProductDetails };
