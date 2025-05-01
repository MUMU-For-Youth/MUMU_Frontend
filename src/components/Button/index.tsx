import GotoDetailButton from "./GotoDetailButton";
import GotoApplyButton from "./GotoApplyButton";

// 타입 정의
type ActionButtonType = "learnMore" | "apply" | "reserve";

interface ActionButtonProps {
  type: ActionButtonType;
  url?: string; // apply/reserve 버튼용
}

const ActionButton: React.FC<ActionButtonProps> = ({ type, url }) => {
  if (type === "learnMore") return <GotoDetailButton />;
  return <GotoApplyButton type={type} url={url} />;
};

export default ActionButton;
