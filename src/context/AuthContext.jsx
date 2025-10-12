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
         const [isAuthenticated,setIsAuthenticated]   = useState(() => !!localStorage.getItem("isAuthenticated"));
        const [user,setUser] = useState(null);
        const isAdmin = user?.role === "admin";
    
useEffect(() => { 
    if (userData) {
      setUser(userData);
    localStorage.setItem("isAuthenticated", JSON.stringify(userData));
    const data = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!data);

    } else if (isError) {
      setUser(null);
      setIsAuthenticated(false);
          localStorage.removeItem("isAuthenticated");  

    }
  }, [userData, isError]);
     const login = (userData) => {
   localStorage.setItem("isAuthenticated", JSON.stringify(userData));
    const data = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(!!data);
        navigate("/");

  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
              localStorage.removeItem("isAuthenticated");  

  };    
return(

    <AuthContext.Provider value={{isAuthenticated,user,isAdmin,login,logout}}>
        
        {children}
    </AuthContext.Provider>
)
}

export default AuthContextProvider