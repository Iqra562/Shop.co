import { useMutation, useQuery } from "@tanstack/react-query";
import { productServices } from '@services/product.service.js'

export const useGetProducts = ()=> useQuery({
    queryKey: ["products"],
    queryFn: productServices.getProducts,
  });

export const useGetProductById = (productId)=> useQuery({

   queryKey: ["product", productId],
   queryFn: ()=> productServices.getProductById(productId),
  enabled: Boolean(productId),
}
    );