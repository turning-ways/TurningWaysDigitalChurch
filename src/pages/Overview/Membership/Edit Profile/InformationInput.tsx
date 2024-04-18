import { ChangeEvent } from "react";

interface InformationInputProps {
  text: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InformationInput: React.FC<InformationInputProps> = ({ text, onChange, value}) => {
  return (
    <div className=" space-y-1 mb-4">
      <p className="text-[#727272]">
        {text} <span className="text-[#61BD74]"> *</span>
      </p>
      <div className="border rounded-lg p-2">
        <input className="outline-none text-[#434343] text-lg w-full" onChange={onChange} value={value}/>
      </div>
    </div>
  );
};

export default InformationInput;
