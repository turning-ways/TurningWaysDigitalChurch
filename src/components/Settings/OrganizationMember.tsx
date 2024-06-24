import { MdEdit, MdDelete } from "react-icons/md";
import { FaChevronRight } from "react-icons/fa6";
import AddRole from "./AddRole";

const OrganizationMember = () => {
  return (
    <section>
      <AddRole />
      <header className="md:grid hidden grid-cols-[150px,1fr,1fr] mt-10 bg-[#E8EDFF] border border-[#E6E6E6] rounded-t-[10px] px-[11px] py-[15px]">
        <div>Role</div>
        <div className="px-5">Description</div>
        <div>Creation Date</div>
      </header>
      <main className="md:grid hidden grid-cols-[150px,1fr,1fr] border border-[#E6E6E6] px-[11px] py-[15px]">
        <article className="flex space-x-3">
          <input type="checkbox" />
          <p className="text-[#61BD74]">Admin</p>
        </article>
        <article className="truncate px-5">
          The administrator role is responsible for the upbringing of children
          in the orphanage
        </article>
        <article className="flex justify-between items-center">
          <p>May 21. 2024. 18:07PM</p>
          <div className="flex space-x-3 text-2xl">
            <MdEdit />
            <MdDelete className="text-red-500" />
          </div>
        </article>
      </main>
      <main>
        <article className="flex md:hidden justify-between items-center mt-10 cursor-pointer border-t py-2 px-4">
          <div className="flex space-x-4">
            <input type="checkbox" />
            <div>
              <h1 className="text-[#555454]">Admin</h1>
              <p className="text-[#7F7E7E]">May 21. 2024. 18:07PM</p>
            </div>
          </div>
          <FaChevronRight className="text-lg" />
        </article>
      </main>
    </section>
  );
};

export default OrganizationMember;
