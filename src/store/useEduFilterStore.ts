import { District, EduCategory, EduStatus } from "@/types/filters";
import { create } from "zustand";

interface EduFilterStore {
  district: District | null;
  category: EduCategory | null;
  status: EduStatus | null;
  setDistrict: (district: District) => void;
  setCategory: (category: EduCategory) => void;
  setStatus: (status: EduStatus) => void;
  resetFilters: () => void;
}

export const useEduFilterStore = create<EduFilterStore>((set) => ({
  district: null,
  category: null,
  status: null,
  setDistrict: (district) => set({ district }),
  setCategory: (category) => set({ category }),
  setStatus: (status) => set({ status }),
  resetFilters: () => set({ district: null, category: null, status: null }),
}));
