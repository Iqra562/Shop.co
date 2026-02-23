import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userServices } from "../../../services/user.service";
import { AuthContext } from "../../../context/AuthContext";
import { StarfieldBackground } from "../../../components/common/StarfieldBackground";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Input } from "antd";
import { Alert } from "antd";
import { useForm, Controller, useController } from "react-hook-form";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import OTP from "./verify-otp-Input";

function VerifyOTP() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [otpCode,setOtpCode] = useState(null)
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(""));

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const { mutate: otpVerificationRequest, isPending: otpVerificationRequestLoader } = useMutation({
    mutationFn: userServices.verifyUser,
    onMutate: () => { 
      setErrorMessage("");
    },
    onSuccess: (res) => {
       if (res) {
        login(res);
      }
    },
    onError: (err) => {
      const code = err.response?.data?.code;
      if (code === "INVALID_PASSWORD" || code === "INVALID_EMAIL") {
        setErrorMessage("Invalid email or password.");
      } else {
        console.log(err)
        setErrorMessage("Invalid OTP code");
      }
    },
  });

  const onSubmit = () => {
    otpVerificationRequest({otp:otp.join("")});
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

        <div className="flex flex-col items-center  justify-center h-full   ">
          <div className="w-[80%] md:w-[40%] lg:w-[30%] xl:w-[20%]">
            <div className="mb-8   ">
              <h1 className="text-3xl font-bold">Verify OTP,</h1>
              <p className="text-sm font-medium text-gray-600">
                Please verify your email by providing the OTP code we have sent
                to your email.{" "}
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
                <OTP otp={otp} setOtp={setOtp}/>
               
                <button
                  className="bg-black text-white w-full py-2 rounded bg-primary-button-gradient"
                  type="submit"
                  disabled={otpVerificationRequestLoader}
                >
                  {otpVerificationRequestLoader ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}

export { VerifyOTP };
