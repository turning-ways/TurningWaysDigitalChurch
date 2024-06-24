import { FaChevronRight } from "react-icons/fa6";
import { MdDelete, MdEdit } from "react-icons/md";

const MemberDetails = () => {
  return (
    <section>
      <header className="grid-cols-[90px,120px,70px,150px,1fr,1fr] hidden md:grid gap-x-3 bg-[#E8EDFF] rounded-t-[10px] border border-[#E6E6E6] py-[11px] px-[15px]">
        <h1>Profile</h1>
        <h1>Name</h1>
        <h1>Role</h1>
        <h1>Phone Number</h1>
        <h1>Email</h1>
        <h1>Gender</h1>
      </header>
      <main className="border border-[#E6E6E6] hidden md:block">
        {members.map((item, index) => (
          <div
            className={`grid-cols-[90px,120px,70px,150px,1fr,1fr] grid gap-x-3 py-[11px] px-[15px] items-center ${
              index !== members.length - 1 && "border-b"
            }`}
            key={index}
          >
            <div className="flex space-x-2 items-center">
              <input type="checkbox" />
              <div className="w-8 h-8 bg-red-200 rounded-full"> </div>
            </div>
            <h1 className="truncate">{item.name}</h1>
            <h1
              className={`truncate ${
                item.role.toLocaleLowerCase() === "admin"
                  ? "text-[#61BD74]"
                  : "text-[#73008F]"
              }`}
            >
              {item.role}
            </h1>
            <h1 className="truncate">{item.phone}</h1>
            <h1 className="truncate">{item.email}</h1>
            <div className="flex justify-between">
              <h1 className="truncate">{item.gender}</h1>
              <div className="flex space-x-1 lg:space-x-3 lg:text-lg items-center">
                <MdEdit className="cursor-pointer" />
                <MdDelete className="text-red-500 cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </main>

      <main>
        {members.map((item, index) => (
          <article className="flex md:hidden justify-between items-center cursor-pointer border-t py-2 px-4" key={index}>
            <div className="flex space-x-4">
              <input type="checkbox" />
              <div>
                <h1 className="text-[#555454]">{item.name}</h1>
                <p className="text-[#7F7E7E]">{item.dateOfCreation}</p>
              </div>
            </div>
            <FaChevronRight className="text-lg" />
          </article>
        ))}
      </main>
    </section>
  );
};

export default MemberDetails;

const members = [
  {
    name: "Temidire Owoeye",
    role: "Admin",
    phone: "+2349073210998",
    email: "temidireowoeye@gmail.com",
    gender: "male",
    dateOfCreation: "May 21. 2024. 18:07PM"
  },
  {
    name: "Temidire Owoeye",
    role: "Sub Admin",
    phone: "+2349073210998",
    email: "temidireowoeye@gmail.com",
    gender: "female",
    dateOfCreation: "May 21. 2024. 18:07PM"
  },
];
