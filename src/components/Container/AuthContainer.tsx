interface AuthContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  center?: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, center }) => {
  return (
    <div className={`px-8 lg:px-0 flex ${center}`}>
      <div className="flex flex-col py-10 w-full overflow-y-scroll max-w-[550px] mx-auto">
        {children}{" "}
      </div>
      {/* <footer className=" justify-between text-[#888888] w-full pb-3 flex text-sm items-center absolute bottom-0 px-8">
        <div className="flex items-center space-x-2">
          <img src="../../public/assets/images/Logo.svg" alt="" />
          <p className="mx-0">&copy; 2024 </p>
        </div>
        <ul className="flex space-x-4 ">
          <li className="hover:cursor-pointer">User Agreement</li>
          <li className="hover:cursor-pointer">Privacy Policy</li>
          <li className="hover:cursor-pointer">Copyright Policy</li>
          <li className="hover:cursor-pointer">Cookie Policy</li>
          <li className="hover:cursor-pointer">Support</li>
        </ul>
      </footer> */}
    </div>
  );
};

export default AuthContainer;
