import { BaseButton } from "../../styles/common";

type ApplyButtonType = "apply" | "reserve";

interface GotoApplyButtonProps {
  type: ApplyButtonType;
  url?: string;
}

const buttonTextMap: Record<ApplyButtonType, string> = {
  apply: "신청하기",
  reserve: "예약하기",
};

const GotoApplyButton: React.FC<GotoApplyButtonProps> = ({ type, url }) => {
  const handleClick = () => {
    if (url) window.open(url, "_blank");
  };

  return <BaseButton onClick={handleClick}>{buttonTextMap[type]}</BaseButton>;
};

export default GotoApplyButton;
