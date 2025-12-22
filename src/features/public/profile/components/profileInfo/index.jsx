import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { AuthenticatedUserRoutes } from "../../../../../utils/util.constant.js";
import { useFetchUserData } from "../../../../../hooks/useUser.js";


function ProfileInfo(){
  const {getUserData} =useFetchUserData();
  console.log(getUserData)
    return(
     
     <div className=" w-full border rounded-md px-5 md:px-10 py-5 ">

       {/* <div className=" w-full h-fit flex justify-between border-b">
                <h2 className="text-base font-bold text-gray-600 capitalize ">Profile Information</h2>
                  <div className="text-sm">
                    <Link to={AuthenticatedUserRoutes.EDITPROFILE}>
                    <MdEdit/>
                    </Link>
                </div>
              </div>
               <div className=" mt-2">
           <div className="flex justify-between">
  <div className="w-6/12 md:space-y-2">
    <div className="w-full  py-2 text-black font-bold  text-sm">User Name</div>
    <div className=" text-sm capitalize">{getUserData?.name}</div>
  </div>
 
  <div className="w-6/12 md:space-y-2">
    <div className="w-full px-2 py-2 text-black font-bold  text-sm">Email</div>
    <div className="px-2 text-sm">{getUserData?.email}</div>
  </div>
 
 
           </div>
         </div> */}

         <div>
          <div className="flex">
<span>
  User name:
</span>
          <h2 className="text-">Iqra</h2>
          </div>
          <h6>iqra@gmail.com</h6>
         </div>
     </div>
     
 
                 
    )
}
export default ProfileInfo;