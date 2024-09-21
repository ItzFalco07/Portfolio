import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

const DesktopPC = ({ dataFunction }) => {
  const { scene } = useGLTF('../../planet/scene.gltf');
  const modelRef = useRef(null); 

  // Rotate the model continuously on each frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust speed if needed
    }
  });

  return (
    <>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight intensity={10} position={[0, 2, 0]} />

      {/* Apply the ref to the GLTF model */}
      <primitive object={scene} ref={modelRef} />

      {/* OrbitControls with damping */}
      {/*<OrbitControls enableDamping={true} dampingFactor={0.1} />*/}
    </>
  );
};

export default DesktopPC;
