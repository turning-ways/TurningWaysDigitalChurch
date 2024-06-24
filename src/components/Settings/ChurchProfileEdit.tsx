import { LuCamera } from "react-icons/lu";

const ChurchProfileEdit = () => {
  return (
    <section className="flex items-center flex-col w-[800px] h-[670px] bg-white p-5 rounded-lg">
      <figure className="border border-black w-20 h-20 rounded-full mb-5 flex justify-center items-center text-5xl relative">
        <p>P</p>
        <button className="mt-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 absolute -bottom-2 -right-2">
          <LuCamera className="text-xl" />
        </button>
      </figure>
      <form className="space-y-[38px] w-full">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label htmlFor="">{field.name}</label>
            <input
              type="text"
              className="py-2 px-4 rounded-[8px] border border-[#D9D9D9] outline-none"
            />
          </div>
        ))}
      </form>
      <div className="space-x-6 mt-10">
        <button className="py-2 px-[20px] border-[#555454] text-[#555454] border rounded-lg">
          Cancel
        </button>
        <button className="bg-[#0F1D48] text-white py-2 px-[20px] rounded-lg">
          Edit Profile
        </button>
      </div>
    </section>
  );
};

export default ChurchProfileEdit;

const fields = [
  { name: "Church Name" },
  { name: "Organizational Structure" },
  { name: "Website" },
  { name: "Church Founded" },
];
