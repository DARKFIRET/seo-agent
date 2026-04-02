import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const particleCount = 120;
const maxDistance = 2.0;

const ParticleCore = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { mouse } = useThree();

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel.push(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
      );
    }
    return { positions: pos, velocities: vel };
  }, []);

  const { linePositions, lineColors } = useMemo(() => {
    // max connections
    const lPos = new Float32Array(particleCount * particleCount * 3);
    const lCol = new Float32Array(particleCount * particleCount * 3);
    return { linePositions: lPos, lineColors: lCol };
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current) return;

    const positionsAttr = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      positionsAttr[i * 3] += velocities[i * 3];
      positionsAttr[i * 3 + 1] += velocities[i * 3 + 1];
      positionsAttr[i * 3 + 2] += velocities[i * 3 + 2];

      // Mouse interaction (repulsive)
      const dx = mouse.x * 5 - positionsAttr[i * 3];
      const dy = mouse.y * 5 - positionsAttr[i * 3 + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2.0) {
        positionsAttr[i * 3] -= (dx / dist) * 0.03;
        positionsAttr[i * 3 + 1] -= (dy / dist) * 0.03;
      }

      // Bounds check so they bounce back
      if (positionsAttr[i * 3] < -5 || positionsAttr[i * 3] > 5)
        velocities[i * 3] *= -1;
      if (positionsAttr[i * 3 + 1] < -5 || positionsAttr[i * 3 + 1] > 5)
        velocities[i * 3 + 1] *= -1;
      if (positionsAttr[i * 3 + 2] < -5 || positionsAttr[i * 3 + 2] > 5)
        velocities[i * 3 + 2] *= -1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines (connections)
    let vertexposLine = 0;
    let colorpos = 0;
    let numConnected = 0;

    const color1 = new THREE.Color(0x95C12B); // Primary
    const color2 = new THREE.Color(0x7DA324); // Accent

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positionsAttr[i * 3] - positionsAttr[j * 3];
        const dy = positionsAttr[i * 3 + 1] - positionsAttr[j * 3 + 1];
        const dz = positionsAttr[i * 3 + 2] - positionsAttr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePositions[vertexposLine++] = positionsAttr[i * 3];
          linePositions[vertexposLine++] = positionsAttr[i * 3 + 1];
          linePositions[vertexposLine++] = positionsAttr[i * 3 + 2];

          linePositions[vertexposLine++] = positionsAttr[j * 3];
          linePositions[vertexposLine++] = positionsAttr[j * 3 + 1];
          linePositions[vertexposLine++] = positionsAttr[j * 3 + 2];

          // Mix colors
          const mixedColor = color1.clone().lerp(color2, i / particleCount);
          // Darken fading out by distance
          const alpha = 1.0 - dist / maxDistance;

          lineColors[colorpos++] = mixedColor.r * alpha;
          lineColors[colorpos++] = mixedColor.g * alpha;
          lineColors[colorpos++] = mixedColor.b * alpha;

          lineColors[colorpos++] = mixedColor.r * alpha;
          lineColors[colorpos++] = mixedColor.g * alpha;
          lineColors[colorpos++] = mixedColor.b * alpha;

          numConnected++;
        }
      }
    }

    linesRef.current.geometry.setDrawRange(0, numConnected * 2);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    // Slowly rotate the whole network automatically
    pointsRef.current.rotation.y += 0.0005;
    pointsRef.current.rotation.x += 0.0002;
    linesRef.current.rotation.y += 0.0005;
    linesRef.current.rotation.x += 0.0002;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          color="#A8E063"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
};

export function ParticleNetwork() {
  return (
    <div className="w-full h-full relative group">
      {/* Background glow to make it pop inside its container */}
      <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        className="w-full h-full cursor-crosshair"
      >
        <ambientLight intensity={0.5} />
        <ParticleCore />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
