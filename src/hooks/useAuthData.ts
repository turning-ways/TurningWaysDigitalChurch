import { useMutation, useQuery } from "@tanstack/react-query";
import ApiClient from "../services/api-client";
import { Bounce, toast } from "react-toastify";
import { useAuthStore, useChurchIdStore } from "../stores/churchId";
import { useNavigate } from "react-router-dom";
import service from "../services/api-v1-users-service";
import { useUserDetailsStore, useUserIdStore } from "../stores/user";
// import useAddMember from "./Member/useAddMember";
// import { useMemberStore } from "../stores/member";
import apiClient from "../services/api-v1-churches-service";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import axios from "../axios";
import auth from "../firebase.config";

// interface AuthResponse {
// 	data: {
// 		user: {
// 			first_name: string;
// 			last_name: string;
// 			_id: string;
// 			churchId: {
// 				_id: string;
// 				name: string;
// 			};
// 			photo: string;
// 		};
// 	};
// }

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
  firstName?: string;
  lastName?: string;
  password?: string;
  passwordConfirm?: string;
}

interface Church {
  churchData: {
    name: string;
    phone: string;
    postalCode: string;
    country: string;
    state: string;
    city: string;
    address: string;
    website: string;
    email: string;
    hasParentChurch: boolean;
  };
  memberData: {
    role: string;
    howDidYouHear: string;
    phone: string;
    email: string;
    gender: string;
    dateOfBirth: string;
  };
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
  // configure a new api client to send a get request to the /members/me endpoint
  const churchId = useChurchIdStore().churchId;
  const apiClient = new ApiClient(`/api/v1/members/${churchId}/me`);
  // use the useQuery hook to send the get request
  return useQuery({
    queryKey: ["auth"],
    queryFn: apiClient.get,
  });
};

export const useRegister = () => {
  const { email } = useUserDetailsStore();
  const { mutate } = useVerifyEmail();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) => service("/auth/admin/signup").post(user),
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
      } else if (message === "This email already exists..") {
        notify("An account with this email already exists");
      } else if (message === "User not found") {
        notify("Invalid email or password");
      } else {
        notify("An error Occurred");
      }
    },
  });
};

export const useInviteMember = (id: string) => {
  const { email } = useUserDetailsStore();
  const { mutate } = useVerifyEmail();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (user: User) => service(`/invite?id=${id}`).post(user),
    onSuccess: () => {
      mutate({ email });
      navigate("/login/email");
      success("Please Login to continue");
    },
    onError: (err: { response: { data: { message: string } } }) => {
      const message = err.response.data.message;
      if (
        message ===
        "User validation failed: passwordConfirm: The passwords do not match!!"
      ) {
        notify(`Passwords don't match`);
      } else if (message === "User already exists") {
        notify("An account with this email already exists");
      } else {
        notify("An error Occurred");
      }
    },
  });
};

export const useRegisterWithPhone = (
  recaptchaContainerRef: React.RefObject<HTMLDivElement>
) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (user: {
      phoneNumber: string;
      firstName: string;
      lastName: string;
      password: string;
      passwordConfirm: string;
    }) => {
      if (window.recaptchaVerifier && recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = "";
      }

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            console.log("Recaptcha solved");
          },
          "expired-callback": () => {
            window.recaptchaVerifier.reset();
            console.log("Recaptcha has expired. Please solve again.");
          },
        }
      );

      await window.recaptchaVerifier.verify();
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        user.phoneNumber,
        window.recaptchaVerifier
      );
      return {
        confirmationResult,
        firstName: user.firstName,
        lastName: user.lastName,
        passwordConfirm: user.passwordConfirm,
        password: user.password,
      };
    },
    onSuccess: async ({
      confirmationResult,
      firstName,
      lastName,
      passwordConfirm,
      password,
    }) => {
      window.confirmationResult = confirmationResult.verificationId;
      window.userDetails = { firstName, lastName, passwordConfirm, password };
      navigate("/register/phone-otp-verification");
      if (window.recaptchaVerifier && recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = "";
      }
      success("Please enter the otp that was sent");
    },
    onError: (err) => {
      if (window.recaptchaVerifier && recaptchaContainerRef.current) {
        recaptchaContainerRef.current.innerHTML = "";
      }
      const message = err.message;
      if (message.includes("auth/invalid-phone-number")) {
        notify("Invalid phone number format");
      } else if (message.includes("auth/too-many-requests")) {
        notify("Too many requests. Please try again later.");
      } else {
        notify("An error occurred. Please try again.");
      }
    },
  });
};

export const useVerifyPhoneAuthOtp = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (code: string) => {
      const credential = PhoneAuthProvider.credential(
        window.confirmationResult,
        code
      );
      const userDetails = window.userDetails;
      const cred = await signInWithCredential(auth, credential);
      const user = cred.user;

      await updateProfile(user, {
        displayName: `${userDetails.firstName} ${userDetails.lastName}`,
      });

      return cred;
    },
    onSuccess: async (cred) => {
      const userDetails = window.userDetails;
      if (cred.user) {
        const user = await axios.post(
          "https://turningways-api-3hcn.onrender.com/api/v1/auth/phone",
          {
            uid: cred.user.uid,
            password: userDetails.password,
            passwordConfirm: userDetails.passwordConfirm,
          },
          {
            withCredentials: true,
          }
        );
        console.log(user);
      }

      window.confirmationResult = null;
      window.userDetails = null;
      navigate("/login/phone");
      success("Verified! Please sign in to continue");
    },
    onError: (err) => {
      const message = err.message;
      if (message.includes("auth/invalid-verification-code")) {
        notify("Invalid OTP. Please try again.");
      } else {
        notify("An error occurred. Please try again.");
      }
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  // const { setChurchId } = useChurchIdStore();

  const { setChurchId } = useChurchIdStore();
  const { setToken } = useAuthStore();
  const { mutate } = useVerifyEmail();

  return useMutation({
    mutationFn: (user: LoginDetails) => service("/auth/login").post(user),

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      if (res.redirect === "admin dashboard") {
        setChurchId(res.user.mainChurch);
        setToken(res.accessToken);
        success("Sign In was Successfull");
        navigate("/admin/dashboard/today");
      }
      if (res.redirect === "church selection") {
        setChurchId(res.user.mainChurch);
        setToken(res.accessToken);
        success("Sign In was Successfull, Please create your church");
        navigate("/register/personalinfo");
        console.log(res.user);
      }
    },
    onError: (err: ErrorResponse) => {
      if (err.response.data.message.startsWith("Please verify your email")) {
        notify("Please verify your email");
        // use a split to get the email after the Please verify you email
        const email = err.response.data.message.split(
          "Please verify your email "
        )[1];
        mutate({ email });
        navigate("/register/otp-verification");
        success("Please enter the otp that was sent");
      }
      if (
        err.response.data.message === "Invalid Credentials" ||
        err.response.data.message === "User not found"
      ) {
        notify("Invalid Credentials");
      }
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
      service("/auth/rest-password/" + userId).patch(password),
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
      service("/auth/verify-email").post(email),
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
      service("/auth/verify-password-token").patch(token),
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
      service("/auth/verify").patch(token),
    onSuccess: () => {
      navigate("/login/email");
      success("Account Created, Please Sign In");
      console.log("Account created, sign In");
    },
    onError: () => notify("Invalid Otp!"),
  });
};

export const useAddChurch = () => {
  const navigate = useNavigate();
  // const { mutate } = useAddMember();
  // const { role, howDidYouHear, phoneNumber, email, gender, dateOfBirth } = useMemberStore();
  return useMutation({
    mutationFn: (churchDetails: Church) =>
      apiClient<Church>("/create-church-onboarding").post(churchDetails),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (res: any) => {
      success("Church has been created successfully");

      console.log(res.data.churchId);

      // mutate({
      // 	role: role.toLowerCase(),
      // 	howDidYouHear: howDidYouHear.toLowerCase(),
      // 	phone: phoneNumber.MainPhone,
      // 	churchId: res.data.churchId,
      // 	email,
      // 	gender: gender.toLowerCase(),
      // 	dateOfBirth,
      // });

      // handleRefresh();

      navigate("/admin/dashboard/today");
    },
    onError: (err: ErrorResponse) => {
      notify(err.response.data.message);
      console.log(err);
    },
  });
};
