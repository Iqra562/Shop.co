import { Link } from "react-router-dom";
import product1 from "../../../assets/images/product1.jpg";
import AddToCart from "../CartComponent/AddToCart";
import WishlistToggle from "../WishlistToggle";
function Card({
  id,
  img,
  productName,
  description,
  price,
  onsale,
  discount,
  addToCart = () => {},
}) {
  return (
    <>
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg h-full flex flex-col justify-between">
        <div className="p-2">
          <div className="h-60  md:h-60 lg:h-60 overflow-hidden  rounded-3xl relative">
            {onsale &&
               <div className="absolute z-10 px-2 py-1 bg-red-800 text-white left-2 top-3 rounded-md text-xs font-bold uppercase">on sale</div>
            }
            <Link to={`/product-details/${id}`}>
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </Link>
          </div>
        </div>
        <div className=" flex flex-1 flex-col justify-between pt-3 space-y-6  px-5 md:p-4 py-3 ">
          <div className="">
            <div className="flex justify-between items-baseline ">
              <p className="font-bold text-xl md:text-2xl capitalize text-paragraphDark">
                {productName}{" "}
              </p> 

              <WishlistToggle productId={id} />
            </div>
            {/* <p className='text-base capitalize'>{description}</p> */}
            <p className="text-sm font-semibold capitalize my-2 line-clamp-2 text-gray-500">
              {description}
            </p>
          </div>
          <div className="flex flex-row justify-between space-y-2 md:space-y-0 ">
            <div className="flex items-center space-x-2">
             {
                onsale && <span className={`block text-secondary font-bold text-lg`}>${ price - (price * discount / 100).toFixed(2)}</span>
              }

            <span className={`block  font-bold ${onsale ? 'line-through text-red-700 text-base':'text-secondary text-lg'}`}>
              ${price}
            </span >
              </div>
            {/* <button className='bg-primary-button-gradient w-fit px-2 py-1 text-xs font-bold text-white rounded-md '>
                ADD TO CART
              </button> */}
            <AddToCart
              classAttributes="bg-primary-button-gradient w-fit px-3 py-2 text-xs font-bold text-white uppercase rounded-2xl"
              productId={id}
            />
          </div>
         
        </div>
      </div>
    </>
  );
}

export default Card;
