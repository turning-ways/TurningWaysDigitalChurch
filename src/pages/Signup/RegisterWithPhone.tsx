/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../ui/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import Header from "../../ui/Heading/Header";
import GoogleButton from "../../ui/Button/GoogleButton";
import PasswordInput from "../../ui/Input/PasswordInput";
import Input from "../../ui/Input/Input";
import NextButton from "../../ui/Button/NextButton";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import HeaderTwo from "../../ui/Heading/HeaderTwo";
import { useEffect, useState, useRef, useCallback } from "react";
import { useRegisterWithPhone, notify } from "../../hooks/useAuthData";
import { useUserDetailsStore } from "../../stores/user";
import EmailButton from "../../ui/Button/EmailButton";
import TermsOfServiceAndPrivacyPolicy from "../../components/Register/TermsOfServiceAndPrivacyPolicy";

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
    userDetails: any;
  }
}

const RegisterWithPhone = () => {
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);

  const schema = z
    .object({
      first_name: z
        .string()
        .min(4, { message: "Name should be at least 4 characters long" }),
      last_name: z
        .string()
        .min(4, { message: "Name should be at least 4 characters long" }),
      password: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" }),
      passwordConfirm: z
        .string()
        .min(8, { message: "Password should be at least 8 characters long" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
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
  const { mutate, isPending } = useRegisterWithPhone(recaptchaContainerRef);
  const { setPhone } = useUserDetailsStore();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = useCallback(
    (data: FormData) => {
      const { first_name, last_name, password, passwordConfirm } = data;

      if (checked) {
        mutate(
          {
            firstName: first_name,
            lastName: last_name,
            phoneNumber,
            password,
            passwordConfirm,
          },
          {
            onSuccess: () => {
              setPhone(phoneNumber);
            },
            onError: (error) => {
              notify(error.message || "An error occurred. Please try again.");
            },
          }
        );
      } else {
        notify("Please agree to our terms of service and privacy policy");
      }
      setPhone(phoneNumber);
    },
    [checked, phoneNumber, mutate, setPhone]
  );

  return (
    <AuthContainer center="sm:items-center md:pt-0">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="bg-white py-10">
        <div className="mb-10">
          <Header>Sign Up</Header>
          <p className="text-[#949995] text-base lg:text-[18px]">
            Already have an account?{" "}
            <span
              className="text-secondary underline underline-offset-[3px] cursor-pointer"
              onClick={() => navigate("/")}>
              Sign in
            </span>
          </p>
        </div>
        <Input
          heading="First Name"
          name="first_name"
          register={register}
          placeholder="Temidire"
          formError={errors.first_name?.message}
        />
        <Input
          heading="Last Name"
          name="last_name"
          register={register}
          placeholder="Owoeye"
          formError={errors.last_name?.message}
        />
        <div className="mb-2">
          <HeaderTwo>Phone Number</HeaderTwo>
          <PhoneInput
            defaultCountry="ng"
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            inputStyle={{
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
            }}
            countrySelectorStyleProps={{
              buttonStyle: {
                height: "100%",
                paddingLeft: "10px",
                paddingRight: "10px",
                backgroundColor: "#F7FAFC",
                borderColor: "#EBEFF9",
                borderEndStartRadius: "12px",
                borderStartStartRadius: "12px",
              },
            }}
          />
        </div>
        <PasswordInput
          heading="Password"
          name="password"
          register={register}
          placeholder="********"
          formError={errors.password?.message}
        />
        <PasswordInput
          heading="Re-Enter Password"
          name="passwordConfirm"
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
        <div
          id="recaptcha-container"
          ref={recaptchaContainerRef}
          className="mb-3"
        />
        <NextButton isPending={isPending} />
        <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
          <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
          <div className="w-full h-[1px] bg-[#A0AEC0]" />
        </div>
        <GoogleButton />
        <EmailButton onClick={() => navigate("/register")} />
      </form>
    </AuthContainer>
  );
};

export default RegisterWithPhone;
