import { Link } from "react-router-dom";
import { TbVector } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { BsPeople } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut, IoMdHelpCircleOutline } from "react-icons/io";
// import { useChurchIdStore } from "../../stores/churchId";

interface NavBarProps {
  active?: string;
}

const Navbar: React.FC<NavBarProps> = ({ active }) => {
  // const location = useLocation();

  // const { churchId } = useChurchIdStore();

  const navList = [
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Dashboard",
      icon: <RxDashboard className="text-3xl" />,
      // route: `/admin/overview/dashboard/${churchId}`,
      route: `/admin/overview/dashboard/`,
    },
    {
      source: "../../../public/assets/images/Navbar/MembershipIcon.svg",
      title: "Membership",
      route: `/admin/church/members`,
      // route: `/admin/church/${churchId}/members`,
      icon: <BsPeople className="text-3xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/FormsIcon.svg",
      title: "Forms",
      route: "/overview/forms",
      icon: <FaWpforms className="text-3xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/WorkflowIcon.svg",
      title: "Workflow",
      route: "/overview/workflow",
      icon: <GoWorkflow className="text-3xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/SettingsIcon.svg",
      title: "Settings",
      route: "/overview/settings",
      icon: <IoSettingsOutline className="text-3xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/HelpIcon.svg",
      title: "Help",
      route: "/overview/help",
      icon: <IoMdHelpCircleOutline className="text-3xl" />,
    },
    {
      source: "../../../public/assets/images/Navbar/LogoutIcon.svg",
      title: "Logout",
      route: "/overview/logout",
      icon: <IoIosLogOut className="text-3xl" />,
    },
  ];

  return (
    <nav className="px-5 pt-16 inline-flex flex-col items-center bg-DarkBlue text-[#99A0B7] text-[18px] h-screen font-azo font-medium sticky top-0">
      <TbVector className="text-3xl mb-6" />
      <ul className="gap-y-4 flex flex-col">
        {navList.map((item) => (
          <Link
            to={item.route}
            className={` hover:bg-DarkBlueHover hover:text-white py-2 px-4 rounded-[10px] cursor-pointer ${
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
    </nav>
  );
};

export default Navbar;
