import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { success } from "../../hooks/useAuthData";
import { navList } from "./navlist";
import { useEffect, useRef, useState } from "react";
import { motion as m } from "framer-motion";
import Modal from "../Modal/Modal";
import { ThreeDots } from "react-loader-spinner";

interface NavBarProps {
  active?: string;
}

const Navbar: React.FC<NavBarProps> = ({ active }) => {
  const { setUser } = useUserAuth();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const logoutUser = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://turningways.onrender.com/api/v1/users/logout",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null);
        success("Logged Out");
        setIsLoading(false);
      } else {
        console.error("Error logging out user:", response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside the dropdown
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // Effect to set up event listener when component mounts
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <m.div
        className={`cursor-pointer  flex flex-col lg:hidden px-5 sm:px-10 py-5 fixed z-50 w-full ${
          isOpen ? "bg-inherit" : "bg-white"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ rotate: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <m.div
          className={`h-[2.5px] w-5 ${isOpen ? "bg-white" : "bg-black"} mb-1`}
          initial={{ y: 0, rotate: 0 }}
          animate={isOpen ? { y: 6.5, rotate: 45 } : { y: 0, rotate: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
        <m.div
          className={`h-[2.5px] mb-1 ${
            isOpen ? "w-5 bg-white" : "w-3 bg-black"
          }`}
          initial={{ opacity: 1 }}
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
        <m.div
          className={`h-[2.5px] w-5 ${isOpen ? "bg-white" : "bg-black"}`}
          initial={{ y: 0, rotate: 0 }}
          animate={isOpen ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        />
      </m.div>
      <nav
        className={`${
          isOpen ? "w-1/2 fixed z-20" : "hidden"
        }   lg:w-auto px-4 pt-16 lg:inline-flex flex-col bg-DarkBlue text-[#99A0B7] h-screen font-azo font-medium lg:sticky top-0 justify-between`}
      >
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
            {navList.map((item, index) => (
              <Link
                to={item.route}
                className={` hover:bg-DarkBlueHover hover:text-white py-2 pl-5 pr-6 rounded-[10px] cursor-pointer ${
                  // location.pathname === item.route && "bg-DarkBlueHover text-white"
                  active === item.title && "bg-DarkBlueHover text-white"
                }`}
                key={index}
              >
                <li className="flex gap-x-4" key={index}>
                  {item.icon}
                  <div className="w-20 xl:w-28">{item.title}</div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div
          className={` hover:bg-DarkBlueHover absolute bottom-0 lg:block hover:text-white py-2 pl-5 pr-10 rounded-[10px] cursor-pointer mb-10 ${
            active === "Logout" && "bg-DarkBlueHover text-white"
          }`}
          onClick={() => {
            setOpen(true);
          }}
        >
          <li className="flex gap-x-4">
            <IoIosLogOut className="text-2xl self-center cursor-pointer" />
            <div>Logout</div>
          </li>
        </div>
      </nav>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
            <p>Are you sure you want to log out</p>

            <div className="flex self-center space-x-4">
              <button
                className=" text-[#ffffff] bg-[#e74a4a]  py-2 w-[100px] flex justify-center rounded-[14px] self-center"
                onClick={() => logoutUser()}
              >
                {!isLoading ? (
                  <p>Logout</p>
                ) : (
                  <ThreeDots width={34} height={24} color="white" />
                )}
              </button>
              <button
                className=" text-[#7B7B7B] bg-[#F4F4F4] py-2 px-4 rounded-[14px] self-center"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
