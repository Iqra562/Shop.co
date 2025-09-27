import { Link } from "react-router-dom";

function Signup(){
    return( 
        <div className="flex">
 <div className=" hidden md:flex w-5/12   bg-black 
 h-screen  flex-col justify-center items-center">
 <h1 className="text-white text-7xl uppercase font-bold">Shop.co</h1>
 </div>
        <div className="flex flex-col items-center pt-40 px-10 md:w-7/12 ">


        <h1 className="text-2xl font-semibold mb-5">Welcome Back,</h1>
        <div className="  xl:w-4/12 space-y-3">
            <input type="text" placeholder="name" className="border outline-0 py-1 px-1 w-full h-10 rounded"/>
            <input type="text" placeholder="email"  className="border outline-0 py-1 px-1 w-full h-10 rounded"/>
            <input type="text" placeholder="password"  className="border outline-0 py-1 px-1 w-full h-10 rounded"/>
           <button className="bg-black text-white w-full py-2 rounded">Signup</button>
           <p>Dont have an account? <Link to='/signup' className="underline">Signup</Link></p>
        </div>
        </div>
        </div>
       
    )
}

export  {Signup};