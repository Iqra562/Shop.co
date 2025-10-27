import { ApiService } from "../utils/Api.service";

const orderServiceUrl = {
    order:'/orders'
}

const getOrders = ()=>{
    const response = ApiService.get(`${orderServiceUrl}/get-order`)
}