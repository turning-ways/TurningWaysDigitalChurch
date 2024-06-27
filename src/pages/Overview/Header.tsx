import React, { useState } from "react";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { success } from "../../hooks/useAuthData";
import Search from "../../ui/Search";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const { user } = useUserAuth();
  const first_name = user?.first_name;
  const last_name = user?.last_name;
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const [active, setActive] = useState("");

  const { setUser } = useUserAuth();

  const logoutUser = async () => {
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
      } else {
        console.error("Error logging out user:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  return (
    <div className="space-y-5 font-azo flex flex-col relative">
      <div className="flex items-center gap-x-2">
        <div className="bg-yellow-400 h-10 w-10 justify-center flex items-center rounded-full">
          {user?.churchId?.name?.charAt(0)?.toUpperCase()}
        </div>
        <h1 className="tracking-widest">
          {user?.churchId?.name?.toUpperCase()}
        </h1>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-azoBold text-[#0F1D48] text-3xl">{text}</h2>
        <div className="flex space-x-4 items-center">
          <Search size="hidden md:flex" />
          <IoIosAddCircleOutline
            className="text-[45px] cursor-pointer hidden sm:block"
            onClick={() =>
              navigate("/admin/directory/add-member/personal-information")
            }
          />
          <IoMdNotificationsOutline style={{ fontSize: "28px" }} />
          <div className="flex space-x-2 items-center">
            <div
              className="flex space-x-2 items-center w-[28px] "
              onClick={() => setShowProfile(!showProfile)}
            >
              {user?.photo ? (
                <img
                  src={user.photo}
                  className="w-full h-[28px] rounded-full"
                />
              ) : (
                <div className="border-black border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-50">
                  {first_name && first_name?.charAt(0) + last_name?.charAt(0)}
                </div>
              )}
            </div>
            <p className="hidden sm:block">Admin</p>
          </div>
        </div>
      </div>
      <Search size="md:hidden flex" />
      <div
        className={`self-end bg-white  p-6 space-y-4 border border-black absolute top-[84px] z-50 rounded-2xl text-[#434343] ${
          showProfile ? "block" : "hidden"
        }`}
      >
        <div className="flex space-x-2 items-center">
          {user?.photo ? (
            <img src={user.photo} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="border-black border w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-50">
              {first_name && first_name?.charAt(0) + last_name?.charAt(0)}
            </div>
          )}
          <div>
            <p>Administrator</p>
            <p className="text-sm text-[#555555]">
              {first_name && first_name + " " + last_name}
            </p>
          </div>
        </div>
        <h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">
          Profile
        </h1>
        <h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">
          Settings
        </h1>
        <h1
          className=" text-[#7F7F7F] hover:text-[#555555] cursor-pointer"
          onClick={() => setActive("logout")}
        >
          Logout
        </h1>
        {active === "logout" && (
          <Modal onClose={() => setActive("")}>
            <div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
              <p>Are you sure you want to log out</p>

              <div className="flex self-center space-x-4">
                <button
                  className=" text-[#ffffff] bg-[#e74a4a]  py-2 px-4 rounded-[14px] self-center"
                  onClick={logoutUser}
                >
                  Logout
                </button>
                <button
                  className=" text-[#7B7B7B] bg-[#F4F4F4] py-2 px-4 rounded-[14px] self-center"
                  onClick={() => setActive("")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Header;
