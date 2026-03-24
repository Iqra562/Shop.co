import { ApiService } from "../utils/Api.service";


const categoryServiceUrl = {
    category : "/category",
}

const getMainCategories = ()=>{
    const response = ApiService.get(`${categoryServiceUrl.category}/`);
    return response;
}
const getSubCategories = (parentId)=>{
    const response = ApiService.get(`${categoryServiceUrl.category}/sub/${parentId}`,);
    return response;
}



export const categoryServices ={
    getMainCategories,
    getSubCategories
}