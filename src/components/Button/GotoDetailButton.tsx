import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../styles/common";

type DetailType = "education" | "space";

interface GotoDetailButtonProps {
  spaceId?: string;
  eduId?: number;
  type: DetailType;
}

const GotoDetailButton: React.FC<GotoDetailButtonProps> = ({
  spaceId,
  eduId,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${type}/${spaceId || eduId}`);
  };

  return <BaseButton onClick={handleClick}>자세히보기</BaseButton>;
};

export default GotoDetailButton;
