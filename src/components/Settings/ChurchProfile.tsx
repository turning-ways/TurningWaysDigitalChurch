import Header from "./Header";

const ChurchProfile = () => {
  return (
    <section>
      <Header />
      <ul className="mt-10">
        {church_profile.map((item, index) => (
          <li
            key={index}
            className="space-y-[5px] px-[14px] py-[13px] border-b border-[#D4D4D4] mt-3"
          >
            <p className="text-[#7F7F7F]">{item.label}</p>
            <p>David Oyedepo</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ChurchProfile;

const church_profile = [
  {
    label: "Church Name",
  },
  {
    label: "Organizational Level",
  },
  {
    label: "Website",
  },
  {
    label: "Country",
  },
  {
    label: "Address",
  },
  {
    label: "Founded",
  },
];
