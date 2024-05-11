interface InformationInputProps {
  text: string;
  subText?: string;
}

const InformationInput: React.FC<InformationInputProps> = ({
  text,
  subText,
}) => {
  return (
    <div className="px-5 pt-6 pb-2 border-b space-y-2">
      <p className="text-[#727272]">{text}</p>
      <p className="outline-none text-[#434343] text-lg w-full">{subText}</p>
    </div>
  );
};

export default InformationInput;
