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
    const response = ApiService.post(`${userServiceUrl.users}/logout`)
}

const checkAuth = ()=>{
      const response = ApiService.get(`${userServiceUrl.users}/auth/check`);
    return response;
}
 

export const userServices = {
    registerUser,
    checkAuth,
    logoutUser,
    loginUser
}