import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../ui/Container/AuthContainer";
// import { useNavigate } from "react-router-dom";
import Header from "../../ui/Heading/Header";
// import { useUserDetailsStore } from "../../stores/user";
// import { useRegister } from "../../hooks/useAuthData";
// import GoogleButton from "../../ui/Button/GoogleButton";
import PasswordInput from "../../ui/Input/PasswordInput";
import Input from "../../ui/Input/Input";
import NextButton from "../../ui/Button/NextButton";
import { useEffect, useState } from "react";
// import { notify } from "../../hooks/useAuthData";
import TermsOfServiceAndPrivacyPolicy from "../../components/Register/TermsOfServiceAndPrivacyPolicy";
const Invite = () => {
  const schema = z.object({
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
    // handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
//   const navigate = useNavigate();

//   const { mutate, isPending } = useRegister();

//   const { setEmail } = useUserDetailsStore();
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const [checked, setChecked] = useState(false);
  return (
    <>
      <AuthContainer center="sm:items-center md:pt-0">
        <form
        //   onSubmit={handleSubmit((data) => {
        //     const { email, password, passwordConfirm } = data;
        //     setEmail(email);
        //     if (password === passwordConfirm) {
        //       if (checked) {
        //         mutate({
        //           email,
        //           password,
        //           passwordConfirm,
        //         });
        //       } else {
        //         notify(
        //           "Please agree to our terms of service and privacy policy"
        //         );
        //       }
        //     } else {
        //       notify("Passwords doesn't match");
        //     }
        //   })}
          className="bg-white py-10"
        >
          <div className=" mb-4">
            <Header>Sign Up</Header>
            <p className="text-[#949995] text-base lg:text-[18px]">
              We warmly invite you to join Winners Chapel database
            </p>
          </div>
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
          <NextButton text="Sign up" />
        </form>
      </AuthContainer>
    </>
  );
};

export default Invite;
