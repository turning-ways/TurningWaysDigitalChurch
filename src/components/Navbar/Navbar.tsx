import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { success } from "../../hooks/useUpdatePassword";
import { navList } from "./navlist";

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

  return (
    <nav className="px-4 pt-16 inline-flex flex-col bg-DarkBlue text-[#99A0B7] h-screen font-azo font-medium sticky top-0 justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-10 pl-5 ">
          <img
            src="/assets/images/Membership.svg"
            alt=""
            className="bg-[#2D833F] p-2 rounded-lg"
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
                <div className="w-28">{item.title}</div>
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
  );
};

export default Navbar;
