import { useLocation, useNavigate } from "react-router-dom";

const SettingsBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <section className="my-10">
      <ul className="flex py-[10px] px-[12px] bg-[#EFF1FA] space-x-6 rounded-[10px] overflow-scroll scrollbar-hide">
        {list.map((item, index) => (
          <li
            key={index}
            className={`p-2 rounded-[10px]  whitespace-nowrap cursor-pointer ${
              location.pathname === `/admin/setting/${item.id}`
                ? "text-white bg-[#294188]"
                : "text-[#464748]"
            }`}
            onClick={() => navigate(`/admin/setting/${item.id}`)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SettingsBar;

const list = [
  {
    name: "Account Settings",
    id: "account",
  },
  {
    name: "Church Profile",
    id: "church-profile",
  },
  {
    name: "Organization Member",
    id: "organization-member",
  },
  {
    name: "Roles and Permission",
    id: "roles-and-permission",
  },
];
