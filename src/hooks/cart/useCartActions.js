import {
  useAddToCart,
  useDecreaseCartQuantity,
  useRemoveCart,
} from "./useCart";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCartActions = () => {
  const { addToCart } = useAddToCart();
  const { decreaseCartQuantity } = useDecreaseCartQuantity();
  const { removeCartItem } = useRemoveCart();
  const queryClient = useQueryClient();

  

   const decreaseQuantity = (productId) => {
    decreaseCartQuantity(
      { productId: String(productId), quantity: 1 },
      {
        onSuccess: () => {
          //  When mutation succeeds, refetch the cart data
          queryClient.invalidateQueries(["cart"]);
        },
        onError: (error) => {
          console.error("Decrease failed:", error);
        },
      }
    );
  };
  

  return {
     decreaseQuantity,
     
  };
};
