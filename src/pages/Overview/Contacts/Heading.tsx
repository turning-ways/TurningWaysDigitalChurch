interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return (
    <h1 className="text-2xl text-[#6E7DAC] font-azoSemiBold mt-6 mb-2">
      {text}
    </h1>
  );
};

export default Heading;
