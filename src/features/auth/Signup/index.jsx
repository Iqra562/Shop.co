import { useMutation } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { userServices } from "../../../services/user.service.js";
import { AuthContext } from "../../../context/AuthContext.jsx";
import { useContext } from "react";
import { StarfieldBackground } from "../../../components/common/StarfieldBackground/index.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";

function Signup() {
  const { mutateAsync: registerRequest } = useMutation({
    mutationFn: userServices.registerUser,
  });
  const { login } = useContext(AuthContext);
  const onsubmit = async () => {
    try {
      const res = await registerRequest({
        name: "abc",
        email: "r@gmail.com",
        password: "1234",
      });
      console.log("Signup success:", res);
      login(res?.data?.data);
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  return (
    <StarfieldBackground>
      <div className="h-screen">
        <div className=" py-2 px-2 ">
          <Link to="/" className="text-sm font-semibold">
            <div className="flex items-center space-x-2">
              <FaArrowLeftLong className="text-sm" />
              <span>Back Home</span>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center  justify-center h-full    ">
          <div className="w-[20%]">
            <div className="mb-8 space-y-1  ">
              <h1 className="text-3xl font-bold">Register</h1>
              <p className="text-sm font-medium text-gray-600">
                Join today for faster checkout and exclusive deals.
              </p>
            </div>
            <div className="space-y-8 w-full">
              <input
                type="text"
                placeholder="name"
                className="border outline-0 py-0 bg-gray-100 border-gray-200  w-full h-10 rounded placeholder:capitalize px-3"
              />
              <input
                type="text"
                placeholder="email"
                className="border outline-0 py-0 bg-gray-100 border-gray-200  w-full h-10 rounded placeholder:capitalize px-3"
              />
              <input
                type="text"
                placeholder="password"
                className="border outline-0 py-0  bg-gray-100 border-gray-200 w-full h-10 rounded placeholder:capitalize px-3"
              />
              <button
                className="bg-black text-white w-full py-2 rounded bg-gradient-to-r from-[#3a4e66] to-[#537090]"
                onClick={onsubmit}
              >
                Signup
              </button>
              <p>
                Already have an account?{" "}
                <Link to="/login  " className="underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </StarfieldBackground>
  );
}

export { Signup };
