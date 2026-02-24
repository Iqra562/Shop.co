import { useContext } from "react";
import { useWishlist } from "../../../hooks/useWishlist";
import { WishlistCard } from "./components";
import WishlistSkeleton from "./components/WishlistSkeleton";
import { AuthContext } from "@context/AuthContext";
import EmptyPageLayout from "@components/common/EmptyPageLayout"; 
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PublicRoutes } from "../../../utils/util.constant";
import { TiArrowRight } from "react-icons/ti";

function Wishlist({ isSidebar, onClose }) {
  const { getUserWishlistData, wishlistLoading } = useWishlist();
  const { isAuthenticated } = useContext(AuthContext);
  console.log(getUserWishlistData,'data')
  return (
    <div
      className={`w-full  p-0 ${isSidebar ? "px-0 space-y-3 h-full " : "px-3 space-y-10 "} `}
    >
       
      {isAuthenticated ? (
        
        wishlistLoading ? (
          <WishlistSkeleton />
        ) : !getUserWishlistData || getUserWishlistData.length === 0 ? (
          <EmptyPageLayout 
            icon={HiOutlineShoppingBag}
            title="Your wishlist is empty"
text="Looks like you haven't added anything to your wishlist yet. Start exploring and save your favorite items!"
            btnText="Browse Products"
            link={PublicRoutes.PRODUCTS}
            onCloseDrawer={onClose}
          />
        ) : (
          <>
           <div className={`w-full `}>
        <div className={`border-b ${isSidebar ? "py-0" : "py-4 "} `}>
          <h1 className="text-2xl text-primary font-bold uppercase">
            My Wishlist
          </h1>
        </div>
      </div>
          <WishlistCard isSidebar={isSidebar} data={getUserWishlistData}/>
          </>
        )
      ) : (
        <EmptyPageLayout
          icon={HiOutlineShoppingBag}
          title="You’re not logged in"
          text="Sign in to view your wishlist and continue shopping your favorite items."
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
