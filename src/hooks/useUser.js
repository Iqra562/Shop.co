import { useMutation, useQuery } from "@tanstack/react-query";
import { userServices } from "../services/user.service";
import {  useQueryClient } from "@tanstack/react-query";

export const useFetchUserData = () => {
  const { data: getUserData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userServices.currentUser,
  });
  return { getUserData: getUserData?.data?.data }
}


export const useAddUserAddress   = () => {
  const { mutateAsync: addUserAddress, isPending: addAddressLoading } = useMutation({
    mutationFn: userServices.addUserAddress,
  
  });
  return { 
    addUserAddress,
    addAddressLoading
  }

}


export const useUpdateAddressMutation = (addressId, { onMutate, onSuccess, onError, onSettled } = {}) => {

  const {
    mutateAsync: updateUserAddress,
    isPending: updateAddressLoading,
    error: updateUserAddressError,
  } = useMutation({
    mutationFn: (payload) => userServices.updateUserAddress(addressId, payload),
    onSuccess: () => {
      console.log("Address updatd successfully");
      // Add success notification or redirect here
    },
    onError: (err) => {
      console.log("Error saving address:", err);
      // Add error notification here
    },
  });

  return {
    updateUserAddress,
    updateAddressLoading,
    updateUserAddressError,
  };
};

export const useDeleteAddressMutation = ({ onMutate, onSuccess, onError } = {})=>{
  const {mutateAsync:deleteAddress,isPending:deleteAddressLoading} = useMutation({
    mutationFn: userServices.deleteUserAddress,
      onSuccess:onSuccess,
    onError: onError
  });
  return{
    deleteAddress,
    deleteAddressLoading
  }
}


export const useUpdateUserDetailsMutation = ({ onMutate, onSuccess, onError } = {}) => {
    const queryClient = useQueryClient();

  const { mutateAsync: updateUserDetailsAsync,
    isPending: updateUserDetailsLoading,
    error: updateUserDetailsError, } = useMutation({
      mutationFn: (payload) => userServices.updateUserDetails(payload),
      onMutate,
 onSuccess: (data) => {
      queryClient.invalidateQueries(["userProfile"]);

      if (onSuccess) {
        onSuccess(data);
      }
    },      onError,

    })
  return {
    updateUserDetailsAsync,
    updateUserDetailsLoading,
    updateUserDetailsError
  }
}


 