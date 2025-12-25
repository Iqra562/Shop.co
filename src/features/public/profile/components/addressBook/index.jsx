import { MdEdit } from "react-icons/md";
import { AuthenticatedUserRoutes } from "../../../../../utils/util.constant";
import { Link } from "react-router-dom";
import { useFetchUserData } from "../../../../../hooks/useUser";
import { BiSolidMap } from "react-icons/bi";

function AddressBook() {
  const { getUserData } = useFetchUserData();
// console.log(getUserData)
  return (
    <div className="space-y-5"> 
     

      <div className=" py-5">
         <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Address Book</h2>
          <Link to={AuthenticatedUserRoutes.ADDADDRESS}>
          <button className="px-4 py-2 border bg-secondary text-white rounded-lg">
            + Add Address
          </button>
          </Link>
        </div>

        {getUserData?.address.length === 0 ? (
          <div className="flex justify-center items-center  h-40">
            <p className="text-gray-400 text-xl">No Address provided</p>
          </div>
        ) : (
 <div className="grid-cols-1 md:grid-cols-2 space-y-8">
       
        <div className="grid grid-cols-2 gap-6">
          {
            getUserData?.address.map((data,index)=>(
   <div       key={data?._id || index}
 className="bg-white rounded-xl shadow p-6 relative">
          {data?.isDefault && (
        <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
          Default
        </span>
      )}
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              📍 Home Address
            </h3>
      <h4 className="font-medium">{data?.fullName}</h4>
            <p className="text-gray-600 text-sm">
              {data?.city}, {data?.postalCode}, {data?.state},  {data?.street}
            </p>
            <span className="text-gray-600 text-sm">{data?.phone}</span>
            <div className="flex gap-4 mt-4 text-sm">
              <Link to={AuthenticatedUserRoutes.EDITADDRESS.replace(":id",data._id)}>
              <button className="text-secondary font-semibold hover:underline">
                Edit
              </button>
              </Link>
              <button className="text-red-500 font-semibold hover:underline">
                Delete
              </button>
            </div>
          </div>
            ))
          }
       

          
        </div>
      </div>        )}
      </div>
    </div>
  );
}
export default AddressBook;
