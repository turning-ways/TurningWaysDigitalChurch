import { Link } from "react-router-dom";

import { navList } from "./navlist";

import { TbVector } from "react-icons/tb";

interface NavBarProps {
  active?: string;
}

const Navbar: React.FC<NavBarProps> = ({ active }) => {
  // const location = useLocation();

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
