export function SceneLights() {
  return (
    <group>
      <spotLight
        position={[0, 5.2, 17]}
        castShadow
        intensity={300}
        angle={35.5}
        penumbra={0.3}
        distance={40}
        target-position={[0, -3.2, -1.8]}
        color="#ffeedd"
      />
      <spotLight
        position={[0, -18.8, 17]}
        castShadow
        intensity={300}
        angle={35.5}
        penumbra={0.3}
        distance={40}
        target-position={[0, -9.2, -1.8]}
        color="#ffeedd"
      />
      <pointLight
        position={[11.3, 1.4, 0.4]}
        castShadow
        intensity={21.4}
        distance={16.2}
        decay={1.2}
        color="#fcd9ab"
      />
      <pointLight
        position={[-11.3, 1.4, 0.4]}
        castShadow
        intensity={21.4}
        distance={16.2}
        decay={1.2}
        color="#fcd9ab"
      />
      <ambientLight intensity={0.3} />
    </group>
  );
}
