// import { HiQuestionMarkCircle } from "react-icons/hi2";

interface SubjectProps{
    title: string;
    placeholder: string;
}

const Subject: React.FC<SubjectProps> = ({title, placeholder}) => {
  return (
    <div className="space-y-2">
      <p>{title}</p>
      <div className="flex border justify-between p-2 px-4 rounded-2xl space-x-5 bg-white">
        <input
          type="text"
          className="w-full outline-none"
          placeholder={placeholder}
        />
        {/* <HiQuestionMarkCircle className="text-3xl text-[#7F7F7F]" /> */}
      </div>
    </div>
  );
};

export default Subject;
