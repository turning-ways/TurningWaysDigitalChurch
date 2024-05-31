// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import AuthContainer from "../../components/Container/AuthContainer";
// import { useNavigate } from "react-router-dom";
// import Header from "../../components/Heading/Header";
// import GoogleButton from "../../components/Button/GoogleButton";
// import PasswordInput from "../../components/Input/PasswordInput";
// import Input from "../../components/Input/Input";
// import NextButton from "../../components/Button/NextButton";
// import { PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import HeaderTwo from "../../components/Heading/HeaderTwo";
// import { useEffect, useState } from "react";
// import useRegisterWithPhone from "../../hooks/Signup/useRegisterWithPhone";
// import EmailButton from "../../components/Button/EmailButton";
// import { useUserDetailsStore } from "../../stores/user";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "../../firebase.config";
// // import { success } from "../../hooks/useUpdatePassword";

// declare global {
//   interface Window {
//     recaptchaVerifier: any;
//     confirmationResult: any;
//   }
// }

// const RegisterWithPhone = () => {
//   const schema = z.object({
//     first_name: z
//       .string()
//       .min(4, { message: "Name should be atleast 4 characters long" }),
//     last_name: z
//       .string()
//       .min(4, { message: "Name should be atleast 4 characters long" }),
//     password: z
//       .string()
//       .min(5, { message: "Password should be atleast 5 characters long" }),
//     passwordConfirm: z
//       .string()
//       .min(8, { message: "Password should be atleast 8 characters long" }),
//   });

//   type FormData = z.infer<typeof schema>;

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//   });
//   const navigate = useNavigate();

//   const { mutate, isPending } = useRegisterWithPhone();

//   const [phoneNumber, setPhoneNumber] = useState("");

//   const { setPhone } = useUserDetailsStore();

//   useEffect(() => {
//     // Scroll to the top of the page
//     window.scrollTo(0, 0);
//   }, []);

//   // const onCaptchVerify = () => {
//   //   if (!window.recaptchaVerifier) {
//   //     window.recaptchaVerifier = new RecaptchaVerifier(
//   //       auth,
//   //       "recaptcha-container",
//   //       {
//   //         size: "invisible",
//   //         callback: () => {
//   //           // reCAPTCHA solved, allow signInWithPhoneNumber.
//   //           onSignUp();
//   //         },
//   //         "expired-callback": () => {},
//   //       }
//   //     );
//   //   }
//   // };

//   // const [loading, setLoading] = useState(false);

//   // const onSignUp = () => {
//   //   setLoading(true);
//   //   onCaptchVerify();

//   //   const appVerifier = window.recaptchaVerifier;
//   //   signInWithPhoneNumber(auth, phoneNumber, appVerifier)
//   //     .then((confirmationResult) => {
//   //       // SMS sent. Prompt user to type the code from the message, then sign the
//   //       // user in with confirmationResult.confirm(code).
//   //       window.confirmationResult = confirmationResult;
//   //       setLoading(false);
//   //       success("Otp has been sent");

//   //       // ...
//   //     })
//   //     .catch((error) => {
//   //       // Error; SMS not sent
//   //       // ...
//   //       console.log(error);
//   //       setLoading(false);
//   //     });
//   // };

//   const sendOtp = async () => {
//     try {
//       const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
//       const confirmation = signInWithPhoneNumber(auth, phoneNumber, recaptcha);
//       console.log(confirmation);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <AuthContainer center="sm:items-center pt-16 md:pt-0">
//         <form
//           onSubmit={handleSubmit((data) => {
//             // const { first_name, last_name, password, passwordConfirm } = data;
//             // setEmail(email);
//             // mutate({
//             //   first_name,
//             //   last_name,
//             //   password,
//             //   passwordConfirm,
//             //   phoneNumber,
//             // });
//             // onSignUp();
//             sendOtp();
//             setPhone(phoneNumber);
//             console.log(data, phoneNumber);
//           })}
//           className="bg-white py-10 px-6"
//         >
//           <div className=" mb-10">
//             <Header>Sign Up</Header>
//             <p className="text-[#949995] text-base lg:text-[18px]">
//               Already have an account?{" "}
//               <span
//                 className="text-secondary underline underline-offset-[3px] cursor-pointer"
//                 onClick={() => navigate("/")}
//               >
//                 Sign in
//               </span>
//             </p>
//           </div>
//           <Input
//             heading={"First Name"}
//             name={"first_name"}
//             register={register}
//             placeholder={"Temidire"}
//             formError={errors.first_name?.message}
//           />
//           <Input
//             heading={"Last Name"}
//             name={"last_name"}
//             register={register}
//             placeholder={"Owoeye"}
//             formError={errors.last_name?.message}
//           />

//           <div className="mb-2">
//             <HeaderTwo>Phone Number</HeaderTwo>

//             <PhoneInput
//               defaultCountry="ng"
//               value={phoneNumber}
//               onChange={(phone) => setPhoneNumber(phone)}
//               inputStyle={{
//                 width: "100%",
//                 paddingLeft: "10px",
//                 paddingTop: "24px",
//                 paddingRight: "10px",
//                 paddingBottom: "24px",
//                 backgroundColor: "#F7FAFC",
//                 borderColor: "#EBEFF9",
//                 borderStartEndRadius: "12px",
//                 borderEndEndRadius: "12px",
//                 fontSize: "18px",
//               }}
//               countrySelectorStyleProps={{
//                 buttonStyle: {
//                   height: "100%",
//                   paddingLeft: "10px",
//                   paddingRight: "10px",
//                   backgroundColor: "#F7FAFC",
//                   borderColor: "#EBEFF9",
//                   borderEndStartRadius: "12px",
//                   borderStartStartRadius: "12px",
//                 },
//               }}
//             />
//           </div>
//           <PasswordInput
//             heading={"Password"}
//             name={"password"}
//             register={register}
//             placeholder="********"
//             formError={errors.password?.message}
//           />
//           <PasswordInput
//             heading={"Re-Enter Password"}
//             name={"passwordConfirm"}
//             register={register}
//             placeholder="*********"
//             formError={errors.passwordConfirm?.message}
//           />
//           <div className="text-[#718096] flex items-center space-x-2 my-8">
//             <input type="checkbox" />
//             <p>
//               I agree to the{" "}
//               <span className="text-secondary">Terms of Service</span> and the{" "}
//               <span className="text-secondary">Privacy Policy</span>
//             </p>
//           </div>
//           <NextButton isPending={isPending} />
//           <div style={{ marginTop: "10px" }} id="recaptcha"></div>

//           <div className="flex items-center my-5 text-[#718096] w-full lg:max-w-[550px]">
//             <div className="w-full h-[1px] bg-[#A0AEC0]" />
//             <h2 className="mx-5 text-[#718096] text-xs">OR</h2>
//             <div className="w-full h-[1px] bg-[#A0AEC0]" />
//           </div>
//           <GoogleButton />
//           <EmailButton onClick={() => navigate("/register")} />
//         </form>
//       </AuthContainer>
//     </>
//   );
// };

// export default RegisterWithPhone;

const RegisterWithPhone = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>Ongoing changes👋🏼</div>
  )
}

export default RegisterWithPhone