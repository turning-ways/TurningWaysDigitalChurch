import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { success } from "../../hooks/useUpdatePassword";
import { navList } from "./navlist";
import { useState } from "react";
import { motion as m } from "framer-motion";

interface NavBarProps {
  active?: string;
}

const Navbar: React.FC<NavBarProps> = ({ active }) => {
  const { setUser } = useUserAuth();

  const logoutUser = async () => {
    try {
      const response = await fetch(
        "https://digital-church.onrender.com/api/v1/users/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
        success("Logged Out");
      } else {
        console.error("Error logging out user:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <m.div
        className="cursor-pointer  flex flex-col lg:hidden px-5 sm:px-10 py-5"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ rotate: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <m.div
          className="h-[2.5px] w-5 bg-black mb-1"
          initial={{ y: 0, rotate: 0 }}
          animate={isOpen ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
        <m.div
          className={`h-[2.5px] bg-black mb-1 ${isOpen ? "w-5" : "w-3"}`}
          initial={{ opacity: 1 }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
        <m.div
          className="h-[2.5px] w-5 bg-black"
          initial={{ y: 0, rotate: 0 }}
          animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </m.div>
      <nav className="hidden px-4 pt-16 lg:inline-flex flex-col bg-DarkBlue text-[#99A0B7] h-screen font-azo font-medium sticky top-0 justify-between">
        <div>
          <div className="flex items-center space-x-2 mb-10 pl-5 mx-auto">
            <img
              src="/assets/images/Membership.svg"
              alt=""
              className="bg-[#2D833F] p-2 rounded-lg w-6 xl:w-8"
            />
            <p>Membership</p>
          </div>
          <ul className="gap-y-4 flex flex-col">
            {navList.map((item) => (
              <Link
                to={item.route}
                className={` hover:bg-DarkBlueHover hover:text-white py-2 pl-5 pr-6 rounded-[10px] cursor-pointer ${
                  // location.pathname === item.route && "bg-DarkBlueHover text-white"
                  active === item.title && "bg-DarkBlueHover text-white"
                }`}
              >
                <li className="flex gap-x-4">
                  {item.icon}
                  <div className="w-20 xl:w-28">{item.title}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div
          className={` hover:bg-DarkBlueHover hover:text-white py-2 pl-5 pr-10 rounded-[10px] cursor-pointer mb-10 ${
            active === "Logout" && "bg-DarkBlueHover text-white"
          }`}
          onClick={() => {
            logoutUser();
          }}
        >
          <li className="flex gap-x-4">
            <IoIosLogOut className="text-2xl self-center cursor-pointer" />
            <div>Logout</div>
          </li>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
