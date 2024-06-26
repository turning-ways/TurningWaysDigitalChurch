import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Bounce, toast } from "react-toastify";
import { useChurchIdStore } from "../stores/churchId";
import { useNavigate } from "react-router-dom";
import service from "../services/api-v1-users-service";
import { useUserDetailsStore, useUserIdStore } from "../stores/user";
import useAddMember from "./Member/useAddMember";
import { useMemberStore } from "../stores/member";
import apiClient from "../services/api-v1-churches-service";

interface AuthResponse {
  data: {
    user: {
      first_name: string;
      last_name: string;
      _id: string;
      churchId: {
        _id: string;
        name: string;
      };
      photo: string;
    };
  };
}

interface LoginDetails {
  inputKey: string;
  password: string;
}

interface ErrorResponse {
  response: {
    data: {
      message: string;
      email: string;
      redirectUrl: string;
    };
  };
}

interface Password {
  password: string;
  passwordConfirm: string;
}

interface User {
  email?: string;
  phoneNumber?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  passwordConfirm?: string;
}

interface Church {
  name: string;
  phone: string;

  postalCode: string;
  country: string;
  state: string;
  city: string;
  address: string;

  website: string;

  email: string;
}

export const success = (success: string) => {
  toast.success(success, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const notify = (err: string) => {
  toast.error(err, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export const useAuth = () => {
  const apiClient = new ApiClient<AuthResponse>("/authorize");
  return useQuery<AuthResponse>({
    queryKey: ["auth"],
    queryFn: () => apiClient.get(),
  });
};

export const refetchAuth = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["auth"] });
};

export const useRegister = () => {
  const { email } = useUserDetailsStore();
  const { mutate } = useVerifyEmail();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) => service("/signupAdmin").post(user),
    onSuccess: () => {
      mutate({ email });
      navigate("/register/otp-verification");
      success("Please enter the otp that was sent");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const message = err.response.data.message;
      if (
        message ===
        "User validation failed: passwordConfirm: The passwords do not match!!"
      ) {
        notify(`Passwords don't match`);
      }
      // } else if (message.includes("duplicate")) {
      //   notify(`An account with this email already exists`);
      // }
      else {
        notify("An account with this email already exists");
      }
    },
  });
};

export const useRegisterWithPhone = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) => service("/phone-auth").post(user),
    onSuccess: () => {
      navigate("/register/phone-otp-verification");
      success("Please enter the otp that was sent");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const message = err.response.data.message;
      if (
        message ===
        "User validation failed: passwordConfirm: The passwords do not match!!"
      ) {
        notify(`Passwords don't match`);
      } else if (message.includes("duplicate")) {
        notify(`An account with this email already exists`);
      }
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  // const { setChurchId } = useChurchIdStore();

  const { setChurchId } = useChurchIdStore();

  return useMutation({
    mutationFn: (user: LoginDetails) => service("/login").post(user),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      if (res.redirectType === "adminDashboard") {
        setChurchId(res.churchId);
        success("Sign In was Successfull");
        navigate("/admin/dashboard/today");
        // console.log(res.churchId);
      }
      if (res.redirectType === "churchSelection") {
        setChurchId(res.churchId);
        success("Sign In was Successfull, Please create your church");
        navigate("/register/personalinfo");
      }
    },
    onError: (err: ErrorResponse) => {
      // const url = new URL(err.response.data.redirectUrl);
      // navigate(url.pathname);
      // notify("Sign In was Successfull, Please create your church");
      notify(err.response.data.message);
    },
  });
};

export const useLogout = () => {
  return useQuery({
    queryKey: ["loggedOut"],
    queryFn: () => service("/logout").get(),
  });
};

export const useResetPassword = () => {
  const { userId, setUserId } = useUserIdStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (password: Password) =>
      service("/update-password/" + userId).patch(password),
    onSuccess: () => {
      success("Password has been changed");
      navigate("/login/email");
      setUserId(null);
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (email: { email: string }) =>
      service("/verify-email").post(email),
    onSuccess: () => {
      success("Otp has been sent to email");
    },
  });
};

export const useVerifyOtp = () => {
  const { setUserId } = useUserIdStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (token: { token: string }) =>
      service("/verify-password-token").patch(token),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      setUserId(res.userId);
      navigate("/password-reset/set-new-password");
    },
  });
};

export const useVerifyPhoneSignUpOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (code: { code: string }) =>
      service("/phone-auth-verify").post(code),
    onSuccess: () => {
      navigate("/login/phone");
      success("Verified! Please sign in to continue");
    },
  });
};

export const useVerifySignUpOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (token: { token: string }) =>
      service("/verify-email").patch(token),
    onSuccess: () => {
      navigate("/login/email");
      success("Account Created, Please Sign In");
      console.log("Account created, sign In");
    },
    onError: () => notify("Invalid Otp!"),
  });
};

export const useAddChurch = () => {
  const { mutate } = useAddMember();
  const { role, howDidYouHear, phoneNumber, email, gender, dateOfBirth } =
    useMemberStore();
  // const navigate = useNavigate();
  // const { setUser } = useUserAuth();
  // const { data: admin } = useAuth();
  // const queryClient = useQueryClient();
  // const handleRefresh = () => {
  //   refetchAuth(queryClient);
  // };
  return useMutation({
    mutationFn: (churchDetails: Church) =>
      apiClient<Church>("").post(churchDetails),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      success("Church has been created successfully");

      // console.log(res.data.church.id);

      mutate({
        role: role.toLowerCase(),
        howDidYouHear: howDidYouHear.toLowerCase(),
        phone: phoneNumber,
        churchId: res.data.church.id,
        email,
        gender: gender.toLowerCase(),
        dateOfBirth,
      });

      // handleRefresh();

      // navigate("/admin/dashboard");
    },
    onError: (err: ErrorResponse) => {
      notify(err.response.data.message);
      console.log(err);
    },
  });
};
