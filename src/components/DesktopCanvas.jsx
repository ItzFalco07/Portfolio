import DesktopPC from '../components/DesktopPC';
import { Canvas } from '@react-three/fiber';
import {useState, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei';

const DesktopCanvas = ({setLoading}) => {

  const [cameraPosition, setCameraPosition] = useState([20, 3,5])

  function getChildData(data) {
      if(data == false ) {
        setLoading(false)
      } else {
        console.log('loading...')
      }
  }

  useEffect(()=> {
     const media = window.matchMedia('(min-width: 600px) and (max-width: 768px)');
     const media2 = window.matchMedia('(min-width: 300px) and (max-width: 600px)');
       if(media.matches == '(min-width: 600px) and (max-width: 768px)') {
        setCameraPosition([27, 3,5]);
       } else if(media2.matches == '(min-width: 300px) and (max-width: 600px)') {
        setCameraPosition([34, 3,5]);
       }
     
  },[]);

  return (
    <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: 20 }}
       >
        <OrbitControls enableZoom={false}  
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
         />
        <ambientLight />
        <DesktopPC dataFunction={getChildData} />
    </Canvas>
  );
};

export default DesktopCanvas;