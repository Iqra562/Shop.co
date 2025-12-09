import { Link } from "react-router-dom";
import { PublicRoutes } from "@utils/util.constant";
import { HiOutlineShoppingBag } from "react-icons/hi";

function EmptyPageLayout({ icon: Icon, title, text, link, btnText ,btnIcon : BtnIcon}) {
  return ( 
    <div className=" flex flex-col items-center justify-center  h-full">
      <div className="space-y-4 md:space-y-4">
        <div className="w-full flex justify-center">
          <Icon className="text-7xl md:text-9xl text-[#2d3d32]" />
        </div>
        <div className=" mx-auto space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-[#1f1f1f] uppercase">
            {title}{" "}
          </h2>
          <div className="w-full  mx-auto">
            <p className="text-center text-gray-500">{text}</p>
          </div>
        </div>
        <div>
          <Link to={link} className=" ">
            <button className="bg-primary-button-gradient  px-8  text-white py-2 rounded-md mx-auto flex justify-center items-center space-x-">
              <span>

              {btnText}
              </span>
              {BtnIcon && (

                
                <span>
                          <BtnIcon className="text-xl text-[#fff]" />

              </span>
                )
              }
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmptyPageLayout;
