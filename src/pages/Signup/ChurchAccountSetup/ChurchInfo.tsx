// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

import AuthContainer from "../../../components/Container/AuthContainer";
import useRegister from "../../../hooks/useRegister";
import Header from "../../../components/Heading/Header";
import HeaderTwo from "../../../components/Heading/HeaderTwo";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ChurchInfo = () => {
  // const schema = z.object({
  //   firstName: z.string().email({ message: "Please enter a valid email" }),
  //   lastName: z
  //     .string()
  //     .min(5, { message: "Password should be atleast 5 characters long" }),
  //   passwordConfirm: z
  //     .string()
  //     .min(5, { message: "Password should be atleast 5 characters long" }),
  // });

  // type FormData = z.infer<typeof schema>;

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<FormData>({
  //   resolver: zodResolver(schema),
  // });

  // const { mutate } = useRegister();

  const navigate = useNavigate();

  return (
    <>
      <AuthContainer center="sm:items-center">
        <form
          className=""
          // onSubmit={handleSubmit((data) => {
          //   if (isValid) {
          //     mutate(data);
          //   }
          //   const { email, password, passwordConfirm } = data;
          //   mutate({ email, password, passwordConfirm });
          //   console.log(data);
          // })}
        >
          <div className="mb-5 max-w-[550px] mx-auto">
            <p>
              <span className="text-[#446DE3] text-2xl">3</span> of 3
            </p>
            <Header>Church Account Setup</Header>
            <p className="text-[#949995]">
              Kindly fill in the admin details below
            </p>
          </div>
          <div className="space-y-8 sm:h-[440px] overflow-y-scroll">
            <div className="mb-2">
              <HeaderTwo>
                Select parent church <span className="text-secondary">*</span>
              </HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
                <input
                  className="outline-none w-full h-auto bg-inherit  "
                  placeholder="Winners Chapel"
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />

                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
            </div>
            <div className="mb-2">
              <HeaderTwo>
                Select church level within parent church{" "}
                <span className="text-secondary">*</span>
              </HeaderTwo>
              <div className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-lg w-full px-3 py-1 flex items-center ">
                <input
                  className="outline-none w-full h-auto bg-inherit  "
                  placeholder="Winners Chapel"
                />
                <div className="border-l border-l-[#CFD9E0] h-10 mx-3" />

                <TiArrowSortedDown className="cursor-pointer text-3xl" />
              </div>
            </div>

            <div className="mb-2">
              <HeaderTwo>
                Enter your church's street address{" "}
                <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Magodo"
              />
            </div>

            <div className="mb-2">
              <HeaderTwo>
                City <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Magodo"
              />
            </div>

            <div className="mb-2">
              <HeaderTwo>
                State <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="Lagos"
              />
            </div>

            <div className="mb-2">
              <HeaderTwo>
                Postal/Zip Code <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="123456"
              />
            </div>

            <div className="mb-2">
              <HeaderTwo>
                Country of Operation <span className="text-secondary">*</span>
              </HeaderTwo>
              <input
                type="text"
                className="border border-[#EBEFF9] bg-[#F7FAFC] rounded-xl w-full p-3 outline-none "
                placeholder="123456"
              />
            </div>
          </div>
          <button
            className="w-full py-3 mb-3 text-center bg-blue-600 my-10 rounded-[20px] text-white font-medium text-xl"
            onClick={() => navigate("/request")}
          >
            Next
          </button>
        </form>
      </AuthContainer>
    </>
  );
};

export default ChurchInfo;
