import { useRemoveFromWishlist, useWishlist } from "@hooks/useWishlist";
import AddToCart from "@components/common/CartComponent/AddToCart";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AuthenticatedUserRoutes } from "../../../../../utils/util.constant";
import { TiArrowRight } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

function WishlistCard({ isSidebar, onClose,data:getUserWishlistData }) {
  // const { getUserWishlistData } = useWishlist();

  const { removeFromWishlist, deleteWishlistProductPending } =
    useRemoveFromWishlist();

  const removeFromWishlistHandler = (productId) => {
    removeFromWishlist(productId);
  };
  return (
    <>
      <div
        className={`flex flex-col gap-x-3   ${isSidebar ? "w-full h-[70vh] flex justify-start  overflow-y-auto  space-y-1 gap-y-2 " : "gap-y-5 "} `}
      >
        {getUserWishlistData?.map((product, index) => {
          return (
            <>
            <div
              key={index}
              className={`md:h-36 px-4 py-4  flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg  w-full cursor-pointer bg-white`}
            >
              <div className="flex  w-full h-full">
                <div
                  className={`${isSidebar ? "w-8/12" : "w-6/12 md:w-3/12 "}  h-full'} rounded-md overflow-hidden`}
                >
                  <Link to={`/product-details/${product._id}`}>
                    <img
                      src={product.thumbnail.url}
                      alt=""
                      className={` w-full h-20 md:h-full object-cover object-top `}
                    />
                  </Link>
                </div>

                <div
                  className={`${isSidebar ? "pl-3" : "pl-2 md:pl-8 "} w-full flex flex-col justify-between `}
                >
                  <div className="flex justify-between  w-full items-center">
                    <h2
                      className={`${isSidebar ? "text-xl" : "text-2xl"}  font-bold`}
                    >
                      {product.name}{" "}
                    </h2>
                    <button
                      disabled={deleteWishlistProductPending}
                      onClick={() => removeFromWishlistHandler(product._id)}
                    >
                      <RxCross2 className="text-red-800 text-xl" />
                    </button>
                  </div>
                  <div className="flex justify-between">
                    <h3
                      className={`${isSidebar ? "text-base" : " text-xl"} font-bold text-secondary`}
                      >
                      ${product.price}
                    </h3>
                    <div>
                      <div className="space-x-1 flex items-center">
                        {!isSidebar && (
                          <AddToCart
                            classAttributes="bg-primary-button-gradient w-fit px-2 py-1 text-xs font-bold text-white uppercase rounded-md"
                            productId={product._id}
                          />
                        )}{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                </>
          );
        })}
      </div>
      {isSidebar && (
        <div className="pt-2">
          <Link to={AuthenticatedUserRoutes.WISHLIST} className=" ">
            <button
              onClick={onClose}
              className="bg-primary-button-gradient  px-8  text-white py-2 rounded-md mx-auto flex justify-center items-center space-x- w-full"
            >
              <span>View Wishlist </span>

              <span>
                <TiArrowRight className="text-xl text-[#fff]" />
              </span>
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export { WishlistCard };
