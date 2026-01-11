import { Grid } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const CyberGrid = ({ speed = 1 }) => {
  const gridRef = useRef();

  useFrame((state) => {
    // Zaman akışına göre gridi hareket ettir (Sonsuz yol etkisi)
    gridRef.current.position.z = (state.clock.getElapsedTime() * speed) % 2;
  });

  return (
    <group ref={gridRef}>
      <Grid
        infiniteGrid
        fadeDistance={50}
        sectionColor="#bc13fe"
        cellColor="#00f2ff"
        sectionSize={3}
        cellSize={1}
      />
    </group>
  );
};
export default CyberGrid;
