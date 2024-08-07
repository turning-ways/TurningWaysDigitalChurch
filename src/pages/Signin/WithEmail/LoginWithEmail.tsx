import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../../ui/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../../ui/Heading/Header";
import GoogleButton from "../../../ui/Button/GoogleButton";
import PhoneButton from "../../../ui/Button/PhoneButton";
import Input from "../../../ui/Input/Input";
import PasswordInput from "../../../ui/Input/PasswordInput";
import NextButton from "../../../ui/Button/NextButton";
import { useCallback, useEffect } from "react";
import { useLogin } from "../../../hooks/useAuthData";

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 characters long" }),
});

type FormData = z.infer<typeof schema>;

const LoginWithEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (data: FormData) => {
    const { email, password } = data;
    mutate({ inputKey: email, password });
  };

  const handleNavigateToRegister = useCallback(
    () => navigate("/register"),
    [navigate]
  );
  const handleNavigateToForgotPassword = useCallback(
    () => navigate("/forgot-password"),
    [navigate]
  );
  const handleNavigateToPhoneLogin = useCallback(
    () => navigate("/login/phone"),
    [navigate]
  );

  return (
    <AuthContainer center="sm:items-center pt-10 md:pt-0">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-10">
          <Header>Sign In</Header>
          <p className="text-[#949995] text-base lg:text-[18px]">
            Don't have an account?{" "}
            <button
              className="text-secondary underline underline-offset-[3px] cursor-pointer"
              onClick={handleNavigateToRegister}>
              Create One
            </button>
          </p>
        </div>
        <Input
          heading="Email"
          name="email"
          placeholder=""
          register={register}
          formError={errors.email?.message}
        />
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
        <PhoneButton onClick={handleNavigateToPhoneLogin} />
      </form>
    </AuthContainer>
  );
};

export default LoginWithEmail;
