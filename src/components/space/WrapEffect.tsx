import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function WarpEffect({ active }: { active: boolean }) {
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    if (active) {
      setOpacity((prev) => Math.min(prev + 0.02, 1));
    } else {
      setOpacity((prev) => Math.max(prev - 0.02, 0));
    }
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[2, 2]} />
      <meshStandardMaterial color="blue" transparent opacity={opacity} />
    </mesh>
  );
}