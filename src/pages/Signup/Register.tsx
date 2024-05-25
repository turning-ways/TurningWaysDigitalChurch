import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Heading/Header";
import { useUserDetailsStore } from "../../stores/user";
import useRegister from "../../hooks/Signup/useRegister";
import GoogleButton from "../../components/Button/GoogleButton";
import PasswordInput from "../../components/Input/PasswordInput";
import Input from "../../components/Input/Input";
import NextButton from "../../components/Button/NextButton";
import PhoneButton from "../../components/Button/PhoneButton";
import { useEffect } from "react";
const Register = () => {
  const schema = z.object({
    first_name: z
      .string()
      .min(4, { message: "Name should be atleast 4 characters long" }),
    last_name: z
      .string()
      .min(4, { message: "Name should be atleast 4 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 8 characters long" }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters long" }),
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

  const { mutate, isPending } = useRegister();

  const { setEmail } = useUserDetailsStore();
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <AuthContainer center="sm:items-center pt-16 md:pt-0">
        <form
          onSubmit={handleSubmit((data) => {
            const { first_name, last_name, email, password, passwordConfirm } =
              data;
            setEmail(email);
            mutate({ first_name, last_name, email, password, passwordConfirm });
            console.log(
              first_name,
              last_name,
              email,
              password,
              passwordConfirm
            );
          })}
          className="bg-white py-10 px-6"
        >
          <div className=" mb-10">
            <Header>Sign Up</Header>
            <p className="text-[#949995] text-base lg:text-[18px]">
              Already have an account?{" "}
              <span
                className="text-secondary underline underline-offset-[3px] cursor-pointer"
                onClick={() => navigate("/login/email")}
              >
                Sign in
              </span>
            </p>
          </div>
          <Input
            heading={"First Name"}
            name={"first_name"}
            register={register}
            placeholder={"Temidire"}
            formError={errors.first_name?.message}
          />
          <Input
            heading={"Last Name"}
            name={"last_name"}
            register={register}
            placeholder={"Owoeye"}
            formError={errors.last_name?.message}
          />

          <Input
            heading={"Email"}
            name={"email"}
            register={register}
            placeholder={"temidireowoeye@gmail.com"}
            formError={errors.email?.message}
          />
          <PasswordInput
            heading={"Password"}
            name={"password"}
            register={register}
            placeholder="********"
            formError={errors.password?.message}
          />
          <PasswordInput
            heading={"Re-Enter Password"}
            name={"passwordConfirm"}
            register={register}
            placeholder="*********"
            formError={errors.passwordConfirm?.message}
          />
          <div className="text-[#718096] flex items-center space-x-2 my-8">
            <input type="checkbox" />
            <p>
              I agree to the{" "}
              <span className="text-secondary">Terms of Service</span> and the{" "}
              <span className="text-secondary">Privacy Policy</span>
            </p>
          </div>
          <NextButton isPending={isPending} />
          <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
            <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
            <div className="w-full h-[1px] bg-[#A0AEC0]" />
          </div>
          <GoogleButton />
          <PhoneButton onClick={() => navigate("/register/phone")} />
        </form>
      </AuthContainer>
    </>
  );
};

export default Register;
