import { MdEdit } from "react-icons/md";
import { AuthenticatedUserRoutes } from "../../../../../utils/util.constant";
import { Link } from "react-router-dom";
import { useFetchUserData } from "../../../../../hooks/useUser";

function AddressBook() {
  const { getUserData } = useFetchUserData();
 

  //  console.log(getUserData,'lkj')
  return (
    <div className=" w-full border rounded-md px-5 md:px-10 py-5 ">
      <div className=" w-full h-fit flex  justify-between border-b">
        <h2 className="text-base font-bold text-gray-600 capitalize ">
          Address{" "}
        </h2>
        <div className="text-sm">
          <Link to={AuthenticatedUserRoutes.ADDADDRESS}> Add</Link>
        </div>
      </div>
      <div className=" py-5">
        {getUserData?.address.length === 0 ? (
          <div className="flex justify-center">
            <p className="text-gray-400">No data provided</p>
          </div>
        ) : (
    <div className="overflow-x-auto no-scrollbar">
  <table className="min-w-full  ">
    <thead className="w-full ">
      <tr className=" space-x-12 w-full">
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">Full Name</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">Contact</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">Street</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">City</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">State</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0">Postal Code</th>
        <th className="py-2 text-black font-bold text-sm text-left whitespace-nowrap pr-20 md:pr-0"> </th>
      </tr>
    </thead> 
    <tbody>
      {getUserData?.address.map((list, index) => (
        <tr key={list._id || index} className=" space-x-2 border-b border-gray-200 py-4">
          <td className="py-2 text-sm">{list.fullName}</td>
          <td className="py-2 text-sm">{list.phone}</td>
          <td className="py-2 text-sm">{list.street}</td>
          <td className="py-2 text-sm">{list.city}</td>
          <td className="py-2 text-sm">{list.state}</td>
          <td className="py-2 text-sm">{list.postalCode}</td>
          <td className=" py-2 text-sm flex justify-end">
            <Link
              to={AuthenticatedUserRoutes.EDITADDRESS.replace(
                ":id",
                list._id
              )}
              className="inline-block"
            >
              <MdEdit />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          
         
        )}
      </div>
    </div>
  );
}
export default AddressBook;
