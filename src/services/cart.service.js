import { ApiService } from "../utils/Api.service";


const cartServiceUrl = {
    cart : "/cart",
}

const getCart = ()=>{
    const response = ApiService.get(`${cartServiceUrl.cart}/fetch-cart`);
    return response;
}
const addToCart = (payload)=>{
    const response  = ApiService.post(`${cartServiceUrl.cart}/add-to-cart`,payload);
    return response;
}

const removeFromCart = (payload)=>{
    const response  = ApiService.post(`${cartServiceUrl.cart}/remove-from-cart`,payload);
    return response;
}

export const cartServices = {
    getCart,
    addToCart,
    removeFromCart,
}