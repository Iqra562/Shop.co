import { MdEdit } from "react-icons/md";
import { AuthenticatedUserRoutes } from "../../../../../utils/util.constant";
import { Link } from "react-router-dom";
import { useDeleteAddressMutation, useFetchUserData } from "@hooks/useUser";
import { BiSolidMap } from "react-icons/bi";
import { useState } from "react";
import Modal from "@components/common/Modal";
import { useQueryClient } from "@tanstack/react-query";

function AddressBook() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { getUserData } = useFetchUserData();
  const address = getUserData?.address ?? [];
  const [addressId, setAddressId] = useState(null);
  const { deleteAddress, deleteAddressLoading } = useDeleteAddressMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
      closeModalHandler();
    },
  });

  const openModalHandler = (id) => {
    setIsModalOpen(true);
    setAddressId(id);
  };
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setAddressId(null);
  };
  const addressDeleteHandler = () => {
    if (!addressId) return;
    deleteAddress(addressId);
  };

  return (
    <div className="space-y-5">
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        onDelete={addressDeleteHandler}
        isLoading={deleteAddressLoading}
        title="Delete address?"
        text="Deleting this address will permanently remove it."
      />
      <div className=" py-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Address Book</h2>
          <Link to={AuthenticatedUserRoutes.ADDADDRESS}>
            <button
              className={`${address.length === 3 ? "hidden" : "bg-secondary"} px-4 py-2 border  text-white rounded-lg mb-10 `}
            >
              + Add Address
            </button>
          </Link>
        </div>

        {address?.length === 0 ? (
          <div className="flex justify-center items-center  h-40 ">
            <p className="text-gray-400 text-xl">No Address provided</p>
          </div>
        ) : (
          <div className="grid-cols-1 md:grid-cols-2 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              {address?.map((data, index) => (
                <div
                  key={data?._id || index}
                  className="bg-white rounded-xl shadow p-6 relative"
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
                  <div className="flex gap-4 mt-4 text-sm">
                    <Link
                      to={AuthenticatedUserRoutes.EDITADDRESS.replace(
                        ":id",
                        data._id
                      )}
                    >
                      <button className="text-secondary font-semibold hover:underline">
                        Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => openModalHandler(data?._id)}
                      className="text-red-500 font-semibold hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default AddressBook;
