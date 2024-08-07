import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../../ui/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../../ui/Heading/Header";
import HeaderTwo from "../../../ui/Heading/HeaderTwo";
import EmailButton from "../../../ui/Button/EmailButton";
import GoogleButton from "../../../ui/Button/GoogleButton";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useEffect, useState, useCallback } from "react";
import PasswordInput from "../../../ui/Input/PasswordInput";
import NextButton from "../../../ui/Button/NextButton";
import { useLogin } from "../../../hooks/useAuthData";

const schema = z.object({
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 characters long" }),
});

type FormData = z.infer<typeof schema>;

const LoginWithNumber = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (data: FormData) => {
    const { password } = data;
    mutate({ inputKey: phoneNumber, password });
  };

  const handleNavigateToRegister = useCallback(
    () => navigate("/register"),
    [navigate]
  );
  const handleNavigateToForgotPassword = useCallback(
    () => navigate("/forgot-password"),
    [navigate]
  );
  const handleNavigateToEmailLogin = useCallback(
    () => navigate("/login/email"),
    [navigate]
  );

  return (
    <AuthContainer center="sm:items-center pt-16 md:pt-0">
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-10">
          <Header>Sign In</Header>
          <p className="text-[#949995] text-base lg:text-[18px]">
            Don&apos;t have an account?{" "}
            <button
              className="text-[#A0D7AB] underline underline-offset-[3px] cursor-pointer"
              onClick={handleNavigateToRegister}>
              Create now
            </button>
          </p>
        </div>
        <div className="mb-2">
          <HeaderTwo>Phone Number</HeaderTwo>
          <PhoneInput
            defaultCountry="ng"
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            inputStyle={inputStyles}
            countrySelectorStyleProps={selectorStyles}
          />
        </div>
        <PasswordInput
          name="password"
          heading="Password"
          register={register}
          placeholder=""
          formError={errors.password?.message}
        />
        <div className="flex justify-between items-center my-10 text-sm lg:text-base">
          <div className="text-[#718096] flex items-center space-x-2">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <div
            className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer"
            onClick={handleNavigateToForgotPassword}>
            Forgot Password?
          </div>
        </div>
        <NextButton isPending={isPending} />
        <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
          <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
        </div>
        <GoogleButton />
        <EmailButton onClick={handleNavigateToEmailLogin} />
      </form>
    </AuthContainer>
  );
};

// Extracted styles for PhoneInput
const inputStyles = {
  width: "100%",
  paddingLeft: "10px",
  paddingTop: "24px",
  paddingRight: "10px",
  paddingBottom: "24px",
  backgroundColor: "#F7FAFC",
  borderColor: "#EBEFF9",
  borderStartEndRadius: "12px",
  borderEndEndRadius: "12px",
  fontSize: "18px",
};

const selectorStyles = {
  buttonStyle: {
    height: "100%",
    paddingLeft: "10px",
    paddingRight: "10px",
    backgroundColor: "#F7FAFC",
    borderColor: "#EBEFF9",
    borderEndStartRadius: "12px",
    borderStartStartRadius: "12px",
  },
};

export default LoginWithNumber;
