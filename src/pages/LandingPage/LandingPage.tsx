import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input/Input";
import PasswordInput from "../../components/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton";
import GoogleButton from "../../components/Button/GoogleButton";
import useLogin from "../../hooks/useLogin";

const LandingPage = () => {
  const schema = z.object({
    inputKey: z.string(),
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
    <div className="flex justify-center">
      <div className="px-10 md:px-20 lg:px-10 py-6 max-w-[1440px]">
        <nav className="flex justify-between items-center">
          <img
            src="/assets/images/turningwayslogo.svg"
            alt=""
            className="w-36"
          />
          <ul className="flex text-[#6181E7] space-x-5 sm:space-x-10 items-center font-azo text-base sm:text-lg">
            <li>
              <button onClick={() => navigate("/register")}>Sign up</button>
            </li>
            <li>
              <button
                className="border rounded-[22px] py-1 px-8 border-[#3A62E1]"
                onClick={() => navigate("/login/email")}
              >
                Login
              </button>
            </li>
          </ul>
        </nav>
        <main className="lg:grid grid-cols-[1fr,1fr]  mt-5  gap-x-10">
          <form
            onSubmit={handleSubmit((data) => {
              const { inputKey, password } = data;
              mutate({ inputKey, password });
            })}
          >
            <h1 className="text-[#555454] text-[36px] lg:text-5xl font-azoBold lg:leading-[60px] lg:mb-4 text-center lg:text-start">
              Your one-stop digital church platform
            </h1>
            <p className="font-azo text=[#7F7E7E] lg:mb-4 text-center lg:text-start">
              TurningWays is an AI-powered digital tool designed to help
              churches efficiently organize their membership, manage giving,
              events and soul-winning all in one place.
            </p>
            <div className="flex items-center justify-center py-8 pr-8 lg:px-8 lg:hidden">
              <div className="relative">
                <img
                  src="/assets/images/Dashboard.svg"
                  alt="Dashboard on Tablet"
                  className="w-full h-auto"
                />
                <img
                  src="/assets/images/DashboardMobile.svg"
                  alt="Dashboard on Phone"
                  className="absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10"
                />
              </div>
            </div>
            <Input
              heading={"Email or Phone number"}
              name={"inputKey"}
              register={register}
              placeholder={"email or phone"}
              formError={errors.inputKey?.message}
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
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </div>
            </div>
            <NextButton text="Sign In" isPending={isPending} />
            <div className="flex items-center mt-3 text-[#718096] w-full lg:max-w-[550px]">
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
              <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
            </div>
            <GoogleButton />
            <div
              className="border border-[#CBD5E0] py-3 rounded-[20px] lg:space-x-1 flex  px-6 justify-center lg:justify-normal space-x-3 items-center w-full cursor-pointer mt-5"
              onClick={() => navigate("/register")}
            >
              <img
                src="/assets/images/twsymbol.svg"
                className="w-4 lg:w-fit"
                alt=""
              />
              <p className=" lg:text-center text-[#67728A] text-sm lg:text-lg lg:text-md font-medium lg:w-full ">
                New to TurningWays, Join Now
              </p>
            </div>
          </form>
          <div className="hidden lg:flex items-center justify-center p-8">
            <div className="relative">
              <img
                src="/assets/images/Dashboard.svg"
                alt="Dashboard on Tablet"
                className="w-full h-auto"
              />
              <img
                src="/assets/images/DashboardMobile.svg"
                alt="Dashboard on Phone"
                className="absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;

// className="absolute top-36 right-[-30px] w-1/2 h-auto md:w-1/3 lg:w-1/4"
