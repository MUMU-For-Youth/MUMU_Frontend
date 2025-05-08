import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../styles/common";
import GotoMapButtonSvg from "../../assets/icons/MapIcon.svg";
import styled from "styled-components";
import { colors } from "../../styles/theme";

type DetailType = "education" | "space";

interface GotoMapButtonProps {
  spaceId?: string;
  eduId?: number;
  type: DetailType;
}

const GotoMapButton: React.FC<GotoMapButtonProps> = ({
  spaceId,
  eduId,
  type,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === "education" && eduId !== undefined) {
      navigate(`/education-map?eduId=${eduId}`);
    } else if (type === "space" && spaceId) {
      navigate(`/space-map?spaceId=${spaceId}`);
    } else {
      navigate(`/${type}-map`);
    }
  };

  return (
    <MapButton onClick={handleClick}>
      <img src={GotoMapButtonSvg} alt="지도보기" />
    </MapButton>
  );
};

export const MapButton = styled.button`
  background: ${colors.primary};
  color: ${colors.white};
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 500;
  height: 34px;
  min-width: 34px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: scale(0.97);
  }
`;
export default GotoMapButton;
