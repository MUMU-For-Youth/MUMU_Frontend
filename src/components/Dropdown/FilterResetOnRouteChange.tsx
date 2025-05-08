import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useEduFilterStore } from "../../store/useEduFilterStore";
import { useSpaceFilterStore } from "../../store/useSpaceFilterStore";

const FilterResetOnRouteChange = () => {
  const location = useLocation();
  const resetEduFilters = useEduFilterStore((state) => state.resetFilters);
  const resetSpaceFilters = useSpaceFilterStore((state) => state.resetFilters);

  useEffect(() => {
    resetEduFilters();
    resetSpaceFilters();
  }, [location.pathname]);

  return null; // 화면에 렌더링하지 않음
};

export default FilterResetOnRouteChange;
