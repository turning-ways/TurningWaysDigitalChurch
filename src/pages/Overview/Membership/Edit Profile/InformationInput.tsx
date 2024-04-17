interface InformationInputProps {
  text: string;
}

const InformationInput: React.FC<InformationInputProps> = ({ text }) => {
  return (
    <div className=" space-y-1 mb-4">
      <p className="text-[#727272]">
        {text} <span className="text-[#61BD74]"> *</span>
      </p>
      <div className="border rounded-lg p-2">
        <input className="outline-none text-[#434343] text-lg w-full" />
      </div>
    </div>
  );
};

export default InformationInput;
