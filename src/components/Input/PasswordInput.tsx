import { HiEyeSlash, HiMiniEye } from "react-icons/hi2";
import HeaderTwo from "../Heading/HeaderTwo";
import { useState } from "react";
import { InputProps } from "./Input";

const PasswordInput: React.FC<InputProps> = ({
  heading,
  name,
  register,
  placeholder,
  formError,
}) => {
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="mb-6">
      <HeaderTwo>{heading}</HeaderTwo>
      <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
        <input
          {...register(name)}
          type={!show ? "text" : "password"}
          className="outline-none w-full h-auto bg-inherit placeholder-[#4A5568] "
          placeholder={placeholder}
        />
        <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />
        <div onClick={() => setShow(!show)} className="mx-2">
          {!show ? (
            <HiMiniEye
              className="cursor-pointer"
              style={{
                color: "#718096",
              }}
            />
          ) : (
            <HiEyeSlash
              style={{
                color: "#718096",
              }}
            />
          )}
        </div>
      </div>
      {formError && <p className="text-[#FF0000]">{formError}</p>}
    </div>
  );
};

export default PasswordInput;
