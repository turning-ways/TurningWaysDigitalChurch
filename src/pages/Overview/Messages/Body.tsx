import { useState } from "react";
import { HiQuestionMarkCircle } from "react-icons/hi2";

interface BodyProps {
  title: string;
  placeholder: string;
  onMessageChange: (value: string) => void;
}

const Body: React.FC<BodyProps> = ({ title, placeholder, onMessageChange }) => {
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <p>
          {title} <span className="">*</span>
        </p>
        {/* <button className="bg-[#D9D9D9] px-6 py-2 rounded-lg">Preview</button> */}
      </div>
      <div className="border p-4 rounded-2xl h-96 relative bg-white">
        <textarea
          name=""
          id=""
          className="h-full w-full outline-none resize-none"
          placeholder={placeholder}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onMessageChange(e.target.value);
          }}
        ></textarea>
        <HiQuestionMarkCircle className="text-3xl text-[#7F7F7F] absolute bottom-0 right-0 m-2" />
      </div>
    </div>
  );
};

export default Body;
