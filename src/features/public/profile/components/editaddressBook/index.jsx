import { useForm } from "react-hook-form";
import {
  useFetchUserData,
  useAddUserAddress, 
  useUpdateAddressMutation,
} from "@hooks/useUser.js";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";
function EditAddressBook({ noRedirection }) {
  const { getUserData } = useFetchUserData();
  const { id: addressId } = useParams();
  const { addUserAddress, addAddressLoading } = useAddUserAddress();
  const { updateUserAddress, updateAddressLoading } =
    useUpdateAddressMutation(addressId);
  const [editMode, setEditMode] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
      style: {
        backgroundColor: "#fff",
      },
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (getUserData && editMode) {
      const selectedAddress = getUserData.address.find(
        (addr) => addr._id === addressId,
      );

      reset({
        fullName: selectedAddress.fullName || "",
        phone: selectedAddress.phone || "",
        street: selectedAddress.street || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        postalCode: selectedAddress.postalCode || "",
      });
    }
  }, [getUserData, reset, editMode]);
  // console.log(getUserData.address._id[addressId])
  const onSubmit = (data) => {
    if (editMode) {
      updateUserAddress(data, {
        onSuccess: () => {
          openNotificationWithIcon("success", "Address updated!");
          navigate("/profile");
        },
        onError: () => {
          openNotificationWithIcon( 
            "error",
            "Something went wrong!, Please try again",
          );
        },
      });
    } else {
      addUserAddress(data, {
        onSuccess: () => {
          openNotificationWithIcon(
            "success",
            "Address added to adress book successfuly !",
          );
 
         setTimeout(() => { 
           queryClient.invalidateQueries({ queryKey: ["userProfile"] });
         }, 1000);

    if (!noRedirection) navigate("/profile");
        },
        onError: (err) => {
          openNotificationWithIcon(
            "error",
            "Something went wrong!, Please try again",
          );
          console.log(err);
        },
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
          {editMode ? "Edit" : "Add"} Address
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
                {...register("fullName", {
                  required: true,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters are allowed",
                  },
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 characters allowed",
                  },
                })}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm">
                  {" "}
                  {errors.fullName.message || "Name is required"}
                </p>
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
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters are allowed",
                  },
                  minLength: {
                    value: 2,
                    message: "City must be at least 2 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "City must be at most 20 characters",
                  },
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
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Only letters are allowed",
                  },
                  minLength: {
                    value: 2,
                    message: "State must be at least 2 characters",
                  },
                  maxLength: {
                    value: 25,
                    message: "State must be at most 25 characters",
                  },
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
                  pattern: {
                    value: /^[A-Za-z0-9\s,.-]+$/,
                    message: "Invalid street format",
                  },
                  minLength: {
                    value: 5,
                    message: "Street must be at least 5 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Street must be at most 50 characters",
                  },
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
                  required: "Please provide postal code",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                  minLength: {
                    value: 5,
                    message: "Postal code must be 5 digits",
                  },
                  maxLength: {
                    value: 5,
                    message: "Postal code must be 5 digits",
                  },
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
                className="bg-primary-button-gradient  text-white py-2 rounded-md bg-black ml-auto px-6"
                disabled={
                  (editMode ? !isDirty : false) ||
                  addAddressLoading ||
                  updateAddressLoading
                }
                type="submit"
              >
                {addAddressLoading || updateAddressLoading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 15,
                          color: "white",
                          marginRight: "10px",
                        }}
                        spin
                      />
                    }
                    size="small  "
                    colorPrimary="#000"
                    dotSizeSM={50}
                    spinning={addAddressLoading || updateAddressLoading}
                  />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditAddressBook;
