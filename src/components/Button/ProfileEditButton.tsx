import { RiAddCircleFill } from "react-icons/ri";

interface ButtonProp {
  text: string;
  onPress: () => void;
}

const ProfileEditButton: React.FC<ButtonProp> = ({ text, onPress }) => {
  return (
    <button
      className="absolute bottom-0 right-0 flex items-center bg-[#17275B] text-white p-3 mr-10 mb-10 rounded-[15px] gap-2"
      onClick={onPress}
    >
      <RiAddCircleFill className="text-2xl" />
      <p>{text}</p>
    </button>
  );
};

export default ProfileEditButton;
