import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHelpCircleOutline } from "react-icons/io";
import { useUserAuth } from "../../stores/user";
import { success } from "../../hooks/useUpdatePassword";

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

  const navList = [
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Dashboard",
      icon: <RxDashboard className="text-2xl" />,
      route: `/admin/dashboard`,
    },
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Directory",
      route: `/admin/directory`,
      icon: <BsPeople className="text-2xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/FormsIcon.svg",
      title: "Forms",
      route: "/overview/forms",
      icon: <FaWpforms className="text-2xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/WorkflowIcon.svg",
      title: "Workflow",
      route: "/overview/workflow",
      icon: <GoWorkflow className="text-2xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/SettingsIcon.svg",
      title: "Settings",
      route: "/overview/settings",
      icon: <IoSettingsOutline className="text-2xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/HelpIcon.svg",
      title: "Help",
      route: "/overview/help",
      icon: <IoMdHelpCircleOutline className="text-2xl" />,
    },
  ];

  return (
    <nav className="px-8 pt-16 inline-flex flex-col bg-DarkBlue text-[#99A0B7] text-[18px] h-screen font-azo font-medium sticky top-0 justify-between">
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
              className={` hover:bg-DarkBlueHover hover:text-white py-2 pl-5 pr-10 rounded-[10px] cursor-pointer ${
                // location.pathname === item.route && "bg-DarkBlueHover text-white"
                active === item.title && "bg-DarkBlueHover text-white"
              }`}
            >
              <li className="flex gap-x-4">
                {item.icon}
                <div>{item.title}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div
        className={` hover:bg-DarkBlueHover hover:text-white py-2 pl-5 pr-10 rounded-[10px] cursor-pointer ${
          active === "Logout" && "bg-DarkBlueHover text-white"
        }`}
      >
        <li className="flex gap-x-4">
          <IoIosLogOut
            className="text-2xl self-center mb-10 cursor-pointer"
            onClick={() => {
              logoutUser();
            }}
          />
          <div>Logout</div>
        </li>
      </div>
    </nav>
  );
};

export default Navbar;
