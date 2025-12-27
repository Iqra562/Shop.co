import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthenticatedUserRoutes } from "@utils/util.constant.js";
import { useFetchUserData } from "@hooks/useUser.js";
import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

function ProfileInfo() {
  const { getUserData } = useFetchUserData();

  // console.log(getUserData);
  return (
    <div className="rounded-2xl shadow overflow-hidden">
      <div className=" p-6 text-black ">
        <div className="flex items-center gap-4">
          <div  
            className="w-14 h-14 p-5 rounded-full bg-black text-white 
                  flex items-center justify-center text-xl font-bold uppercase"
          >
            {getUserData?.name?.charAt(0)}{" "}
          </div>
          <div className="flex justify-between w-full">
            <div>
              <h2 className="text-xl font-bold uppercase"> {getUserData?.name}</h2>
              <p className=""> {getUserData?.email}</p>
            </div>
            <div>
              <Link to={AuthenticatedUserRoutes.EDITPROFILE}>
              <button className="text-secondary font-semibold hover:underline">
                Edit
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileInfo;
