import { useMutation, useQuery } from "@tanstack/react-query";
import { cartServices } from '@services/cart.service.js'

export const useGetCart = ()=> useQuery({
    queryKey: ["cart"],
    queryFn: cartServices.getCart,
  }); 


export const useAddToCart  = ()=> {
    const { mutate: addToCart, isPending: addToCartLoader } = useMutation({
      mutationFn: cartServices.addToCart,
    });
  return {addToCart,addToCartLoader}
}
 
export const useDecreaseCartQuantity = ()=>{
   const { mutate: decreaseCartQuantity, isPending :decreaseCartQuantityLoader} = useMutation({
      mutationFn: cartServices.decreaseCartQuantity,
    });
    return {decreaseCartQuantity,decreaseCartQuantityLoader};
}

export const useRemoveCart = ()=>{
   const { mutate: removeCartItem, isPending: removeCartLoader } =
      useMutation({
        mutationFn: cartServices.removeFromCart,
      });
      return {removeCartItem,removeCartLoader}
}