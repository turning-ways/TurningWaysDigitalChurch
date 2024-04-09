import React, {
  useEffect,
  useRef,
  useState,
} from "react";

let currentOtpIndex: number = 0;

const OtpInput = () => {
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

  console.log(otp);
  console.log(value);
  

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") setActiveOTPIndex(currentOtpIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);
  return (
    <>
      {otp.map((_, index) => {
        return (
          <React.Fragment key={index}>
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              type="number"
              className="w-14 sm:w-28 h-12 border-b-2  bg-transparent outline-none text-center font-semibold text-xl border-b-[#CCE9D1]  focus:border-b-[#61BD74] focus:text-[#5E9942] text-[#CCE9D1] transition spin-button-none placeholder-[#CCE9D1]"
              onChange={handleChange}
              value={otp[index]}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              placeholder="0"
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default OtpInput;
