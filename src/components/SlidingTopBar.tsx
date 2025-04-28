import React, { useState } from "react";
import styled, { css } from "styled-components";

// 탭 정보 배열
const TABS = [
  { key: "Education", label: "북마크한 무료 교육" },
  { key: "Space", label: "북마크한 무료 장소" },
];

interface SlidingTopBarProps {
  onTabChange?: (tabKey: string) => void; // 탭 변경 시 호출되는 콜백 함수 (선택적)
  initialTab?: string; // 초기 선택 탭 key (선택적)
}

// 상단 슬라이딩 탭 바 컴포넌트
const SlidingTopBar: React.FC<SlidingTopBarProps> = ({
  onTabChange,
  initialTab = TABS[0].key, // 초기 탭이 지정되지 않으면 첫 번째 탭으로 설정
}) => {
  // 현재 선택된 탭 상태
  const [selectedTab, setSelectedTab] = useState(initialTab);

  // 탭 클릭 시 처리 함수
  const handleTabClick = (key: string) => {
    setSelectedTab(key); // 선택된 탭 상태 변경
    if (onTabChange) onTabChange(key); // 콜백 함수가 있으면 호출
  };

  return (
    <BarContainer>
      <TabWrapper>
        {/* 탭 배열을 순회하며 버튼 렌더링 */}
        {TABS.map((tab) => (
          <TabButton
            key={tab.key}
            active={selectedTab === tab.key}
            onClick={() => handleTabClick(tab.key)}
          >
            {tab.label}
            {/* 현재 선택된 탭에만 하단 바 표시 */}
            {selectedTab === tab.key && <ActiveBar />}
          </TabButton>
        ))}
      </TabWrapper>
    </BarContainer>
  );
};

// 상단 바 전체 컨테이너 스타일
const BarContainer = styled.div`
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
  background: #fff;
  border-bottom: 1.5px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: -20;
  left: 0;
  margin: 0;
  padding: 0;
`;

// 탭 버튼들을 감싸는 래퍼 스타일
const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100vw;
  min-width: 100vw;
  max-width: 100vw;
`;

// 개별 탭 버튼 스타일
const TabButton = styled.button<{ active: boolean }>`
  flex: 1 1 0;
  min-width: 200px;
  height: 60px;
  font-size: 1.08rem;
  font-weight: 600;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ active }) => (active ? "#5B7CFA" : "#222")};
  position: relative;
  cursor: pointer;
  transition: color 0.2s;
  margin: 0 2px;

  // 활성화된 탭에만 적용되는 스타일
  ${({ active }) =>
    active &&
    css`
      background: #f0f4ff;
      box-shadow: 0 2px 8px 0 rgba(91, 124, 250, 0.08);
    `}

  // 마우스 오버 시 배경색 변경
  &:hover {
    background: #f5f7fd;
  }

  // 모바일 환경에서의 스타일 조정
  @media (max-width: 600px) {
    min-width: 120px;
    font-size: 0.98rem;
    height: 40px;
  }
`;

// 활성화된 탭 하단의 바 스타일
const ActiveBar = styled.div`
  position: absolute;
  left: 5%;
  right: 5%;
  bottom: 0;
  height: 4px;
  border-radius: 2px 2px 0 0;
  background: #5b7cfa;
  transition: all 0.2s;
`;

export default SlidingTopBar;
