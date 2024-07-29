import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ApiClient from "../services/api-client";
import { notify, success } from "./useAuthData";
import { useUserIdStore } from "../stores/user";

interface InputKey {
  inputKey: string;
}

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const apiClient = new ApiClient("/api/v1/auth" + "/forgot-password");
  return useMutation({
    mutationFn: (inputKey: InputKey) => apiClient.patch(inputKey),
    onSuccess: () => {
      navigate("/forgot-password/otp-verification");
      success("Enter the otp that was sent");
    },
    onError: () => {
      notify("This email doesn't exist");
    },
  });
};

//VERIFY THE OTP THE USER TYPES TO CHANGE PASSWORD
export const useVerifyOtp = () => {
  const { setUserId } = useUserIdStore();
  const navigate = useNavigate();
  const apiClient = new ApiClient("/api/v1/auth" + "/verify-password-token");
  return useMutation({
    mutationFn: (token: { token: string }) => apiClient.patch(token),
    onSuccess: (res: any) => {
      setUserId(res.userId);
      navigate("/forgot-password/reset-password");
    },
    onError: () => {
      notify("Invalid OTP");
    },
  });
};
