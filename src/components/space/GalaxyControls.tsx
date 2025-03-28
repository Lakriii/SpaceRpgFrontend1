export default function GalaxyControls({ setZoomLevel }: { setZoomLevel: (zoom: number) => void }) {
    return (
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button className="btn-primary" onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 3))}>
          +
        </button>
        <button className="btn-primary" onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))}>
          -
        </button>
      </div>
    );
  }