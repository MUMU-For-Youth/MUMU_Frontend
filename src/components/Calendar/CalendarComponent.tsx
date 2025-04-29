import React, { useState } from "react";
import styled, { css } from "styled-components";
import ArrowLeftIcon from "../../assets/icons/ArrowLeft.svg";
import ArrowRightIcon from "../../assets/icons/ArrowRight.svg";
import CalendarIconSvg from "../../assets/icons/CalendarIcon.svg";

const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

const CalendarComponent: React.FC = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const startDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  // Build calendar grid
  const calendarDays: {
    day: number | null;
    isPrev: boolean;
    isNext: boolean;
  }[] = [];
  // Previous month's days
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = startDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      isPrev: true,
      isNext: false,
    });
  }
  // Current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isPrev: false,
      isNext: false,
    });
  }
  // Next month's leading days to fill the grid
  let nextDay = 1;
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push({
      day: nextDay++,
      isPrev: false,
      isNext: true,
    });
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateClick = (
    day: number | null,
    isPrev: boolean,
    isNext: boolean
  ) => {
    if (!day) return;
    if (isPrev) {
      let prevMonth = currentMonth - 1;
      let prevYear = currentYear;
      if (prevMonth < 0) {
        prevMonth = 11;
        prevYear -= 1;
      }
      setCurrentYear(prevYear);
      setCurrentMonth(prevMonth);
      setSelectedDate(new Date(prevYear, prevMonth, day));
    } else if (isNext) {
      let nextMonth = currentMonth + 1;
      let nextYear = currentYear;
      if (nextMonth > 11) {
        nextMonth = 0;
        nextYear += 1;
      }
      setCurrentYear(nextYear);
      setCurrentMonth(nextMonth);
      setSelectedDate(new Date(nextYear, nextMonth, day));
    } else {
      setSelectedDate(new Date(currentYear, currentMonth, day));
    }
  };

  // For range highlight (example: 22~28)
  // For demo, let's highlight 22~28 of current month
  const rangeStart = 22;
  const rangeEnd = 28;

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <CalendarIcon>
          <img
            src={CalendarIconSvg}
            alt="캘린더 아이콘"
            width={22}
            height={22}
          />
        </CalendarIcon>
        <CalendarTitle>
          {currentYear}년 {currentMonth + 1}월
        </CalendarTitle>
        <CalendarNavButton onClick={handlePrevMonth}>
          <img src={ArrowLeftIcon} alt="이전 달" width={22} height={22} />
        </CalendarNavButton>
        <CalendarNavButton onClick={handleNextMonth}>
          <img src={ArrowRightIcon} alt="다음 달" width={22} height={22} />
        </CalendarNavButton>
      </CalendarHeader>
      <WeekDaysRow>
        {weekDays.map((day, idx) => (
          <WeekDay key={idx}>{day}</WeekDay>
        ))}
      </WeekDaysRow>
      <DaysGrid>
        {calendarDays.map(({ day, isPrev, isNext }, idx) => {
          const isToday =
            !isPrev &&
            !isNext &&
            day &&
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === day;
          const isSelected =
            !isPrev &&
            !isNext &&
            day &&
            selectedDate &&
            selectedDate.getFullYear() === currentYear &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getDate() === day;

          // Range highlight
          const inRange =
            !isPrev && !isNext && day && day >= rangeStart && day <= rangeEnd;

          // Range start/end
          const isRangeStart = !isPrev && !isNext && day === rangeStart;
          const isRangeEnd = !isPrev && !isNext && day === rangeEnd;

          return (
            <DayCellWrapper
              key={idx}
              // Remove range highlight background (흰색 동그라미 지우기)
              $inRange={false}
              $isRangeStart={false}
              $isRangeEnd={false}
            >
              <DayCell
                isToday={!!isToday}
                isSelected={!!isSelected}
                isPrev={isPrev}
                isNext={isNext}
                onClick={() => handleDateClick(day, isPrev, isNext)}
                disabled={day === null}
              >
                {day ? <span>{day}</span> : ""}
              </DayCell>
            </DayCellWrapper>
          );
        })}
      </DaysGrid>
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.div`
  background: #e9effa;
  border-radius: 16px;
  padding: 24px 18px 18px 18px;
  width: 100%;
  max-width: 370px;
  margin: 0 auto 18px auto;
  box-sizing: border-box;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const CalendarIcon = styled.div`
  margin-right: 6px;
  display: flex;
  align-items: center;
`;

const CalendarTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #222;
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const CalendarNavButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #222;
  display: flex;
  align-items: center;
  margin-left: 2px;
`;

const WeekDaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  flex: 1;
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #7b97e6;
  letter-spacing: 0.02em;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0px;
`;

interface DayCellProps {
  isToday: boolean;
  isSelected: boolean;
  isPrev?: boolean;
  isNext?: boolean;
}

interface DayCellWrapperProps {
  $inRange: boolean;
  $isRangeStart: boolean;
  $isRangeEnd: boolean;
}

// Remove range highlight background (흰색 동그라미 지우기)
const DayCellWrapper = styled.div.attrs<DayCellWrapperProps>(
  () => ({})
)<DayCellWrapperProps>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DayCell = styled.button<DayCellProps>`
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  border-radius: 50%;
  font-size: 15px;
  color: ${({ isPrev, isNext }) => (isPrev || isNext ? "#c2cbe5" : "#222")};
  cursor: ${({ isPrev, isNext }) => (isPrev || isNext ? "pointer" : "pointer")};
  position: relative;
  z-index: 1;
  transition: background 0.2s, color 0.2s;

  ${({ isToday, isSelected }) =>
    isToday &&
    !isSelected &&
    css`
      background: #6d8cff;
      color: #fff;
      font-weight: 700;
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: #6d8cff;
      color: #fff;
      font-weight: 700;
    `}
  &:disabled {
    color: #ccc;
    cursor: default;
    background: none;
    border: none;
  }
`;

export default CalendarComponent;
