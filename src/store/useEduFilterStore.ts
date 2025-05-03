import { District, EduCategory, EduStatus } from "../types/filters";
import { create } from "zustand";

// 전체 수정:
interface EduFilterStore {
  district: District[];
  category: EduCategory[];
  status: EduStatus[];
  setDistrict: (district: District[]) => void;
  setCategory: (category: EduCategory[]) => void;
  setStatus: (status: EduStatus[]) => void;
  resetFilters: () => void;
}

export const useEduFilterStore = create<EduFilterStore>((set) => ({
  district: [],
  category: [],
  status: [],
  setDistrict: (district) => set({ district }),
  setCategory: (category) => set({ category }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ district: [], category: [], status: [] }),
}));
