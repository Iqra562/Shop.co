import { useForm } from "react-hook-form";
import {
  useFetchUserData,
  useUpdateUserDetailsMutation,
} from "@hooks/useUser.js";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, notification } from "antd";
import { useEffect } from "react";

function EditProfileInfo() {
  const { getUserData } = useFetchUserData();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      description: message,
      icon: false,
      style: {
        backgroundColor: "#fff",
      },
    });
  };
const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm({
  defaultValues: { name: "", email: "" },  
});

useEffect(() => {
  if (getUserData) {
    reset({
      name: getUserData.name || "",
      email: getUserData.email || "",
    });
  }
}, [getUserData, reset]);

  const {
    updateUserDetailsAsync,
    updateUserDetailsLoading,
    updateUserDetailsError,
  } = useUpdateUserDetailsMutation({
    onSuccess: (updatedData) => {
    openNotificationWithIcon("success", "Details updated successfully!");
    reset(updatedData); 
  },
    onError: (err) =>
      openNotificationWithIcon(
        "error",
        "Something went wrong. Please try again"
      ),
  });
  const onSubmit = (data) => {
    updateUserDetailsAsync(data);
  };



  return (
    <div className="w-full px-3 space-y-3">
      {contextHolder}

      <div className="border-b pb-4 w-full h-fit">
        <h1 className="text-3xl font-bold">Update Profile</h1>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 ">
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                user Name
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50 "
                placeholder="Enter User Name"
                {...register("name", {
                  required: true,
                  validate: (value) => value.trim() !== "",
                })}
              />
              {errors.name && (
                <p className="text-red-600 text-sm">Username is required</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="" className="capitalize ">
                Email
              </label>
              <input
                type="text"
                className="block border w-full rounded-md py-[7px] px-[11px] outline-none bg-gray-50"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex">
              <button
                className="bg-primary-button-gradient  text-white py-2 rounded-md bg-black ml-auto px-6"
  disabled={!isDirty || updateUserDetailsLoading}  
                type="submit"
              >
                {updateUserDetailsLoading ? (
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
                    spinning={updateUserDetailsLoading}
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

export default EditProfileInfo;
