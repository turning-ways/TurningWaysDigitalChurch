import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import useAuth from "../../hooks/useAuthorize";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const { data: admin } = useAuth();
  return (
    <div className="space-y-5 font-azo">
      <h1 className="tracking-widest">Winner's Chapel</h1>
      <div className="flex justify-between items-center">
        <h2 className="font-azoBold text-[#0F1D48] text-3xl">{text}</h2>
        <div className="flex space-x-5 items-center">
          <div className="rounded-2xl bg-[#F2F0F0] flex py-2 px-3 gap-x-3 items-center h-fit w-[470px]">
            <CiSearch style={{ fontSize: "29px", color: "#6D6C6C" }} />
            <input
              type="text"
              placeholder="search "
              className="bg-transparent outline-none placeholder-[#6D6C6C]"
            />
          </div>
          <IoIosAddCircleOutline style={{ fontSize: "45px" }} />
          <IoMdNotificationsOutline style={{ fontSize: "45px" }} />
          <div className="flex space-x-2 items-center">
            <div className="bg-black w-10 h-10 rounded-full " />
            <div>
              <p>Admin</p>
              <p>{admin.data.user.first_name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
