import { useQuery } from "@tanstack/react-query";
import { createContext, useEffect, useState } from "react";
import { userServices } from "../services/user.service";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
const AuthContextProvider =({children})=>{
const navigate = useNavigate();   

  const {data:userData,isError} = useQuery({
  queryKey: ["user"],
  queryFn: userServices.checkAuth,
  retry: false,
  staleTime: Infinity,
});
         const [isAuthenticated,setIsAuthenticated]   = useState(null);
        const [user,setUser] = useState(null);
        const isAdmin = user?.role === "admin";
    
useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsAuthenticated(true);

    } else if (isError) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [userData, isError]);
     const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    console.log(userData)
        navigate("/");

  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };    
return(

    <AuthContext.Provider value={{isAuthenticated,user,isAdmin,login,logout}}>
        
        {children}
    </AuthContext.Provider>
)
}

export default AuthContextProvider