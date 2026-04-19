import { MdEdit } from "react-icons/md";
import { AuthenticatedUserRoutes } from "@utils/util.constant";
import { Link } from "react-router-dom";
import { useDeleteAddressMutation, useFetchUserData } from "@hooks/useUser";
import { BiSolidMap } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import Modal from "@components/common/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { OrderContext } from "../../../../context/OrderContext";
import EditAddressBook from "../../profile/components/editaddressBook";

function GetUserAddress() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { getUserData } = useFetchUserData();
  const address = getUserData?.address ?? [];
  const [addressId, setAddressId] = useState(null);
  const {address: selectedAddress, setAddress: setSelectedAddress} = useContext(OrderContext)
  console.log(address);
  const openModalHandler = (id) => {
    setIsModalOpen(true);
    setAddressId(id);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setAddressId(null);
  };
  useEffect(() => {
       setSelectedAddress(address[0]);
       console.log(selectedAddress);
     }, [address]);
    const selectAddressHandler = (id) => {
      setSelectedAddress(address.find((item) => item._id === id)  );
      console.log(selectedAddress);
    }

  return (
    <div className="space-y-5">
   
      <div className=" py-5">
         

        {address?.length === 0 ? (
          <div className="flex justify-center items-center   ">
         <EditAddressBook noRedirection={true}/>
           </div>
        ) : (
            <div className="">
          <h2 className="text-xl font-bold">Select Address</h2>
       
          <div className="grid-cols-1 md:grid-cols-2 space-y-8 bg-gray-100 rounded-2xl p-2 ">
            <div className="grid grid-cols-1 gap-6">
              {address?.map((data, index) => (
                <div 
                  key={data?._id || index}
                  className={`bg-white rounded-xl shadow p-6 relative cursor-pointer ${selectedAddress?._id === data._id ? 'border-2 border-secondary ' : 'border border-gray-200'}`}
                  onClick={()=>selectAddressHandler(data._id)}
                >
                  {data?.isDefault && (
                    <span className="absolute top-4 right-4 text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">
                      Default
                    </span> 
                  )}
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    📍  Address #0{index+1}
                  </h3>
                  <h4 className="font-medium">{data?.fullName}</h4>
                  <p className="text-gray-600 text-sm">
                    {data?.city}, {data?.postalCode}, {data?.state},{" "}
                    {data?.street}
                  </p>
                  <span className="text-gray-600 text-sm">{data?.phone}</span>
                 
                </div>
              ))}
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default GetUserAddress;
