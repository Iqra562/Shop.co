import { useMutation, useQuery } from "@tanstack/react-query";
import { cartServices } from '@services/cart.service.js'

export const useGetCart = ()=> useQuery({
    queryKey: ["cart"],
    queryFn: cartServices.getCart,
  });