import {
  useAddToCart,
  useDecreaseCartQuantity,
  useRemoveCart,

} from "./useCartData";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useCartActions = () => {


  const { addToCart, addToCartLoader } = useAddToCart();
  const { decreaseCartQuantity } = useDecreaseCartQuantity();
  const { removeCartItem } = useRemoveCart();
  const queryClient = useQueryClient();



  const increaseQuantity = (productId,   {
      onSuccess,
      onError,
      onMutate,
    } = {},quantity=1) => {
    addToCart(
      { productId: String(productId), quantity },


      {
      
        onMutate: () => {
          onMutate?.() 
        },
      
      
        onSuccess: () => {
          //  When mutation succeeds, refetch the cart data
          queryClient.invalidateQueries(["cart"]);
          onSuccess?.();

        },
      
    
 onError: (error) => {
          const code = error?.response?.data?.code;
          onError?.(error, code);
        },
      
    }
    );

  };

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
  const removeCartItemHandler = (id) => {
    removeCartItem(
      {
        cartItemId: id,
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries(["cart"]);
        },
        onError: (error) => {
          console.error(" Inline error:", error);
        },
      }
    );
  };



  return {
    increaseQuantity,
    decreaseQuantity,
    removeCartItemHandler,
    addToCartLoader



  };
};
