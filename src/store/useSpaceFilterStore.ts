import { District, SpaceFacility, SpaceTarget } from "@/types/filters";
import { create } from "zustand";

interface SpaceFilterStore {
  district: District[];
  target: SpaceTarget[];
  facility: SpaceFacility[];
  setDistrict: (district: District[]) => void;
  setTarget: (target: SpaceTarget[]) => void;
  setFacility: (facility: SpaceFacility[]) => void;
  resetFilters: () => void;
}

export const useSpaceFilterStore = create<SpaceFilterStore>((set) => ({
  district: [],
  target: [],
  facility: [],
  setDistrict: (district) => set({ district }),
  setTarget: (target) => set({ target }),
  setFacility: (facility) => set({ facility }),
  resetFilters: () => set({ district: [], target: [], facility: [] }),
}));
