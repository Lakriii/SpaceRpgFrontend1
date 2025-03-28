"use client";

export default function Navigation({ system }: { system: any }) {
  return (
    <div className="mt-4">
      <h3 className="text-xl font-bold text-white">Navigation</h3>
      <p className="text-gray-300">Do you want to travel to {system.name}?</p>

      <button className="btn-primary mt-4">Start Travel</button>
    </div>
  );
}