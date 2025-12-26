import { ApiService } from "../utils/Api.service";


const userServiceUrl = {
    users : "/users",
}

const registerUser = (payload)=>{
    const response = ApiService.post(`${userServiceUrl.users}/register`,payload);
    return response;
}

const loginUser = (payload)=>{
 const response = ApiService.post(`${userServiceUrl.users}/login`,payload);
 return response;
}

const logoutUser  = ()=>{
    const response = ApiService.post(`${userServiceUrl.users}/logout`);
    
}

const currentUser = ()=>{
    const response = ApiService.get(`${userServiceUrl.users}/user/data`);
    return response;
}

const addUserAddress = (payload)=>{
    const response = ApiService.post(`${userServiceUrl.users}/address/add`,payload);
    return response;
} 
const updateUserAddress = (addressId,payload)=>{
    const response = ApiService.patch(`${userServiceUrl.users}/address/update/${addressId}`,payload);
    return response;
}
const deleteUserAddress=(addressId)=>{
      const response = ApiService.delete(`${userServiceUrl.users}/address/delete/${addressId}`);
    return response;
}

const updateUserDetails = (payload)=>{
const response = ApiService.patch(`${userServiceUrl.users}/update-account-details`,payload);
return response;
}
 
const checkAuth = ()=>{
      const response = ApiService.get(`${userServiceUrl.users}/auth/check`);
    return response;
}
 

export const userServices = {
    registerUser,
    checkAuth,
    currentUser,
    logoutUser,
    loginUser,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
    updateUserDetails,

}