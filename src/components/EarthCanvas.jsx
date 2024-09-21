import Earth from './Earth';
import { Canvas } from '@react-three/fiber';
import {useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei';


const EarthCanvas = () => {
  const [cameraPosition, setCameraPosition] = useState([6, 3,5])

  useEffect(()=> {
     const media = window.matchMedia('(min-width: 600px) and (max-width: 768px)');
     const media2 = window.matchMedia('(min-width: 300px) and (max-width: 600px)');
       if(media.matches) {
        setCameraPosition([0, 3,5]);
       } else if(media2.matches) {
        setCameraPosition([0, 3,5]);
       }
     
  },[]);


  return (
    <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 20 }}
       >
        <OrbitControls enableZoom={false}  
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
         />
        <ambientLight />
        <Earth/>
    </Canvas>
  );
};

export default EarthCanvas;