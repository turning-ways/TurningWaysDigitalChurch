import { ThreeDots } from "react-loader-spinner";

interface NextButtonProps {
  isPending?: boolean;
  text?: string;
}

const NextButton: React.FC<NextButtonProps> = ({ isPending, text }) => {
  return (
    <button className="w-full py-3 bg-primaryDark hover:bg-primary text-md lg:text-xl font-medium rounded-[10px] lg:rounded-[20px] text-white flex justify-center">
      {!isPending ? (
        <p>{text ? text : "Next"}</p>
      ) : (
        <ThreeDots height="25" width="50" color="#fff" />
      )}
    </button>
  );
};

export default NextButton;
