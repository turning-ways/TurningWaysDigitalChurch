const GoogleButton = () => {
  return (
    <a
      className="border border-[#CBD5E0] rounded-[20px] py-3 flex justify-center space-x-3 items-center w-full lg:max-w-[550px] cursor-pointer"
      href="https://digital-church.onrender.com/api/v1/users/auth/google/admin"
    >
      <img src="../../../public/assets/images/Rectangle.svg" alt="" />
      <p className=" text-center text-[#67728A] text-sm lg:text-xl font-medium">
        Continue with google
      </p>
    </a>
  );
};

export default GoogleButton;
