import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { useContext, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCart } from "@hooks/cart/useCartData.js";
import { notification, Spin } from "antd";
import { useCartActions } from "@hooks/cart/useCartActions.js";
import { useCartSelection } from "@hooks/cart/useCartSelection.js";
import { useCartSummary } from "@hooks/cart/useCartSummary.js";
import { AuthContext } from "@context/AuthContext";
import EmptyPageLayout from "../EmptyPageLayout";
import CartSkeleton from "./CartSkeleton";
 import {
  AuthenticatedUserRoutes,
  PublicRoutes,
} from "../../../utils/util.constant";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { TiArrowRight } from "react-icons/ti";

function CartComponent({ isSidebar, onCloseDrawer = () => {} }) {
  const {
    data: cartData,
    dataUpdatedAt,
    isFetched,
    isPending,
    error,
  } = useGetCart();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
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
  const { increaseQuantity, decreaseQuantity, removeCartItemHandler } =
    useCartActions();

  const {
    subTotal,
    totalItems,
    grandTotal,
    totalProductSummaryHandler,
    proceedToCheckout,
    loader,
  } = useCartSummary({
    itemsSummary,
    setItemsSummary,
    cart,
    onNotify: notify,
    onNavigate: navigate,
  });
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {contextHolder}

      {isAuthenticated ? (
        <>
          {isPending ? (
            <CartSkeleton isSidebar={isSidebar} />
          ) : cart.length === 0 ? (
            <div className=" h-[80vh]">
              <EmptyPageLayout
                icon={HiOutlineShoppingBag}
                title="Your cart is empty"
                text="Looks like you haven't added anything to your cart yet. Start  exploring and shop your favorite items!"
                btnText="Browse Products"
                link={PublicRoutes.PRODUCTS}
                onCloseDrawer={onCloseDrawer}
              />
            </div>
          ) : (
            <div className="flex flex-col flex-1">
              <div className={`border-b ${!isSidebar && "py-4"}`}>
                <h1 className="text-2xl text-primary font-bold uppercase">
                  Your cart
                </h1>
              </div>
              <div
                className={`flex  flex-col ${isSidebar ? "md:flex-col justify-between  h-full " : "md:flex-row "}  pt-3`}
              >
                <div
                  className={`w-full ${isSidebar ? "w-full h-[70vh]  overflow-y-auto  space-y-5" : "md:w-8/12 border-b-2 pb-10 md:border-b-0 md:border-r-2 md:pr-4 lg:pr-5 xl:pr-20  mb-10    md:min-h-screen space-y-4 "}   `}
                >
                  <CartItems
                    cart={cart}
                    itemsSummary={itemsSummary}
                    totalProductSummaryHandler={totalProductSummaryHandler}
                    removeCartItemHandler={removeCartItemHandler}
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                    smallSize={isSidebar}
                  />
                </div>

                {isSidebar ? (
                  <div className="pt-2">
                    <Link to={AuthenticatedUserRoutes.CART} className=" ">
                      <button
                        onClick={onCloseDrawer}
                        className="bg-primary-button-gradient  px-8  text-white py-2 rounded-md mx-auto flex justify-center items-center space-x- w-full"
                      >
                        <span>View Cart </span>

                        <span>
                          <TiArrowRight className="text-xl text-[#fff]" />
                        </span>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div
                    className={` w-full ${!isSidebar && "md:w-5/12 sticky top-36 md:pl-2 lg:pl-8 space-y-14 self-start"}    `}
                  >
                    <CartSummary
                      totalItems={totalItems}
                      subTotal={subTotal}
                      grandTotal={grandTotal}
                      proceedToCheckout={proceedToCheckout}
                      loader={loader}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <EmptyPageLayout
          icon={HiOutlineShoppingBag}
          title="You’re not logged in"
          text="Sign in to view your cart and continue shopping your favorite items."
          btnText="Login"
          link={PublicRoutes.LOGIN}
          btnIcon={TiArrowRight}
          onCloseDrawer={onClose}
        />
      )}
    </>
  );
}

export default CartComponent;
