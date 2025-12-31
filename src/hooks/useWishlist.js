import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { wishlistServices } from "../services/wishlist.service";
import { useState } from "react";

export const useWishlist =()=>{
 
    const {data:getUserWishlist,isPending: wishlistLoading}= useQuery({
        queryKey:["wishlist"],
        queryFn:wishlistServices.getwishlist
    });
    return{
         getUserWishlistData : getUserWishlist?.data?.data?.products,
         wishlistLoading
    }
    
}

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  const { mutate: addToWishlist,isPending:wishlistUpdatePending } = useMutation({
    mutationFn: wishlistServices.addToWishlist,

  

    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
      
    },
  });

  return {
    addToWishlist,
    wishlistUpdatePending

  };
};


export const useRemoveFromWishlist=()=>{
      const queryClient = useQueryClient();

    const {mutate : removeFromWishlist,isPending:deleteWishlistProductPending} = useMutation({
  mutationFn:wishlistServices.removeFromWishlist,
  onSuccess:()=>{
          queryClient.invalidateQueries(["wishlist"]);

  }
    });
    return{
        removeFromWishlist,
        deleteWishlistProductPending
    }
}