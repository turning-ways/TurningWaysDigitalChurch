import { MdError } from "react-icons/md";
import HeaderTwo from "../Heading/HeaderTwo";
// import { UseFormRegister, FieldValues } from "react-hook-form";

export interface InputProps {
  heading: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  placeholder: string;
  formError: string | undefined;
  mutateError?: string | undefined;
}

const Input: React.FC<InputProps> = ({
  heading,
  name,
  register,
  placeholder,
  formError,
  mutateError,
}) => {
  return (
    <div className="mb-6">
      <HeaderTwo>{heading}</HeaderTwo>
      <div
        className={`border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ${
          formError ? "border-[#FF0000] border-2" : "border-[#EBEFF9] border"
        }`}
      >
        <input
          {...register(name)}
          type={"text"}
          className="outline-none w-full bg-inherit placeholder-[#4A5568] h-10"
          placeholder={placeholder}
        />
        {formError && <MdError style={{ color: "#FF0000", fontSize: 30 }} />}
      </div>
      {formError && <p className="text-[#FF0000]">{formError}</p>}
      {mutateError && (
        <p className="text-[#FF0000]">
          An account with this email already exists
        </p>
      )}
    </div>
  );
};

export default Input;
