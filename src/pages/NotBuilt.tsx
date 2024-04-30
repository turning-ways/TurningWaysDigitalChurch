import OverviewContainer from "./Overview/OverviewContainer";

interface NotBuiltProps {
    active: string;
}

const NotBuilt:React.FC<NotBuiltProps> = ({active}) => {
  return (
    <OverviewContainer active={active}>
      <div className="w-full h-full flex justify-center items-center">
        <p>This page hasn't been built yet, 😅</p>
      </div>
    </OverviewContainer>
  );
};

export default NotBuilt;
