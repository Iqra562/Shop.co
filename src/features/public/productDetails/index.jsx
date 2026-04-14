import Card from "@components/common/Card";
import { useGetProducts, useGetProductById } from "../../../hooks/useProducts";
import img from "@assets/images/img3.jpg";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { cartServices } from "../../../services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCart } from "../../../hooks/cart/useCartData.js";
import { Button, notification, Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { Alert } from "antd";
import { AuthContext } from "../../../context/AuthContext";
import AddToCart from "../../../components/common/CartComponent/AddToCart/index.jsx";
import WishlistToggle from "../../../components/common/WishlistToggle/index.jsx";
import ProductSwiper from "../../../components/common/ProductSwiper/index.jsx";

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
      style: {
        backgroundColor: "#fff", // Force white background
      },
    });
  };

  const cart = cartData?.data?.data.items ?? [];
  const findProductInCart = cart.find((item) => item.product?._id === productId);
  //  const products = productsData.data
  const product = getProductDataById?.data?.data ?? [];
  console.log(product)
console.log(
  ...(product?.galleryImages?.map(image => image.url) || []),
  product?.thumbnail?.url
);  // console.log(findProductInCart);
  const increaseQuantity = () => {
    setProductQuantity((prev) => (prev >= 15 ? prev : prev + 1));
  };
  const decreaseQuantity = () => {
    setProductQuantity((prev) => (prev <= 1 ? prev : prev - 1));
  };
  useEffect(() => {
    setShowMaxQuantityError(false);
    setProductQuantity(1);
  }, [productId]);

  return (
    <section className="container ">
      {contextHolder}

      <div className="flex flex-col  md:flex-row pt-10 space-y-10 md:space-y-0">
        <div className="w-full md:w-6/12 md:border-r-2 md:pr-2 lg:pr-20 xl:pr-32">
          <div className=" rounded-md overflow-hidden">
            {/* <img
              src={product?.thumbnail?.url}
              className="w-full h-auto  "
              alt=""
            /> */}
            <ProductSwiper product={[ product?.thumbnail?.url, ...(product?.galleryImages?.map(image => image.url) || []),
 ]} />
          </div>
        </div>
        <div className="md:pl-8 pt-2 md:pt-0 space-y-4 md:space-y-14 w-full md:w-6/12">
          <div className="space-y-4">
            <div className="flex justify-between items-center ">
              <h2 className="text-3xl font-bold capitalize text-paragraphDark">
                {product?.name}
              </h2>
              <WishlistToggle productId={productId} />
            </div>

            <div className="flex flex-col-reverse items-start ">
              <div className="flex space-x-1 items-center">
                <span
                  className={`block  ${product?.onsale ? "line-through text-red-600 text-sm md:text-base font-semibold " : "text-secondary  text-lg md:text-2xl  font-bold"}`}
                >
                  ${product.price}
                </span>
                {product?.onsale && (
                  <span className="text-gray-500 text-xs font-semibold">
                    -{product?.discountPrice}%
                  </span>
                )}{" "}
              </div>
              {product.onsale && (
                <span
                  className={`block text-secondary font-bold text-lg md:text-2xl`}
                >
                  $
                  {product?.price -
                    (product?.price * product?.discountPrice) / 100}{" "}
                  <span></span>
                </span>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold">Description:</h3>
            <p className="text-gray-600 capitalize">{product?.description}</p>
          </div>
          <div>
            <div className="flex space-x-4 items-center">
              <h3 className="text-base font-bold">Quantity:</h3>
              <div className="space-x-4">
                <button
                  className="bg-slate-100 px-4 py-1 rounded-md text-lg"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span>{productQuantity}</span>

                <button
                  className="bg-slate-100  px-4 py-1 rounded-md text-lg"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            </div>
            {showMaxQuantityError && (
              <p className="text-red-500 text-sm mt-2">
                Limit reached: The maximum quantity per product is 15. You
                already have {findProductInCart?.quantity} units in your cart.
              </p>
            )}
          </div>
          {/* <Alert message="Error Text" type="error" /> */}

          <div>
            <AddToCart
              classAttributes="bg-primary-button-gradient w-full text-white py-2 rounded-md uppercase font-bold"
              productId={productId}
              quantity={productQuantity}
              setShowMaxQuantityError={setShowMaxQuantityError}
              onSuccess={() => {
                openNotificationWithIcon("success", "Product added to cart");
              }}
              onError={(err, code) => {
                if (code === "Max_Quantity") {
                  setShowMaxQuantityError(true);
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export { ProductDetails };
