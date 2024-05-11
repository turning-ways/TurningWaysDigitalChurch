import { RiAddCircleFill } from "react-icons/ri";

interface ButtonProp {
  text: string;
  onPress: () => void;
}

const ProfileEditButton: React.FC<ButtonProp> = ({ text, onPress }) => {
  return (
    <div className="sticky bottom-0 right-0 flex justify-end">
      <button
        className=" flex items-center bg-[#17275B] text-white p-4  rounded-[15px] gap-2 w-fit"
        onClick={onPress}
      >
        <RiAddCircleFill className="text-2xl" />
        <p className="text-sm">{text}</p>
      </button>
    </div>
  );
};

export default ProfileEditButton;
