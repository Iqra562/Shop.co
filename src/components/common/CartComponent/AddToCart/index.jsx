import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { AuthContext } from "@context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useCartActions } from "@hooks/cart/useCartActions";
import { Button, Popover } from "antd";

function AddToCart({
  productId,
  quantity,
  classAttributes,
  onSuccess,
  onError,
  setShowMaxQuantityError = () => {},
}) {
  const { increaseQuantity, addToCartLoader } = useCartActions();
  const [api, contextHolder] = notification.useNotification();
  const { isAuthenticated } = useContext(AuthContext);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverContent, setpopoverContent] = useState("");
  const [popoverError, setpopoverError] = useState(false);
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
      style: {
        backgroundColor: "#fff",
      },
    });
  };

  const handleAddToCart = () => {
    setShowMaxQuantityError(false);
    setpopoverContent("");
    setShowPopover(false);

    if (!isAuthenticated) {
      openNotificationWithIcon("error", "Sign in to add items to your cart.");
      return;
    }
    increaseQuantity(
      productId,
      {
        onSuccess: onSuccess
          ? onSuccess
          : () => {
              setShowPopover(true);
              setpopoverContent("Product added to cart!");
              setTimeout(() => {
                setShowPopover(false);
              }, 2000);
            },
        onError: onError
          ? onError
          : (error, code) => {
              setShowPopover(true);
              setpopoverError(true);
              if (code === "Max_Quantity") {
                setpopoverContent("Maximum of 15 products added!");
              } else {
                setpopoverContent("Something went wrong.Try it again!");
              }
              setTimeout(() => {
                setShowPopover(false);
              }, 2000);
            },
      },
      quantity
    );
  };

  return (
    <>
      {contextHolder}
      <Popover
        open={showPopover}
        placement="top"
        arrow={false}
        content={
          <div
            className={`text-xs ${popoverError ? "text-red-800" : "text-paragraphDark"}  font-medium`}
          >
            {popoverContent}
          </div>
        }
      >
        <span>
          <button
            className={`${classAttributes}`}
            onClick={handleAddToCart}
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
              "Add to Cart"
            )}
          </button>
        </span>
      </Popover>
    </>
  );
}

export default AddToCart;
