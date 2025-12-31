import { useContext } from "react";
import { useWishlist } from "../../../hooks/useWishlist";
import { WishlistCard } from "./components";
import WishlistSkeleton from "./components/WishlistSkeleton";
import { AuthContext } from "@context/AuthContext";
import EmptyPageLayout from "@components/common/EmptyPageLayout";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PublicRoutes } from "../../../utils/util.constant";

function Wishlist({ isSidebar, onClose }) {
  const { getUserWishlistData, wishlistLoading } = useWishlist();
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div
      className={`w-full h-full p-0 ${isSidebar ? "px-0 space-y-3" : "px-3 space-y-10 "} `}
    >
      <div className={`w-full `}>
        <div className={`border-b ${isSidebar ? "py-0" : "py-4 "} `}>
          <h1 className="text-2xl text-primary font-bold uppercase">
            My Wishlist
          </h1>
        </div>
      </div> 
      {isAuthenticated ? (
        wishlistLoading ? (
          <WishlistSkeleton />
        ) : getUserWishlistData.length === 0 ? (
          <EmptyPageLayout
            icon={HiOutlineShoppingBag}
            title="Your cart is empty"
            text="Looks like you haven't added anything to your cart yet. Start  exploring and shop your favorite items!"
            btnText="Browse Products"
            link={PublicRoutes.PRODUCTS}
            onCloseDrawer={onClose}
          />
        ) : (
          <WishlistCard isSidebar={isSidebar} />
        )
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
    </div>
  );
}
export default Wishlist;
