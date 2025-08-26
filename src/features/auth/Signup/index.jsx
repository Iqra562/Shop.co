import { Link } from "react-router-dom";

function Signup(){
    return(
        <div className="flex flex-col items-center justify-center  pt-40">


        <h1 className="text-2xl font-semibold">Welcome , Create an account</h1>
        <div className="w-1/5 space-y-3">
            <input type="text" placeholder="username" className="bg-gray-200 outline-0 py-1 px-1 w-full"/>
            <input type="text" placeholder="email"  className="bg-gray-200 outline-0 py-1 px-1 w-full"/>
           <button className="bg-black text-white w-full py-2">Sign up</button>
                      <p>Already have an account? <Link to='/login' className="underline">Login</Link></p>

        </div>
        </div>
       
    )
}

export  {Signup};