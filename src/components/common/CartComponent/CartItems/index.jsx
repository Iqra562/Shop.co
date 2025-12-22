import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";


function CartItems({cart,itemsSummary,totalProductSummaryHandler,removeCartItemHandler,decreaseQuantity,increaseQuantity,smallSize}){
return(
    <> 
  {cart.map((item, i) => {
                    const isItemAdded = itemsSummary.some(
                      (summary) => summary.product._id === item.product._id
                    );
                    return (
                      <div
                        key={i}
                        className={`${smallSize ? 'h-24 px-2 py-2' : 'md:h-36 px-4 py-4'}  flex items-start space-x-2 md:space-x-3 border-slate-100 border shadow-sm shadow-slate-200 rounded-lg  w-full cursor-pointer ${isItemAdded ? "bg-gray-100" : "bg-white"}`}
                        onClick={() => totalProductSummaryHandler(item._id)}
                      >
                        <div className="flex  w-full h-full">
                          <div className={`${smallSize ? 'w-32 h-20 bg-red-900' : ' w-6/12 md:w-3/12 h-full'} rounded-md overflow-hidden`}>
                            <Link to={`/product-details/${item.product._id}`}>
                              <img
                                src={item.product.thumbnail.url}
                                alt=""
                                className={`${smallSize ? 'w-full h-full':' w-full h-20 md:h-full '} object-cover object-top `}
                              />
                            </Link>
                          </div>

                          <div className={`pl-2 ${smallSize ? 'md:pl-4' :'md:pl-8 '} w-full flex flex-col justify-between `}>
                            <div className="flex justify-between  w-full items-center">
                              <h2 className={`${smallSize ? 'text-xl' : 'text-2xl'}  font-bold`}>
                                {item.product.name}
                              </h2>
                              <span
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeCartItemHandler(item._id);
                                }}
                                className="cursor-pointer z-10"
                              >
                                <RxCross2 className="text-black text-sm" />
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <h3 className={`${smallSize ? 'text-base ':'text-xl'}  font-bold text-secondary`}>
                                ${item.product.price}
                              </h3>
                              <div>
                                <div className="space-x-1 flex items-center">
                                  <button
                                    className={`bg-slate-200  ${smallSize ? 'px-3 py-0.5 text-base':'px-4 py-1 text-lg'} rounded-md `} 
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      decreaseQuantity(item.product._id);
                                    }}
                                  >
                                    <span className="mb-1">-</span>{" "}
                                  </button>
                                  <span className={`${smallSize ? 'text-sm' : 'text-base'} font-bold`}>
                                    {String(item.quantity).padStart(2, "0")}
                                  </span>
                                  <button
                                    className={`bg-slate-200 ${smallSize ? 'px-3 py-0.5 text-base':'px-4 py-1 text-lg'}   rounded-md`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      increaseQuantity(item.product._id);
                                    }}
                                  >
                                    <span className="mb-1">+</span>{" "}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
    </>
) 

}

export default CartItems;