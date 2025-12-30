import { ApiService } from "../utils/Api.service";


const wishlistServiceUrl={
    wishlist : '/wishlist'
}

const getwishlist =()=>{
 const response =    ApiService.get(`${wishlistServiceUrl.wishlist}`);
 return response;

}

const addToWishlist=(payload)=>{
    const response =  ApiService.post(`${wishlistServiceUrl.wishlist}`,payload );
    return response;
}

const removeFromWishlist = (productId)=>{
    const response = ApiService.delete(`${wishlistServiceUrl.wishlist}/${productId}`);
    return response;
}

export const wishlistServices = {
    getwishlist,
    addToWishlist,
    removeFromWishlist
}