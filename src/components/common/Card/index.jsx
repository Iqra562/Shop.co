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
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg ">
        <div className="p-2">
          <div className="h-28  md:h-60 lg:h-60 overflow-hidden  rounded-3xl relative">
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
        <div className="pt-3 space-y-6 p-2 md:p-4 py-3">
          <div>
            <div className="flex justify-between items-center pr-2">
              <p className="font-bold text-lg md:text-2xl capitalize text-paragraphDark">
                {productName}{" "}
              </p>

              <WishlistToggle productId={id} />
            </div>
            {/* <p className='text-base capitalize'>{description}</p> */}
            <p className="text-sm font-semibold capitalize my-2 line-clamp-2 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              voluptatem a cum fugit at nesciunt aperiam sit nisi minima
              repellat, molestiae, aspernatur debitis tenetur perspiciatis
              voluptate placeat! Sint, sed sequi.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 ">
            <div className="flex items-center space-x-2">

            <span className={`block  font-bold ${onsale ? 'line-through text-red-700 text-sm md:text-base':'text-secondary  text-base md:text-lg'}`}>
              ${price}
            </span >
             {
                onsale && <span className={`block text-secondary font-bold text-base md:text-lg`}>${ price - (price * discount / 100)}</span>
              }
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
