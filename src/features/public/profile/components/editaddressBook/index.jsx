import { useForm } from "react-hook-form";
import {
  useFetchUserData,
  useAddUserData,
  useUpdateAddressMutation,
} from "../../../../../hooks/useUser.js";
  import { useParams } from "react-router-dom";
import { notification } from "antd";
import { useState,useEffect } from "react";
function EditAddressBook() {
  const { getUserData } = useFetchUserData();
  const { addUserAddress } = useAddUserData();
  const { id: addressId } = useParams();
  const { updateUserAddress } = useUpdateAddressMutation(addressId);
  const [editMode, setEditMode] = useState(false);
   const [api, contextHolder] = notification.useNotification();

   const openNotificationWithIcon = (type, message) => {
    api[type]({ 
      description: message,
      icon: false,
       style: {
        backgroundColor: '#fff', 
       },
    }); 
  };
  const {
    register,
    handleSubmit,
    watch, 
    formState: { errors },
  } = useForm({
    
  });
  const onSubmit = (data) => {
    if (editMode) {
      updateUserAddress(data, {
   onSuccess:()=>{
    openNotificationWithIcon("success","Address updated!")
   },
   onError:()=>{
    openNotificationWithIcon("error","Something went wrong!, Please try again")
   }
      });
    } else {
      addUserAddress(data, {
         onSuccess:()=>{
    openNotificationWithIcon("success","Address added to adress book successfuly !")
   },
   onError:()=>{
    openNotificationWithIcon("error","Something went wrong!, Please try again")
   }
      });
    }
  };
  useEffect(() => {
    if (addressId) {
      setEditMode(true);
    }
  }, [addressId]);
  return (
    <div className="w-full px-3 space-y-3">
      {contextHolder}
      <div className="border-b pb-4 w-full h-fit">
        <h1 className="text-3xl font-bold">
          {!getUserData?.address || getUserData?.address.length === 0
            ? "Add"
            : "Edit"}{" "}
          Address
        </h1>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 ">
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                full Name
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50 "
                placeholder="Enter Full Name"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">Name is required</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                Contact
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter Contact Number"
                {...register("phone", {
                  required: "Phone number is required",
                  minLength: {
                    value: 8,
                    message: "Phone number must be at least 8 digits",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number must be at most 15 digits",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Phone number must contain only digits",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                City
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter City"
                {...register("city", {
                  required: "Please provide city",
                })}
              />
              {errors.city && (
                <p className="text-red-600 text-sm">{errors.city.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                State
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter State"
                {...register("state", {
                  required: "Please provide state",
                })}
              />
              {errors.state && (
                <p className="text-red-600 text-sm">{errors.state.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                Street
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter Street"
                {...register("street", {
                  required: "Please provide street",
                })}
              />
              {errors.street && (
                <p className="text-red-600 text-sm">{errors.street.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                Postal Code
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter Postal Code"
                {...register("postalCode", {
                  required: "Please provide street",
                })}
              />
              {errors.postalCode && (
                <p className="text-red-600 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex">
              <button
                className="bg-black text-white  py-2 rounded bg-gradient-to-r from-[#3a4e66] to-[#537090] ml-auto px-6"
                type="submit"
              >
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditAddressBook;
