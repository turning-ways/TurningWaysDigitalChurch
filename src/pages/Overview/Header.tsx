import React, { useEffect, useRef, useState } from "react";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal/Modal";
import { success } from "../../hooks/useAuthData";
import Search from "../../ui/Search";
import axiosInstance from "../../axios";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const { firstName, lastName, church, photo, role } = user;
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [active, setActive] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUser } = useUserAuth();

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.get(
        "https://turningways-api-3hcn.onrender.com/api/v1/auth/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        setUser(null);
        localStorage.clear();
        navigate("/");
        success("Logged Out");
      } else {
        console.error("Error logging out user:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out user:", error);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderProfileIcon = () => {
    if (photo) {
      return (
        <img
          src={photo}
          className="z-50 size-10 rounded-full object-cover border-gray-100 border"
        />
      );
    }
    return (
      <div className="z-50 flex items-center justify-center w-10 h-10 font-semibold text-white border border-gray-200 rounded-full cursor-pointer bg-primary">
        {firstName?.charAt(0)}
        {lastName?.charAt(0)}
      </div>
    );
  };

  return (
    <div
      className="relative flex flex-col space-y-5 font-azo"
      ref={dropdownRef}>
      <div className="flex items-center gap-x-2">
        <div className="flex items-center justify-center w-10 h-10 bg-yellow-400 rounded-full leading-none text-lg font-azoSemiBold cursor-default">
          {church?.charAt(0)?.toUpperCase()}
        </div>
        <h1 className="tracking-widest">{church?.toUpperCase()}</h1>
      </div>
      <div className="flex items-center justify-between w-full">
        <h2 className="font-azoBold text-[#0F1D48] text-3xl cursor-default">
          {text}
        </h2>
        <div className="flex items-center space-x-3">
          <Search size="hidden md:flex" />
          <IoIosAddCircleOutline
            className="text-[36px] cursor-pointer hidden sm:block"
            onClick={() =>
              navigate("/admin/directory/add-member/personal-information")
            }
          />
          <IoMdNotificationsOutline
            style={{ fontSize: "28px" }}
            className="text-gray-300"
          />
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowProfile(!showProfile)}>
            <div className="flex items-center space-x-2 w-full">
              {renderProfileIcon()}
              <p className="text-lg hidden md:flex">{firstName}</p>
            </div>
          </div>
        </div>
      </div>
      <Search size="md:hidden flex" />
      {/* Menu */}
      {showProfile && (
        <div className="self-end bg-white p-6 space-y-4 border border-black absolute top-[84px] z-50 rounded-2xl text-[#434343]">
          <div className="flex items-center space-x-2">
            {renderProfileIcon()}
            <div>
              <p className="text-base text-[#555555]">
                {firstName} {lastName}
              </p>
              <p className="text-sm font-medium text-primary">{role}</p>
            </div>
          </div>
          <h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">
            Profile
          </h1>
          <h1 className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer">
            Settings
          </h1>
          <h1
            className="text-[#7F7F7F] hover:text-[#555555] cursor-pointer"
            onClick={() => setActive("logout")}>
            Logout
          </h1>
          {active === "logout" && (
            <Modal onClose={() => setActive("")}>
              <div className="bg-white px-[26px] py-[37px] rounded-2xl text-lg flex flex-col gap-6">
                <p>Are you sure you want to log out?</p>
                <div className="flex self-center space-x-4">
                  <button
                    className="text-[#ffffff] bg-[#e74a4a] py-2 px-4 rounded-[14px]"
                    onClick={logoutUser}>
                    Logout
                  </button>
                  <button
                    className="text-[#7B7B7B] bg-[#F4F4F4] py-2 px-4 rounded-[14px]"
                    onClick={() => setActive("")}>
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
