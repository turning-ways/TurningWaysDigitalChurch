import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Heading/Header";
import GoogleButton from "../../../components/Button/GoogleButton";
import PhoneButton from "../../../components/Button/PhoneButton";
import Input from "../../../components/Input/Input";
import PasswordInput from "../../../components/Input/PasswordInput";
import useLogin from "../../../hooks/useLogin";
import NextButton from "../../../components/Button/NextButton";
const LoginWithEmail = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useLogin();
  

  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          onSubmit={handleSubmit((data) => {
            const { email, password } = data;

            mutate({ email, password });
          })}
        >
          <div className=" mb-10">
            <Header>Sign In</Header>
            <p className="text-[#949995] text-base lg:text-[18px]">
              Don't have an account?{" "}
              <button
                className="text-secondary underline underline-offset-[3px] cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Create One
              </button>
            </p>
          </div>
          <Input
            heading="Email"
            name="email"
            placeholder="temidireowoeye@gmail.com"
            register={register}
            formError={errors.email?.message}
          />
          <PasswordInput
            name="password"
            heading="Password"
            register={register}
            placeholder="********"
            formError={errors.password?.message}
          />
          <div className="flex justify-between items-center my-10 text-sm lg:text-base">
            <div className="text-[#718096] flex items-center space-x-2">
              <input type="checkbox" />
              <p>remember me</p>
            </div>
            <div
              className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer "
              onClick={() => navigate("/password-reset/email-entry")}
            >
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
          <PhoneButton />
        </form>
      </AuthContainer>
    </>
  );
};

export default LoginWithEmail;
