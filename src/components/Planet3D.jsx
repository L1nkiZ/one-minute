import { OrbitControls, Sphere, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

function Earth({ isShutdown }) {
  const meshRef = useRef();

  const earthTexture = useTexture(
    "data:image/svg+xml;base64," +
      btoa(`
    <svg width="512" height="256" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="earth" cx="0.3" cy="0.3">
          <stop offset="0%" stop-color="#4a90e2"/>
          <stop offset="70%" stop-color="#2e7d4a"/>
          <stop offset="100%" stop-color="#1a4a2e"/>
        </radialGradient>
      </defs>
      <rect width="512" height="256" fill="url(#earth)"/>
      <!-- Simple continent shapes -->
      <path d="M100,80 Q150,60 200,80 Q250,70 300,90 Q350,85 400,95 L400,150 Q350,140 300,145 Q250,150 200,140 Q150,135 100,140 Z" fill="#2e7d4a"/>
      <path d="M50,120 Q100,110 150,125 Q200,120 250,130 L250,180 Q200,175 150,185 Q100,180 50,175 Z" fill="#2e7d4a"/>
      <circle cx="80" cy="200" r="25" fill="#2e7d4a"/>
      <circle cx="350" cy="180" r="30" fill="#2e7d4a"/>
      <!-- City lights as small dots -->
      <circle cx="120" cy="100" r="1" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="180" cy="95" r="1" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="250" cy="105" r="1" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="320" cy="110" r="1" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="150" cy="140" r="1" fill="#ffeb3b" opacity="0.8"/>
      <circle cx="220" cy="145" r="1" fill="#ffeb3b" opacity="0.8"/>
    </svg>
  `)
  );

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material;
      if (isShutdown) {
        material.color.setHex(0x333333);
        material.emissive.setHex(0x111111);
      } else {
        material.color.setHex(0xffffff);
        material.emissive.setHex(0x000000);
      }
    }
  }, [isShutdown]);

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        map={earthTexture}
        transparent={true}
        opacity={isShutdown ? 0.4 : 1}
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
        <ambientLight intensity={isShutdown ? 0.1 : 0.4} />
        <pointLight position={[10, 10, 10]} intensity={isShutdown ? 0.2 : 1} />
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
