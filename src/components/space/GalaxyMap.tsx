"use client";

import { useState, useEffect, useRef } from "react";
import { useGalaxyStore } from "@/store/useGalaxyStore";
import GalaxyObjects from "./GalaxyObjects";
import GalaxyControls from "./GalaxyControls";
import GalaxyHoverInfo from "./GalaxyHoverInfo";
import GalaxyDetail from "./GalaxyDetail";

export default function GalaxyMap() {
  const { zoomLevel, setZoomLevel, center, setCenter } = useGalaxyStore();
  const [dragging, setDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Inicializácia - vycentrovanie mapy
  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setCenter({ x: clientWidth / 2, y: clientHeight / 2 });
    }
  }, [setCenter]);

  // Začiatok posúvania mapy
  const startDrag = (e: React.MouseEvent) => {
    setDragging(true);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Posun mapy
  const onDrag = (e: React.MouseEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastMousePosition.x;
    const dy = e.clientY - lastMousePosition.y;
    setCenter((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    setLastMousePosition({ x: e.clientX, y: e.clientY });
  };

  // Koniec posúvania
  const stopDrag = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-black overflow-hidden"
      onMouseMove={onDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {/* Mapa a objekty */}
      <div
        className="relative cursor-grab"
        style={{
          transform: `translate(${center.x}px, ${center.y}px) scale(${zoomLevel})`,
          transition: dragging ? "none" : "transform 0.2s ease-out",
        }}
        onMouseDown={startDrag}
      >
        <GalaxyObjects />
      </div>

      {/* Hover Info Panel */}
      <GalaxyHoverInfo />

      {/* Detail Kliknutého Objektu */}
      <GalaxyDetail />

      {/* Zoom Controls */}
      <GalaxyControls setZoomLevel={setZoomLevel} />

      {/* Reset Zoom Button */}
      <div className="absolute bottom-6 right-6">
        <button
          className="btn-primary"
          onClick={() => {
            setZoomLevel(1);
            setCenter({ x: 0, y: 0 });
          }}
        >
          Reset Zoom
        </button>
      </div>
    </div>
  );
}