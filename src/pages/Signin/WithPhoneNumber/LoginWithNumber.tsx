import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthContainer from "../../../components/Container/AuthContainer";
import { useNavigate } from "react-router-dom";
import useLogin from "../../../hooks/useLogin";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import EmailButton from "../../../components/Button/EmailButton";
import GoogleButton from "../../../components/Button/GoogleButton";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useState } from "react";

const LoginWithNumber = () => {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .min(5, { message: "Password should be atleast 5 characters long" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    // register,
    handleSubmit,
    // formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          className="flex flex-col space-y-4"
          onSubmit={handleSubmit((data) => {
            const { email, password } = data;
            mutate({ inputKey: email, password });
          })}
        >
          <div>
            <div className=" mb-10">
              <Header>Sign In</Header>
              <p className="text-[#949995] text-base lg:text-[18px]">
                Don't have an account?{" "}
                <button
                  className="text-[#A0D7AB] underline underline-offset-[3px] cursor-pointer"
                  onClick={() => navigate("/register")}
                >
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
            <div className="flex justify-between items-center my-10 text-sm lg:text-base">
              <div className="text-[#718096] flex items-center space-x-2">
                <input type="checkbox" />
                <p>remember me</p>
              </div>
              <div
                className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer "
                onClick={() => navigate("/password-reset/email-entry")}
              >
                Forget Password?
              </div>
            </div>
            <button className="w-full py-3 text-center bg-[#446DE3] text-xl lg:text-2xl font-medium rounded-[10px] lg:rounded-[20px] text-white">
              Sign In
            </button>
          </div>
          <div className="">
            <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
              <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
            </div>

            <GoogleButton />
            <EmailButton onClick={() => navigate("/login/email")} />
          </div>
        </form>
      </AuthContainer>
    </>
  );
};

export default LoginWithNumber;
