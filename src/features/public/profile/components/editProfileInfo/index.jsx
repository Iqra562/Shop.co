import { useForm } from "react-hook-form";
import { useFetchUserData } from "../../../../../hooks/useUser.js";

function EditProfileInfo() { 
  const {getUserData} =useFetchUserData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } =useForm({
    defaultValues: getUserData || {}
    
  });
  const onSubmit = (data) => console.log(getUserData);

  return (
    <div className="w-full px-3 space-y-3">
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
                {...register("name", { required: true })}
              />
              {errors.userName && (
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
                {...register("email",{required: "Email is required",
                   pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    }},)}
              />
               {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="flex">
              <button className="bg-black text-white  py-2 rounded bg-gradient-to-r from-[#3a4e66] to-[#537090] ml-auto px-6">
                Save changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfileInfo;
