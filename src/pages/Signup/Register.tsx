import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../ui/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../ui/Heading/Header";
import { useUserDetailsStore } from "../../stores/user";
import { useRegister } from "../../hooks/useAuthData";
import GoogleButton from "../../ui/Button/GoogleButton";
import PasswordInput from "../../ui/Input/PasswordInput";
import Input from "../../ui/Input/Input";
import NextButton from "../../ui/Button/NextButton";
import PhoneButton from "../../ui/Button/PhoneButton";
import { useEffect, useState } from "react";
import { notify } from "../../hooks/useAuthData";
import TermsOfServiceAndPrivacyPolicy from "../../components/Register/TermsOfServiceAndPrivacyPolicy";
const Register = () => {
  const schema = z.object({
    first_name: z.string().min(1, { message: "Please fill this field" }),
    last_name: z.string().min(1, { message: "Please fill this field" }),
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters long" }),
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

  const [checked, setChecked] = useState(false);
  return (
    <>
      <AuthContainer center="sm:items-center md:pt-0">
        <form
          onSubmit={handleSubmit((data) => {
            const { first_name, last_name, email, password, passwordConfirm } =
              data;
            setEmail(email);
            if (password === passwordConfirm) {
              if (checked) {
                mutate({
                  first_name,
                  last_name,
                  email,
                  password,
                  passwordConfirm,
                });
              } else {
                notify(
                  "Please agree to our terms of service and privacy policy"
                );
              }
            } else {
              notify("Passwords doesn't match")
            }
          })}
          className="bg-white py-10"
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
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <TermsOfServiceAndPrivacyPolicy />
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
