import { ApiEduResponse } from "../types/responses";
import styled from "styled-components";

function EducationTextSection({ data }: { data: ApiEduResponse }) {
  return (
    <CardTextBox>
      <CardRow>
        <CardLabel>일시</CardLabel>
        <CardTextRight>{data.eduDate}</CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>방식</CardLabel>
        <CardTextRight>{data.eduMethod}</CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>주소</CardLabel>
        <CardTextRight>{data.eduAddress}</CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>일정</CardLabel>
        <CardTextRight>{data.eduSchedule}</CardTextRight>
      </CardRow>
      <CardRow>
        <CardLabel>대상</CardLabel>
        <CardTextRight>{data.eduTarget}</CardTextRight>
      </CardRow>
    </CardTextBox>
  );
}

// 상세 정보 영역
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

// 상세 정보 한 줄
const CardRow = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 6px;

  @media (max-width: 600px) {
    margin-bottom: 4px;
  }
`;

// 상세 정보 라벨
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

// 상세 정보 텍스트
const CardText = styled.div`
  color: #222;
  font-size: 1.02rem;
  flex: 1;

  @media (max-width: 600px) {
    font-size: 0.98rem;
  }
`;

// 오른쪽 정렬 텍스트
const CardTextRight = styled(CardText)`
  text-align: right;
`;

export default EducationTextSection;
