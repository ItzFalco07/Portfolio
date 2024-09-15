import React from 'react';
import { useGLTF } from '@react-three/drei';
import {useState, useEffect} from 'react'

const DesktopPC = ({dataFunction}) => {
  const [Loading, setLoading] = useState(true);
  const { scene } = useGLTF('../../desktop_pc/scene.gltf');
    
  useEffect(()=> {
    if(scene) {
      handleLoaded()
    }
  }, [scene])

  function handleLoaded() {
    dataFunction(false)
  }

  return (
    <>
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <spotLight
        position={[0,-4, -2]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={10} position={[0,3,0]} />
      <primitive object={scene}  position={[0, -2, -2]} rotation={[-0.01, -0.2, -0.2]} />
    </mesh>
    </>
  );
};

export default DesktopPC;