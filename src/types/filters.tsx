// 지역구
export const DISTRICT_OPTIONS = [
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "관악구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
] as const;
export type District = (typeof DISTRICT_OPTIONS)[number];

// 교육 카테고리
export const EDU_CATEGORY_OPTIONS = [
  "취업",
  "미술",
  "공예/취미",
  "자연/과학",
  "도시농업",
  "교양/어학",
  "역사",
  "청년정보",
  "기타",
] as const;
export type EduCategory = (typeof EDU_CATEGORY_OPTIONS)[number];

// 모집 상태
export const EDU_STATUS_OPTIONS = ["모집 전", "모집 중", "모집종료"] as const;
export type EduStatus = (typeof EDU_STATUS_OPTIONS)[number];

// 공간 대상자
export const SPACE_TARGET_OPTIONS = [
  "전체",
  "서울시민",
  "10대",
  "20대",
  "30대",
  "40대",
  "여성",
  "특이조건",
] as const;
export type SpaceTarget = (typeof SPACE_TARGET_OPTIONS)[number];

// 공간 시설유형
export const SPACE_FACILITY_OPTIONS = [
  "민원 등 기타",
  "청년공간",
  "주민공유공간",
  "다목적실",
  "공연장",
  "회의실",
  "강의실",
  "강당",
  "캠핑장",
  "녹화장소",
] as const;
export type SpaceFacility = (typeof SPACE_FACILITY_OPTIONS)[number];

export type EduFilterType = "district" | "category" | "status";
export type SpaceFilterType = "district" | "target" | "facility";
