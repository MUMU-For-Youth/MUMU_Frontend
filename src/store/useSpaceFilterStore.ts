import { District, SpaceFacility, SpaceTarget } from "@/types/filters";
import { create } from "zustand";

interface SpaceFilterStore {
  district: District | null;
  target: SpaceTarget | null;
  facility: SpaceFacility | null;
  setDistrict: (district: District) => void;
  setTarget: (target: SpaceTarget) => void;
  setFacility: (facility: SpaceFacility) => void;
  resetFilters: () => void;
}

export const useSpaceFilterStore = create<SpaceFilterStore>((set) => ({
  district: null,
  target: null,
  facility: null,
  setDistrict: (district) => set({ district }),
  setTarget: (target) => set({ target }),
  setFacility: (facility) => set({ facility }),
  resetFilters: () => set({ district: null, target: null, facility: null }),
}));
