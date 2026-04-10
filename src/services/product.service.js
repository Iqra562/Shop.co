import { ApiService } from "../utils/Api.service";


const productServiceUrl = {
    products : "/products",
}

const getProducts = ()=>{
    const response = ApiService.get(`${productServiceUrl.products}/get-product`);
    return response;
}

const addProduct = (payload)=>{
     const response = ApiService.post(`${productServiceUrl.products}/add-product`,payload);
    return response;
}

const updateProduct = (productId,payload)=>{
     const response = ApiService.put(`${productServiceUrl.products}/update-product/${productId}`,payload);
    return response; 
}

const getProductsOnSale = ()=>{
    const response = ApiService.get(`${productServiceUrl.products}/product-on-sale`);
    return response;
}
const getProductById  = (productId)=>{
    const response  = ApiService.get(`${productServiceUrl.products}/get-product-by-id/${productId}`);
    return response;
}
 
export const productServices = {
    getProducts,
    getProductById,
    getProductsOnSale,
    addProduct,
    updateProduct
}