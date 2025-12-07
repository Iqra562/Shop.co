import Card from "@components/common/Card";
import img from "@assets/images/img3.jpg";
import { Link } from "react-router-dom";

import { PublicRoutes } from "@utils/util.constant";
import { HiOutlineShoppingBag } from "react-icons/hi";

function EmptyCart() {
  return (
    <div className="h-screen flex flex-col items-center pt-20 md:pt-32 ">
      <div className="space-y-4 md:space-y-4">
        <div className="w-full flex justify-center">
          <HiOutlineShoppingBag className="text-7xl md:text-9xl text-[#2d3d32]" />
        </div>
        <div className=" mx-auto space-y-4">
          <h2 className="text-3xl md:text-5xl font-semibold text-center text-[#1f1f1f] uppercase">
            Your cart is empty
          </h2>
          <div className="w-full md:w-8/12 mx-auto">
            <p className="text-center text-gray-500">
              Looks like you haven't added anything to your cart yet. Start
              exploring and shop your favorite items!
            </p>
          </div>
        </div>
        <div>
          <Link to={PublicRoutes.PRODUCTS} className=" ">
            <button className="bg-primary-button-gradient  px-8  text-white py-2 rounded-md mx-auto flex justify-center items-center space-x-2"> 
              {" "}
              <span>Browse Products</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyCart;
