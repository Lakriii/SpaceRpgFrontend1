import { useGalaxyStore } from "@/store/useGalaxyStore";

export default function GalaxyObjects() {
  const {
    starSystems,
    stars,
    planets,
    moons,
    asteroids,
    spaceStations,
    nebulas,
    unknownObjects,
    selectObject,
    setHoveredObject,
  } = useGalaxyStore();

  const allObjects = [
    ...starSystems.map((s) => ({ ...s, type: "starSystem" })),
    ...stars.map((s) => ({ ...s, type: "star" })),
    ...planets.map((p) => ({ ...p, type: "planet" })),
    ...moons.map((m) => ({ ...m, type: "moon" })),
    ...asteroids.map((a) => ({ ...a, type: "asteroid" })),
    ...spaceStations.map((s) => ({ ...s, type: "spaceStation" })),
    ...nebulas.map((n) => ({ ...n, type: "nebula" })),
    ...unknownObjects.map((u) => ({ ...u, type: "unknownObject" })),
  ];

  return (
    <>
      {allObjects.map((obj) => (
        <div
          key={`${obj.type}-${obj.id}`}
          className="absolute rounded-full bg-blue-500 hover:bg-white transition-all cursor-pointer"
          style={{
            top: `${obj.coordinates_y}px`,
            left: `${obj.coordinates_x}px`,
            width: `10px`,
            height: `10px`,
          }}
          onClick={() => selectObject(obj)} 
          onMouseEnter={() => setHoveredObject(obj)}
          onMouseLeave={() => setHoveredObject(null)}
        />
      ))}
    </>
  );
}