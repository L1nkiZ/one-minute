import {
  OrbitControls,
  Sphere,
  useTexture,
  useVideoTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Earth({ isShutdown }) {
  const meshRef = useRef();

  const earthVideoTexture = useVideoTexture("/earth_daylight.mp4", {
    loop: true,
    muted: true,
    start: true,
    crossOrigin: "Anonymous",
  });

  const earthNightTexture = useTexture("/earth_night.jpg");

  // Rotation speed variable - delta * 0.1 controls the rotation speed
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      if (isShutdown) {
        material.color.setHex(0xffffff);
        material.emissive.setHex(0x222222);
      } else {
        material.color.setHex(0xffffff);
        material.emissive.setHex(0x000000);
      }
    }
  }, [isShutdown]);

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={isShutdown ? earthNightTexture : earthVideoTexture}
        transparent={true}
        opacity={1}
        roughness={0.7}
        metalness={0.1}
      />
    </Sphere>
  );
}

function Planet3D({ isShutdown }) {
  return (
    <div className="planet-container">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
        <ambientLight intensity={isShutdown ? 0.5 : 0.8} />
        <pointLight
          position={[10, 10, 10]}
          intensity={isShutdown ? 0.8 : 1.5}
        />
        <Earth isShutdown={isShutdown} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={!isShutdown}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}

export default Planet3D;
