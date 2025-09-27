import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider =({children})=>{
        const [isAuthenticated,setIsAuthenticated]   = useState(null);
        const [user,setUser] = useState(null);
        const isAdmin = user?.role === "admin";
       const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
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