import { useRef, useEffect } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// rotations pour mettre chaque face sur le dessus (
const faceRotations = {
  1: [0, 0, Math.PI / 2],
  2: [0, 0, -Math.PI / 2],     
  3: [0, 0, 0],
  4: [Math.PI, 0, 0],          
  5: [-Math.PI / 2, 0, 0],
  6: [Math.PI / 2, 0, 0],
};

function DiceMesh({ value }) {
  const mesh = useRef();
  const target = useRef(new THREE.Euler(...faceRotations[value]));

  // ordre Three.js : +X, -X, +Y, -Y, +Z, -Z
const textures = useLoader(THREE.TextureLoader, [
  '/textures/dice1.png',
  '/textures/dice2.png',
  '/textures/dice3.png',
  '/textures/dice4.png',
  '/textures/dice5.png',
  '/textures/dice6.png',
]);

  const materials = textures.map(
    (tex) => new THREE.MeshStandardMaterial({ map: tex })
  );

  useEffect(() => {
    target.current = new THREE.Euler(...faceRotations[value]);
  }, [value]);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x += (target.current.x - mesh.current.rotation.x) * 0.1;
    mesh.current.rotation.y += (target.current.y - mesh.current.rotation.y) * 0.1;
    mesh.current.rotation.z += (target.current.z - mesh.current.rotation.z) * 0.1;
  });

  return (
    <mesh ref={mesh} material={materials}>
      <boxGeometry args={[2, 2, 2]} />
    </mesh>
  );
}

export default function Dice({ value }) {
  return (
    <Canvas camera={{ position: [2, 3.5, 4], fov: 50 }} style={{ width: '300px', height: '300px' }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <DiceMesh value={value} />
    </Canvas>
  );
}