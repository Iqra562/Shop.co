// import { useMutation } from "@tanstack/react-query";
// import Password from "antd/es/input/Password";
// import { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { userServices } from "../../../services/user.service";
// import { AuthContext } from "../../../context/AuthContext";

// function Login(){
//     const {login} = useContext(AuthContext)
//     const {mutateAsync:loginRequest} = useMutation({mutationFn:userServices.loginUser})
//     const [userData,setUserData] = useState({
//     email:"",
//     password:""
//     })
//     const handleLogin = async(e) => {
//            try {
//       const res = await loginRequest(userData);
//       console.log("logIn success:", res);
//       login(res?.data?.data);
//     } catch (err) {
//       // console.error("Signup failed:", err.response.message.d);
//       if (err.response) {
//         // console.log(err.response || "Something went wrong!");
//       } 
//     }

//     } 

//     return(
//         <div className="flex">
//  <div className=" hidden md:flex w-11/12   bg-black 
//  h-screen  flex-col justify-center items-center">
//  <h1 className="text-white text-7xl uppercase font-bold">Shop.co</h1>
//  </div>
//         <div className="flex flex-col items-center pt-40 px-10 md:w-11/12 ">


//         <h1 className="text-2xl font-semibold mb-5">Welcome Back,</h1>
//         <div className="  xl:w-4/12 space-y-3">
//             <input type="text" placeholder="email" className="border outline-0 py-0 px-1 w-full h-10 rounded"  onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
//             <input type="text" placeholder="password"  className="border outline-0 py-0 px-1 w-full h-10 rounded"  onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
//            <button className="bg-black text-white w-full py-2 rounded" onClick={handleLogin}>Login</button>
//            <p>Dont have an account? <Link to='/signup' className="underline">Signup</Link></p>
//         </div>
//         </div>
//         </div>
       
//     )
// }

// export  {Login};

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ManyBlackDots.jsx
// A single-file React component that fills the page with many small black dots.
// - Props:
//    count: number of dots (default 400)
//    size: diameter of each dot in px (default 6)
//    seed: optional number to seed randomness (not cryptographically secure)
//
// Uses Tailwind utility classes for layout and basic styling.

 function Login({ count = 5, size = 4, seed = null }) {
  const [dots, setDots] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // A tiny seeded RNG so repeated seeds produce the same layout (optional)
  function createRng(seedValue) {
    let s = seedValue == null ? Math.random() * 1e9 : seedValue;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  }

  useEffect(() => {
    // update container size so dots can be positioned correctly
    function updateSize() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const rng = createRng(seed == null ? null : seed);
    const newDots = Array.from({ length: count }).map(() => {
      // leave a small margin so dots don't get clipped at the edges
      const margin = Math.max(size, 8);
      const left = Math.floor(margin + rng() * Math.max(0, (window.innerWidth || dimensions.width) - margin * 2));
      const top = Math.floor(margin + rng() * Math.max(0, (window.innerHeight || dimensions.height) - margin * 2));
      // optionally vary opacity slightly for a nicer look
      const opacity = 0.75 + rng() * 0.25;
      return { left, top, opacity };
    });
    setDots(newDots);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, size, seed, dimensions.width, dimensions.height]);

  function regenerate() {
    // change seed by using current timestamp to produce new layout
    setDots([]); // quick visual reset
    setTimeout(() => {
      const rng = createRng(Date.now());
      const newDots = Array.from({ length: count }).map(() => {
        const margin = Math.max(size, 8);
        const left = Math.floor(margin + rng() * Math.max(0, (window.innerWidth || dimensions.width) - margin * 2));
        const top = Math.floor(margin + rng() * Math.max(0, (window.innerHeight || dimensions.height) - margin * 2));
        const opacity = 0.75 + rng() * 0.25;
        return { left, top, opacity };
      });
      setDots(newDots);
    }, 12);
  }

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-[#eee] from-70% to-[#bdbbbb] overflow-hidden">
      
      {/* Dots container */}
      <div className="absolute inset-0" aria-hidden>
        {dots.map((d, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: d.left - size / 2,
              top: d.top - size / 2,
              width: size,
              height: size,
              borderRadius: "50%",
              transform: "translateZ(0)",
              backgroundColor: "#000",
              opacity: d.opacity,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* Optional content area so this component can be used as a page layout */}
      <div className="relative z-10 p-8 mx-auto liquidGlassEffectForHeader bg-gradient-to-t bg-black to-white w-full h-screen">
            <div className="flex justify-center items-center h-full">

         <div className="flex flex-col items-center pt0  md:w-3/12 px-10 bg-re-900 liquidGlassEffectForHeader w-full py-10 rounded-2xl">


         <h1 className="text-2xl font-semibold mb-5 ">Welcome Back,</h1>
         <div className="  space-y-8 ">
             <input type="text" placeholder="Email" className="border outline-0 py-5 px-2 w-full h-10 rounded"  />
             <input type="text" placeholder="Password"  className="border outline-0 py-5 px-2 w-full h-10 rounded" />
         <button className="bg-black  text-white w-full py-2 rounded" >Login</button>
           <p>Dont have an account? <Link to='/signup' className="underline">Signup</Link></p>
        </div>
        </div>
        </div>

        {/* Example usage info */}
      
      </div>
       
    </div>
  );
}
export {Login}