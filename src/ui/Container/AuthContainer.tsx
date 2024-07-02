import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface AuthContainerProps {
  children: React.ReactNode[] | React.ReactNode;
  center?: string;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, center }) => {
  return (
    <div className="relative bg-[#FFFDFD] flex flex-col space-y-4">
      <div className="bg-white w-full px-6 pt-6 pb-2  fixed md:w-fit md:bg-transparent z-50">
        <div
          className="bg-[#F5F7FD] w-fit  p-2 cursor-pointer rounded-full top-0"
          onClick={() => window.history.back()}
        >
          <MdOutlineKeyboardArrowLeft className="text-4xl text-[#162966]" />
        </div>
      </div>
      <div className={`h-full overflow-y-scroll px-8 lg:px-0 flex ${center}`}>
        <div className="flex flex-col py-10 w-full overflow-y-scroll max-w-[550px] mx-auto scrollbar-hide">
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
    </div>
  );
};

export default AuthContainer;
