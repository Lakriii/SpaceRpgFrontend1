import { create } from "zustand";
import { mockSpace } from "@/data/mockSpace";

interface GalaxyState {
  starSystems: any[];
  stars: any[];
  planets: any[];
  moons: any[];
  asteroids: any[];
  spaceStations: any[];
  nebulas: any[];
  unknownObjects: any[];
  selectedObject: any | null;
  hoveredObject: any | null;
  zoomLevel: number;
  center: { x: number; y: number };
  setZoomLevel: (zoom: number) => void;
  resetZoom: () => void;
  setCenter: (coords: { x: number; y: number }) => void;
  selectObject: (object: any) => void;
  setHoveredObject: (object: any | null) => void;
}

export const useGalaxyStore = create<GalaxyState>((set) => ({
  starSystems: mockSpace.starSystems,
  stars: mockSpace.stars,
  planets: mockSpace.planets,
  moons: mockSpace.moons,
  asteroids: mockSpace.asteroids,
  spaceStations: mockSpace.spaceStations,
  nebulas: mockSpace.nebulas,
  unknownObjects: mockSpace.unknownObjects,
  selectedObject: null,
  hoveredObject: null,
  zoomLevel: 1,
  center: { x: 0, y: 0 },

  setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
  resetZoom: () => set({ zoomLevel: 1, center: { x: 0, y: 0 } }), 
  setCenter: (coords) => set({ center: coords }),
  selectObject: (object) => set((state) => ({
    selectedObject: object,
    center: { x: object.coordinates_x, y: object.coordinates_y }, 
  })),
  setHoveredObject: (object) => set({ hoveredObject: object }),
}));