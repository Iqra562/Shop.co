import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userServices } from "../../../services/user.service";
import { AuthContext } from "../../../context/AuthContext";
import { StarfieldBackground } from "../../../components/common/StarfieldBackground";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Input } from "antd";
import { Alert } from "antd";
import { useForm, Controller, useController } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { Flex, Spin } from 'antd';
function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const { handleSubmit, control } = useForm();  
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const { mutate: registerRequest, isPending: registerRequestLoader } =
    useMutation({
      mutationFn: userServices.registerUser,
       onMutate: () => {
    setErrorMessage(""); 
  },
      onSuccess: (res) => {
        // console.lo g("logIn success:", res);
              navigate("/verify-otp");

        // if (res) {
        //   login(res);
        // }
      },
      onError: (err) => {
        const code = err.response?.data?.code;
        if (code === "EMAIL_ALREADY_EXISTS") {
          setErrorMessage("This email is not available.");
        }  else {
          console.log(err)
          setErrorMessage("Something went wrong!");
        }
        // console.log(err)
      },
    });

  const onSubmit = (data) => {
    registerRequest(data);
  };

  return (
    <StarfieldBackground>
      <div className="h-screen">
        <div className=" py-2 px-2 ">
          <Link to="/">
            <div className="inline-flex items-center space-x-2 flex-shrink ">
              <FaArrowLeftLong className="text-sm" />
              <span className="text-sm font-semibold ">Back Home</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center  justify-center h-full">
          <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]">
            <div className="mb-8 space-y-1  ">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-sm font-medium text-gray-600">
                Join today for faster checkout and exclusive deals.
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-8 w-full">
                {errorMessage && (
                  <Alert
                    message={errorMessage}
                    type="error"
                    closable
                    onClose={() => setErrorMessage("")}
                    style={{ fontSize: "12px" }}
                  />
                )}
                <Controller
                  name="name"
                  rules={{
                    required: "Name is required",
   minLength: {
      value: 2,
      message: "Please provide valid name",
    },                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Input {...field} placeholder="Name"  />
                      {fieldState.error && (
                        <span style={{ color: "#ff0000" }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Input {...field} placeholder="Email" />
                      {fieldState.error && (
                        <span style={{ color: "#ff0000" }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  )}
                />
                <Controller
                 rules={{
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
       pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },

  }}
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Input {...field} placeholder="Password" />
                      {fieldState.error && (
                        <span style={{ color: "#ff0000" }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                <button
                  className="bg-black text-white w-full py-2 rounded bg-primary-button-gradient"
                  type="submit"
                  disabled={registerRequestLoader}
                >    <Spin indicator={<LoadingOutlined  style={{ fontSize: 15, color: "white", marginRight:'10px' }} spin />} size="small  " colorPrimary='#000' dotSizeSM={50}  spinning={registerRequestLoader}/>

                  Signup
                </button>
                <p>
                  Dont have an account?{" "}
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}

export { Signup };
