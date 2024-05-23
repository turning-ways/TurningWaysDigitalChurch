const GoogleButton = () => {
  return (
    <a
      className="border border-[#CBD5E0] rounded-[20px] py-3 px-6 flex justify-center lg:justify-normal space-x-2 lg:space-x-3 items-center w-full  cursor-pointer mt-5"
      href="https://digital-church.onrender.com/api/v1/users/auth/google/admin"
    >
      <img src="/assets/images/Google.svg" alt="" className="w-4 lg:w-fit" />
      <p className=" lg:text-center lg:w-full text-[#67728A] text-sm lg:text-lg font-medium">
        Continue with google
      </p>
    </a>
  );
};

export default GoogleButton;
