import React from "react";
import { CiSearch } from "react-icons/ci";
import {
  IoIosAddCircleOutline,
  IoMdNotificationsOutline,
} from "react-icons/io";
import { useUserAuth } from "../../stores/user";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  const { user } = useUserAuth();
  const first_name = user?.first_name;
  const last_name = user?.last_name;
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
            <div className="border-black border w-10 h-10 rounded-full flex justify-center items-center">
              {first_name && first_name?.charAt(0) + last_name?.charAt(0)}
            </div>
            <div>
              <p onClick={() => console.log(user)}>Admin</p>
              <p>
                {first_name
                  ? first_name?.charAt(0).toUpperCase() + first_name?.slice(1)
                  : ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
