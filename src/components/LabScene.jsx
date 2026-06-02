import { Float, Line, Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Component, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

function LabSceneFallback() {
  return (
    <div
      aria-hidden="true"
      className="relative h-full w-full overflow-hidden"
    >
      <div className="neural-grid absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-labCyan/25 bg-labCyan/10 shadow-glow blur" />
      <div className="absolute left-[18%] top-[20%] h-32 w-32 rounded-full border border-labMint/20 bg-labMint/10 blur-3xl" />
      <div className="absolute bottom-[16%] right-[14%] h-40 w-40 rounded-full border border-labRose/20 bg-labRose/10 blur-3xl" />
    </div>
  );
}

class LabSceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) {
      console.warn("LabScene fell back because WebGL could not start.", error);
    }
  }

  render() {
    if (this.state.hasError) {
      return <LabSceneFallback />;
    }

    return this.props.children;
  }
}

function NeuralCore() {
  const groupRef = useRef(null);
  const pointsRef = useRef(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(520 * 3);
    for (let i = 0; i < 520; i += 1) {
      const radius = 1.8 + Math.random() * 3.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, []);

  const routes = useMemo(
    () => [
      [
        [-3.8, -0.9, -0.8],
        [-1.4, 1.1, 0.4],
        [0.8, -0.6, 1.2],
        [3.4, 1.2, -0.2],
      ],
      [
        [-2.6, 2.2, 0.1],
        [-0.8, 0.2, -1.1],
        [1.8, 1.3, 0.7],
        [3.5, -1.4, 0.1],
      ],
      [
        [-3.2, 0.2, 1.3],
        [-1.2, -1.4, -0.4],
        [1.5, -0.1, 0.9],
        [3.1, 0.7, -1.2],
      ],
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.085;
      groupRef.current.rotation.x = Math.sin(t * 0.22) * 0.08;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.z = -t * 0.035;
    }
  });

  return (
    <group ref={groupRef}>
      <Points ref={pointsRef} positions={particles} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#35f3ff"
          size={0.035}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      {routes.map((route, index) => (
        <Line
          key={route.map((point) => point.join(",")).join("-")}
          points={route}
          color={index === 1 ? "#64ffbd" : "#35f3ff"}
          lineWidth={1.25}
          transparent
          opacity={0.35}
        />
      ))}
      <Float speed={1.4} rotationIntensity={0.45} floatIntensity={0.9}>
        <mesh>
          <icosahedronGeometry args={[1.08, 2]} />
          <meshStandardMaterial
            color="#061426"
            emissive="#35f3ff"
            emissiveIntensity={0.34}
            metalness={0.85}
            roughness={0.18}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function LabScene() {
  const [canRenderWebGL, setCanRenderWebGL] = useState(false);

  useEffect(() => {
    setCanRenderWebGL(hasWebGLSupport());
  }, []);

  if (!canRenderWebGL) {
    return <LabSceneFallback />;
  }

  return (
    <LabSceneBoundary>
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 58 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.65} />
        <pointLight position={[4, 4, 4]} color="#35f3ff" intensity={1.9} />
        <pointLight position={[-4, -2, 3]} color="#ff5f8f" intensity={0.9} />
        <NeuralCore />
      </Canvas>
    </LabSceneBoundary>
  );
}
