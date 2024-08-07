import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../ui/Input/Input";
import PasswordInput from "../../ui/Input/PasswordInput";
import { useNavigate } from "react-router-dom";
import NextButton from "../../ui/Button/NextButton";
import GoogleButton from "../../ui/Button/GoogleButton";
import { useLogin } from "../../hooks/useAuthData";
import { useEffect, useCallback, useState } from "react";

const schema = z.object({
  inputKey: z.string(),
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 characters long" }),
});

type FormData = z.infer<typeof schema>;

const LandingPage = () => {
  const [dashboardImgError, setDashboardImgError] = useState(false);
  const [dashboardMobileImgError, setDashboardMobileImgError] = useState(false);
  const [symbolImgError, setSymbolImgError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const loginQuery = useLogin();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) localStorage.clear();
  }, []);

  const onSubmit = (data: FormData) => {
    const { inputKey, password } = data;
    console.log(inputKey, password);
    loginQuery.mutate({ inputKey, password });
  };

  const navigateToRegister = useCallback(
    () => navigate("/register"),
    [navigate]
  );
  const navigateToLogin = useCallback(
    () => navigate("/login/email"),
    [navigate]
  );
  const navigateToForgotPassword = useCallback(
    () => navigate("/forgot-password"),
    [navigate]
  );

  return (
    <div className="flex justify-center">
      <div className="px-10 md:px-20 py-6 max-w-[1440px]">
        <nav className="flex justify-between items-center">
          <img
            src="/assets/images/turningwayslogo.svg"
            alt="TurningWays Logo"
            className="w-36"
            loading="lazy"
            onError={() => setSymbolImgError(true)}
          />
          <ul className="flex text-[#6181E7] sm:space-x-4 items-center font-azo text-base sm:text-lg">
            <li className="self-end sm:self-center">
              <button
                onClick={navigateToRegister}
                className="rounded-[22px] border border-transparent hover:border-[#3A62E1] py-1 px-8 transition-all duration-400">
                Sign up
              </button>
            </li>
            <li>
              <button
                className="border rounded-[22px] py-1 px-8 border-[#3A62E1] hidden sm:block hover:bg-[#3A62E1] hover:text-white transition-all duration-400"
                onClick={navigateToLogin}>
                Login
              </button>
            </li>
          </ul>
        </nav>
        <main className="lg:grid grid-cols-[1fr,1fr] xl:grid-cols-[500px,1fr] mt-5 gap-x-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-[#555454] text-[36px] lg:text-5xl font-azoBold lg:leading-[60px] lg:mb-4 text-center lg:text-start">
              Your one-stop digital church platform
            </h1>
            <p className="font-azo text-[#7F7E7E] lg:mb-4 text-center lg:text-start">
              TurningWays is an AI-powered digital tool designed to help
              churches efficiently organize their membership, manage giving,
              events, and soul-winning all in one place.
            </p>
            <div className="flex items-center justify-center py-8 pr-8 lg:px-8 lg:hidden">
              <div className="relative">
                <img
                  src="/assets/images/Dashboard.svg"
                  alt="Dashboard on Tablet"
                  className={`w-full h-auto ${
                    dashboardImgError ? "hidden" : ""
                  }`}
                  loading="lazy"
                  onError={() => setDashboardImgError(true)}
                />
                <img
                  src={
                    dashboardImgError
                      ? "/assets/images/fallback-dashboard-mobile.svg"
                      : "/assets/images/DashboardMobile.svg"
                  }
                  alt="Dashboard on Phone"
                  className={`absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10 ${
                    dashboardMobileImgError ? "hidden" : ""
                  }`}
                  loading="lazy"
                  onError={() => setDashboardMobileImgError(true)}
                />
              </div>
            </div>
            <Input
              heading="Email or Phone number"
              name="inputKey"
              register={register}
              placeholder="email or phone"
              formError={errors.inputKey?.message}
            />
            <PasswordInput
              name="password"
              heading="Password"
              register={register}
              placeholder="********"
              formError={errors.password?.message}
            />
            <div className="flex justify-between items-center my-6 text-sm lg:text-base">
              <div className="text-[#718096] flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 accent-[#61BD74]" />
                <p className="text-base">Remember me</p>
              </div>
              <div
                className="text-[#61BD74] underline underline-offset-[3px] cursor-pointer"
                onClick={navigateToForgotPassword}>
                Forgot Password?
              </div>
            </div>
            <NextButton text="Sign In" isPending={loginQuery.isPending} />
            <div className="flex items-center mt-3 text-[#718096] w-full">
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
              <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
              <div className="w-full h-[1px] bg-[#A0AEC0]" />
            </div>
            <GoogleButton />
            <div
              className="border border-[#CBD5E0] py-3 rounded-[8px] lg:space-x-1 flex px-6 justify-center lg:justify-normal space-x-3 items-center w-full cursor-pointer mt-5 hover:bg-slate-50"
              onClick={navigateToRegister}>
              <img
                src={
                  symbolImgError
                    ? "/assets/images/fallback-symbol.svg"
                    : "/assets/images/twsymbol.svg"
                }
                className="w-5 lg:w-7"
                alt="TurningWays Symbol"
                loading="lazy"
                onError={() => setSymbolImgError(true)}
              />
              <p className="lg:text-center text-[#67728A] text-sm lg:text-base font-medium lg:w-full">
                New to TurningWays, Join Now
              </p>
            </div>
          </form>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <img
                src="/assets/images/Dashboard.svg"
                alt="Dashboard on Tablet"
                className={`w-full h-auto ${dashboardImgError ? "hidden" : ""}`}
                loading="lazy"
                onError={() => setDashboardImgError(true)}
              />
              <img
                src={
                  dashboardImgError
                    ? "/assets/images/fallback-dashboard-mobile.svg"
                    : "/assets/images/DashboardMobile.svg"
                }
                alt="Dashboard on Phone"
                className={`absolute bottom-0 right-0 w-1/3 h-auto transform translate-x-10 translate-y-10 ${
                  dashboardMobileImgError ? "hidden" : ""
                }`}
                loading="lazy"
                onError={() => setDashboardMobileImgError(true)}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
