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


export const useAddUserData = () => {
  const { mutateAsync: addUserAddress, isPending: addAddressLoading } = useMutation({
    mutationFn: userServices.addUserAddress,
    onSuccess: () => {
      console.log("Address saved successfully");
      // Add success notification or redirect here
    },
    onError: (err) => {
      console.log("Error saving address:", err);
      // Add error notification here
    },
  });
  return {
    addUserAddress,
    addAddressLoading
  }

}


export const useUpdateAddressMutation = (addressId, { onMutate, onSuccess, onError, onSettled } = {}) => {

  const {
    mutateAsync: updateUserAddress,
    isPending: updateUserAddressLoading,
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
    updateUserAddressLoading,
    updateUserAddressError,
  };
};


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