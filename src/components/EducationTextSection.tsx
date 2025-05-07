import { ApiEduResponse } from "../types/responses";
import styled from "styled-components";
import { colors } from "../styles/theme";

// 값이 없을 경우 기본 문구와 스타일 적용
const getDisplayValue = (value?: string) =>
  value && value.trim() !== "" ? value : "미제공";

const isMissing = (value?: string) => !value || value.trim() === "";

function EducationTextSection({ data }: { data: ApiEduResponse }) {
  return (
    <CardTextBox>
      <CardRow>
        <CardLabel>일시</CardLabel>
        <CardTextRight isEmpty={isMissing(data.eduDate)}>
          {getDisplayValue(data.eduDate)}
        </CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>방식</CardLabel>
        <CardTextRight isEmpty={isMissing(data.eduMethod)}>
          {getDisplayValue(data.eduMethod)}
        </CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>주소</CardLabel>
        <CardTextRight isEmpty={isMissing(data.eduAddress)}>
          {getDisplayValue(data.eduAddress)}
        </CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>일정</CardLabel>
        <CardTextRight isEmpty={isMissing(data.eduSchedule)}>
          {getDisplayValue(data.eduSchedule)}
        </CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>대상</CardLabel>
        <CardTextRight isEmpty={isMissing(data.eduTarget)}>
          {getDisplayValue(data.eduTarget)}
        </CardTextRight>
      </CardRow>
    </CardTextBox>
  );
}

export default EducationTextSection;

// styled-components

const CardTextBox = styled.div`
  font-size: 1.05rem;
  line-height: 1.5;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 600px) {
    padding: 2px;
  }
`;

const CardRow = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 6px;

  @media (max-width: 600px) {
    margin-bottom: 4px;
  }
`;

const CardLabel = styled.div`
  font-weight: bold;
  min-width: 56px;
  color: #b0b0b0;
  font-size: 1.02rem;
  margin-right: 12px;

  @media (max-width: 600px) {
    min-width: 48px;
    font-size: 0.98rem;
    margin-right: 8px;
  }
`;

const CardText = styled.div<{ isEmpty?: boolean }>`
  font-size: 1.02rem;
  flex: 1;
  color: ${({ isEmpty }) => (isEmpty ? colors.gray[400] : "#222")};

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
`;

const CardTextRight = styled(CardText)`
  text-align: right;
`;
