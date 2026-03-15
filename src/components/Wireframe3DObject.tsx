import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { Edges } from "@react-three/drei";

type SectionMesh =
  | "head"
  | "car"
  | "planet"
  | "shield"
  | "rocket"
  | "book"
  | "satellite";

const accentColor = "#0ea5e9"; // hsl(199, 89%, 48%)

// Human head approximation using sphere + features
const HeadMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      {/* Skull */}
      <mesh>
        <sphereGeometry args={[1.4, 16, 12]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Jaw */}
      <mesh position={[0, -0.9, 0.3]} scale={[0.9, 0.5, 0.7]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Left eye socket */}
      <mesh position={[-0.45, 0.2, 1.1]}>
        <torusGeometry args={[0.22, 0.04, 8, 12]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
      {/* Right eye socket */}
      <mesh position={[0.45, 0.2, 1.1]}>
        <torusGeometry args={[0.22, 0.04, 8, 12]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
      {/* Nose ridge */}
      <mesh position={[0, -0.1, 1.3]} rotation={[0.3, 0, 0]} scale={[0.15, 0.4, 0.15]}>
        <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
    </group>
  );
};

// Futuristic car
const CarMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group} scale={0.8}>
      {/* Body */}
      <mesh position={[0, 0, 0]} scale={[2.2, 0.5, 1]}>
        <boxGeometry args={[1, 1, 1, 3, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Cabin */}
      <mesh position={[0.2, 0.5, 0]} scale={[1.2, 0.5, 0.85]}>
        <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Wheels */}
      {[[-0.7, -0.35, 0.55], [-0.7, -0.35, -0.55], [0.7, -0.35, 0.55], [0.7, -0.35, -0.55]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.06, 8, 12]} />
          <meshBasicMaterial color={accentColor} wireframe />
        </mesh>
      ))}
      {/* Spoiler */}
      <mesh position={[-1.1, 0.45, 0]} scale={[0.1, 0.15, 0.9]}>
        <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
    </group>
  );
};

// Planet with rings
const PlanetMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.1;
    group.current.rotation.x += delta * 0.03;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={5} />
      </mesh>
      {/* Ring */}
      <mesh rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[2, 0.05, 8, 32]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
      {/* Inner ring */}
      <mesh rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[1.7, 0.03, 6, 24]} />
        <meshBasicMaterial color={accentColor} wireframe opacity={0.5} transparent />
      </mesh>
    </group>
  );
};

// Shield / badge
const ShieldMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.15;
  });
  return (
    <group ref={group}>
      <mesh>
        <octahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={5} />
      </mesh>
      <mesh scale={0.7}>
        <octahedronGeometry args={[1.3, 0]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={5} />
      </mesh>
      {/* Orbiting ring */}
      <mesh rotation={[0.5, 0, 0]}>
        <torusGeometry args={[1.8, 0.03, 6, 20]} />
        <meshBasicMaterial color={accentColor} wireframe opacity={0.4} transparent />
      </mesh>
    </group>
  );
};

// Rocket
const RocketMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.18;
  });
  return (
    <group ref={group} rotation={[0.3, 0, 0.2]}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.5, 2.5, 8, 3, true]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 1.6, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Fins */}
      {[0, 2.09, 4.19].map((angle, i) => (
        <mesh key={i} position={[Math.sin(angle) * 0.5, -1, Math.cos(angle) * 0.5]} scale={[0.4, 0.6, 0.08]} rotation={[0, -angle, 0]}>
          <boxGeometry args={[1, 1, 1, 1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges color={accentColor} threshold={15} />
        </mesh>
      ))}
      {/* Exhaust ring */}
      <mesh position={[0, -1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.05, 6, 12]} />
        <meshBasicMaterial color={accentColor} wireframe />
      </mesh>
    </group>
  );
};

// Open book
const BookMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.12;
  });
  return (
    <group ref={group}>
      {/* Left page */}
      <mesh position={[-0.7, 0, 0]} rotation={[0, 0.25, 0]} scale={[1.2, 1.6, 0.05]}>
        <boxGeometry args={[1, 1, 1, 3, 4, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Right page */}
      <mesh position={[0.7, 0, 0]} rotation={[0, -0.25, 0]} scale={[1.2, 1.6, 0.05]}>
        <boxGeometry args={[1, 1, 1, 3, 4, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Spine */}
      <mesh position={[0, 0, 0.15]} scale={[0.08, 1.6, 0.15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Floating knowledge particles */}
      {[[-0.5, 1.2, 0], [0.3, 1.4, -0.2], [0, 1.6, 0.1]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} scale={0.12}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges color={accentColor} threshold={5} />
        </mesh>
      ))}
    </group>
  );
};

// Satellite / communication device
const SatelliteMesh = () => {
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    group.current.rotation.y += delta * 0.15;
    group.current.rotation.z += delta * 0.05;
  });
  return (
    <group ref={group}>
      {/* Dish */}
      <mesh rotation={[0.5, 0, 0]}>
        <sphereGeometry args={[1.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        <Edges color={accentColor} threshold={10} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.2, -0.3]} scale={[0.04, 1.5, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial transparent opacity={0} />
        <Edges color={accentColor} threshold={15} />
      </mesh>
      {/* Solar panels */}
      {[-1, 1].map((side, i) => (
        <mesh key={i} position={[side * 1.6, -0.3, 0]} scale={[0.8, 0.05, 0.5]}>
          <boxGeometry args={[1, 1, 1, 3, 1, 2]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges color={accentColor} threshold={15} />
        </mesh>
      ))}
      {/* Panel arms */}
      {[-1, 1].map((side, i) => (
        <mesh key={`arm-${i}`} position={[side * 0.9, -0.3, 0]} scale={[0.6, 0.03, 0.03]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial transparent opacity={0} />
          <Edges color={accentColor} threshold={15} />
        </mesh>
      ))}
      {/* Signal rings */}
      {[0.5, 0.8, 1.1].map((r, i) => (
        <mesh key={`ring-${i}`} position={[0, 0.9 + i * 0.3, -0.5]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[r * 0.4, 0.015, 6, 16]} />
          <meshBasicMaterial color={accentColor} wireframe opacity={0.3 + i * 0.1} transparent />
        </mesh>
      ))}
    </group>
  );
};

const meshComponents: Record<SectionMesh, React.FC> = {
  head: HeadMesh,
  car: CarMesh,
  planet: PlanetMesh,
  shield: ShieldMesh,
  rocket: RocketMesh,
  book: BookMesh,
  satellite: SatelliteMesh,
};

// Per-section positioning: place 3D objects in empty spaces
const sectionConfig: Record<string, { mesh: SectionMesh; className: string }> = {
  // About: content is left-aligned (max-w-3xl), large empty space on right
  about: {
    mesh: "head",
    className: "absolute right-[2%] top-[8%] w-[40vw] h-[75vh] max-w-[600px]",
  },
  // Projects: 3-col grid fills width, place below-right area
  projects: {
    mesh: "car",
    className: "absolute right-[0%] bottom-[0%] w-[35vw] h-[55vh] max-w-[500px]",
  },
  // Skills: categories left + skills center, far-right is open
  skills: {
    mesh: "planet",
    className: "absolute right-[0%] top-[5%] w-[30vw] h-[70vh] max-w-[450px]",
  },
  // Certifications: 3-col grid, space below on right
  certifications: {
    mesh: "shield",
    className: "absolute right-[0%] bottom-[2%] w-[32vw] h-[55vh] max-w-[480px]",
  },
  // Achievements: timeline is left-aligned with pl-12, right side is wide open
  achievements: {
    mesh: "rocket",
    className: "absolute right-[2%] top-[10%] w-[38vw] h-[70vh] max-w-[550px]",
  },
  // Education: cards stacked left-center, right side open
  education: {
    mesh: "book",
    className: "absolute right-[2%] top-[10%] w-[35vw] h-[65vh] max-w-[500px]",
  },
  // Contact: tabs left + content center, right side open
  contact: {
    mesh: "satellite",
    className: "absolute right-[2%] top-[5%] w-[35vw] h-[70vh] max-w-[520px]",
  },
};

interface Wireframe3DObjectProps {
  sectionId: string;
  direction: number;
}

const Wireframe3DObject = ({ sectionId, direction }: Wireframe3DObjectProps) => {
  const config = sectionConfig[sectionId];
  if (!config) return null;
  const MeshComponent = meshComponents[config.mesh];

  return (
    <motion.div
      className={`${config.className} pointer-events-none z-0`}
      initial={{ opacity: 0, y: direction > 0 ? 200 : -200, scale: 0.6 }}
      animate={{ opacity: 0.25, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: direction > 0 ? -200 : 200, scale: 0.6 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <MeshComponent />
      </Canvas>
    </motion.div>
  );
};

export default Wireframe3DObject;
