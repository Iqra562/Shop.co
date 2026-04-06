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

const addCategories = (payload)=>{
    const response = ApiService.post(`${categoryServiceUrl.category}`,payload);
    return response;
}

const getProductsByCategory= (categoryId)=>{
    const response = ApiService.get(`${categoryServiceUrl.category}/get-product-by-category/${categoryId}`);
    return response;
}

export const categoryServices ={
    getMainCategories,
    getSubCategories,
    addCategories,
    getProductsByCategory
}