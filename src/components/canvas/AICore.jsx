import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

// color prop'unu içeriye alıyoruz (App.js'den gelen themeColor)
const AICore = ({ color = "#00f2ff" }) => {
  const sphereRef = useRef();

  useFrame((state) => {
    if (sphereRef.current) {
      const t = state.clock.getElapsedTime();
      sphereRef.current.rotation.x = t * 0.2;
      sphereRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={1.5}>
        <MeshDistortMaterial
          color={color} // Temel renk
          emissive={color} // Parlama rengi (Bloom için kritik)
          emissiveIntensity={2} // Parlama şiddeti
          distort={0.4} // Bozulma miktarı
          speed={2} // Dalgalanma hızı
          roughness={0} // Pürüzsüzlük (daha yansıtıcı durur)
          metalness={1} // Metalik görünüm
        />
      </Sphere>
    </Float>
  );
};

export default AICore;
