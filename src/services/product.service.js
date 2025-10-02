import { ApiService } from "../utils/Api.service";


const productServiceUrl = {
    products : "/products",
}

const getProducts = ()=>{
    const response = ApiService.get(`${productServiceUrl.products}/get-product`);
    return response;
}


export const productServices = {
    getProducts,
}