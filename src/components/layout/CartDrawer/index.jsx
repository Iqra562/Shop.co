import React, { useEffect } from "react";
import { Button, Drawer } from "antd";
import CartComponent from "../../common/CartComponent";

function CartDrawer({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  return (
    <>
      <Drawer
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        styles={{
          wrapper: {
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            overflow: "hidden",
            backgroundColor: "red",
          },
          header: {
            borderBottom: "none",
          },

          body: { 
            flex: 1,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <CartComponent isSidebar={true} onCloseDrawer={onClose} />
      </Drawer>
    </>
  );
}
export default CartDrawer;
