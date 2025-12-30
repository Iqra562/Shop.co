import { PiHeartStraightBold } from "react-icons/pi";
import { LiaHeart } from "react-icons/lia";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlist,
} from "../../../hooks/useWishlist";
import { LiaHeartSolid } from "react-icons/lia";
import { useQueryClient } from "@tanstack/react-query";

function WishlistToggle({ productId }) {
  const { getUserWishlistData = [] } = useWishlist();
  const isWishlist = getUserWishlistData.some(
    (product) => product._id === productId
  );
  const { addToWishlist, wishlistUpdatePending } = useAddToWishlist();
  const { removeFromWishlist, deleteWishlistProductPending } =
    useRemoveFromWishlist();
  const addToWishlistHandler = () => {
    addToWishlist({ productId });
  };
  const removeFromWishlistHandler = () => {
    removeFromWishlist(productId);
  };
  return (
    <div>
      {isWishlist ? (
        <button disabled={deleteWishlistProductPending} onClick={removeFromWishlistHandler}>
          <LiaHeartSolid className="text-xl text-red-600 " />
        </button>
      ) : (
        <button disabled={wishlistUpdatePending}  onClick={addToWishlistHandler}>
          <LiaHeart className="text-xl text-secondary " />
        </button>
      )}
    </div>
  );
}

export default WishlistToggle;
