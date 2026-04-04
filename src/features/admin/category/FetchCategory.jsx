import { Link } from "react-router-dom";
import { AdminRoutes } from "../../../utils/util.constant";
import { MdOutlineAdd } from "react-icons/md";
import CategorySelector from "../../../components/common/CategorySelector";

function FetchCategory(){
    return (
  <div className="container">
      <div className="mb-10 flex items-center ">
        <div className="space-y-5 ">
          <h1 className="text-2xl font-bold mt-5">List</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm ">
              <Link to={AdminRoutes.DASHBOARD}>Dashboard</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm ">
              <Link to={AdminRoutes.FETCHPRODUCTS}>Category</Link>
            </span>{" "}
            <span className="h-[2px] w-[2px] p-[2px] bg-gray-400 rounded-full"></span>
            <span className="text-sm text-gray-400  ">List</span>{" "}
          </div>
        </div>
        <button className="bg-primary-button-gradient ml-auto flex justify-center items-center  px-5 py-3 text-sm font-bold text-white  rounded-md">
          <MdOutlineAdd className="font-bold" />
          Add category{" "}
        </button>
        <div></div>
      </div>    

      <div className="bg-white p-2 rounded-lg">
     <CategorySelector/>        
        </div>    
      </div>        
     )
}
export default FetchCategory;