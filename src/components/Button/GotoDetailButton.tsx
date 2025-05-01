import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../styles/common";

interface GotoDetailButtonProps {
  id: string;
}

const GotoDetailButton: React.FC = () => {
  const navigate = useNavigate();

  return <BaseButton onClick={() => navigate("/")}>자세히보기</BaseButton>;
};

export default GotoDetailButton;
