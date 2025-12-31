import React, { useContext, useEffect, useState } from "react";
import { Drawer } from "antd";
import { FiHeart } from "react-icons/fi";
import EmptyPageLayout from "../../common/EmptyPageLayout";
import { PublicRoutes } from "@utils/util.constant";
import { AuthContext } from "@context/AuthContext";
import { TiArrowRight } from "react-icons/ti";
import Wishlist from "../../../features/public/wishlist";

function WishlistDrawer({ open, onClose }) {
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
        {/* {isAuthenticated ? (
          <EmptyPageLayout 
            icon={FiHeart}
            title="Your Wishlist is empty"
            text="It looks like you haven't added anything to your wishlist yet. Start exploring and add your favorite items!"
            btnText="Browse Products"
            onCloseDrawer={onClose}
                        link={PublicRoutes.PRODUCTS}

          /> 
        ) : (
          <EmptyPageLayout
            icon={FiHeart}
            title="You’re not logged in"
            text="Sign in to view your wishlist and continue shopping your favorite items."
            btnText="Login"
            link={PublicRoutes.LOGIN}
            btnIcon={TiArrowRight}
          />
        )} */}
        <div className="h-full">
        <Wishlist isSidebar={true} onClose={onClose}/>

        </div>
      </Drawer>
    </>
  );
}
export default WishlistDrawer;
