import { ApiService } from "../utils/Api.service";


const productServiceUrl = {
    product : "/products",
}

const getProduct = ()=>{
    const response = ApiService.get(`${productServiceUrl.product}/get-product`);
    return response;
}


export const productServices = {
    getProduct,
}