import axios from "axios";
const api= axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    // withCredentials:true,
})

const get = (url, queryParams={})=>{
const response = api.get(url, queryParams);
return  response;
} 
const post = (url,data)=>{
    const response = ApiSauceInstance.post(url,data);
    return response;
}
const put = (url,data)=>{
    const response = ApiSauceInstance.put(url,data);
    return response;
}
const deleteRequest = (url,queryParams)=>{
     const response =  ApiSauceInstance.delete(url ,queryParams);
     return response;
}

export const ApiService= {
    get,
    post,
    put,
    delete:deleteRequest,
}