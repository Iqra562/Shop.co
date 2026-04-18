import { useMutation, useQuery } from "@tanstack/react-query";
import { productServices } from '@services/product.service.js'
import { categoryServices } from "../services/category.service";

export const useGetProducts = ()=> useQuery({
    queryKey: ["products"], 
    queryFn: productServices.getProducts,
  });
export const useGetProductsByCategory = (categoryId,filters={})=> useQuery({
    queryKey: ["productsByCategory",categoryId,filters], 
    queryFn: ()=>categoryServices.getProductsByCategory(categoryId, filters),
      enabled: Boolean(categoryId),

  });
export const useGetSaleProducts = ()=> useQuery({
    queryKey: ["productsOnSale"], 
    queryFn: productServices.getProductsOnSale,
  });

  
export const useGetProductById = (productId)=> useQuery({

   queryKey: ["product", productId],
   queryFn: ()=> productServices.getProductById(productId),
  enabled: Boolean(productId),
}
    );



