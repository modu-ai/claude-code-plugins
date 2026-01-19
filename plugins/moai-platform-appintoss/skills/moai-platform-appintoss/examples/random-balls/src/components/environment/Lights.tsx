export function Lights() {
  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        position={[0, -26, 80]}
        target-position={[0, -45, 70]}
        intensity={0.6}
        castShadow
      />
      <directionalLight
        position={[0, 0, 40]}
        target-position={[0, -20, 30]}
        intensity={0.6}
        castShadow
      />
    </>
  );
}
