import AuthContainer from "../../components/Container/AuthContainer";
import Header from "../../components/Heading/Header";

import React, { useEffect, useRef, useState } from "react";
import useVerifyOtp from "../../hooks/ForgotPassword/useVerifyOtp";
import { useUserDetailsStore } from "../../stores/user";
import NextButton from "../../components/Button/NextButton";
import useForgotPassword from "../../hooks/ForgotPassword/useForgotPassword";

let currentOtpIndex: number = 0;

const ForgotPasswordOtp = () => {
  const [value, setValue] = useState<boolean>(false);

  //
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const newOTP: string[] = [...otp];
    newOTP[currentOtpIndex] = inputValue.substring(inputValue.length - 1);
    setOtp(newOTP);
    if (!inputValue) setActiveOTPIndex(currentOtpIndex - 1);
    else setActiveOTPIndex(currentOtpIndex + 1);
    if (inputValue !== "") {
      setValue(true);
    } else {
      setValue(false);
    }
  };

  console.log(value);
  console.log(otp);

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") setActiveOTPIndex(currentOtpIndex - 1);
  };

  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let interval: number;
    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setTimerActive(false);
            return 60;
          } else {
            return prevTimer - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const { mutate, isPending } = useVerifyOtp();
  const { email } = useUserDetailsStore();
  const { mutate: sendOtp } = useForgotPassword();
  return (
    <>
      <AuthContainer center="sm:items-center h-screen pt-16 md:pt-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("dire");
            mutate({ token: otp.join("") });
          }}
        >
          <div className="space-y-2 mb-10">
            <p>
              <span className="text-[#446DE3] text-2xl">2</span> of 3
            </p>
            <Header>Verify your account</Header>
            <p className="text-[#949995]">
              Kindly enter the verification code (OTP) that was sent to you
            </p>
          </div>
          <div className="mb-6 flex justify-between max-w-[550px] space-x-4">
            {otp.map((_, index) => {
              return (
                <React.Fragment key={index}>
                  <input
                    ref={index === activeOTPIndex ? inputRef : null}
                    type="text"
                    className="w-full h-12 border-b-2  bg-transparent outline-none text-center font-semibold border-b-[#CCE9D1]  focus:border-b-[#61BD74] focus:text-[#5E9942] text-[#CCE9D1] transition spin-button-none placeholder-[#CCE9D1]"
                    onChange={handleChange}
                    value={otp[index]}
                    onKeyDown={(e) => handleOnKeyDown(e, index)}
                    placeholder="0"
                  />
                </React.Fragment>
              );
            })}
          </div>
          <NextButton isPending={isPending} text="Verify" />
        </form>
        <p className="mt-3 text-[#949995]">Resend code in {timer} seconds</p>
        <p className="mt-3">
          Didn't get a code?{" "}
          <button
            className={`text-[#CCE9D1]  ${
              timerActive
                ? "cursor-not-allowed"
                : "cursor-pointer hover:text-[#61BD74]"
            }`}
            disabled={timerActive}
            onClick={() => {
              setTimerActive(true);
              sendOtp({ inputKey: email });
            }}
          >
            Resend Code
          </button>
        </p>
      </AuthContainer>
    </>
  );
};

export default ForgotPasswordOtp;
