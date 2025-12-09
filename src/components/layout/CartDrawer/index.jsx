import React, { useContext, useEffect, useState } from "react";
import { Button, Drawer } from "antd";
import EmptyPageLayout from "../../common/EmptyPageLayout";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { AuthContext } from "@context/AuthContext";
import { TiArrowRight } from "react-icons/ti";
import { PublicRoutes } from "@utils/util.constant";
import { AuthenticatedUserRoutes } from "../../../utils/util.constant";

function CartDrawer({ open, onClose }) {
    const { isAuthenticated } = useContext(AuthContext);
  
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
        headerStyle={{ borderBottom: "none" }}
        styles={{
          wrapper: {
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            overflow: "hidden",
          }, 
        }} 
      >

        {
                isAuthenticated ? (  <EmptyPageLayout
          icon={HiOutlineShoppingBag}
          title="Your cart is empty"
          text="Looks like you haven't added anything to your cart yet. Start  exploring and shop your favorite items!"
          btnText="Go to Cart" 
               link={AuthenticatedUserRoutes.CART}
          btnIcon={TiArrowRight}
        />):(  <EmptyPageLayout
          icon={HiOutlineShoppingBag}
          title="You’re not logged in"
          text="Sign in to view your cart and continue shopping your favorite items."
          btnText="Login"
          link={PublicRoutes.LOGIN}
          btnIcon={TiArrowRight}
        />)

        }
      
      </Drawer>
    </>
  );
}
export default CartDrawer;
