import { ApiService } from "../utils/Api.service";

const orderServiceUrl = {
    order:"/orders"
}

const getOrders = ()=>{
    const response = ApiService.get(`${orderServiceUrl.order}/get-order`);
    return response;
}
const getOrdersById = ()=>{
    const response = ApiService.get(`${orderServiceUrl.order}/get-order-by-id`);
    return response;
}

const createOrder = (payload)=>{
    const response = ApiService.post(`${orderServiceUrl.order}/create-order`,payload);
    return response;
}
export const  orderServices = {
    getOrders,
    getOrdersById,
    createOrder
}