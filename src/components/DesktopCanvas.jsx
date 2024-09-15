import DesktopPC from '../components/DesktopPC';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const DesktopCanvas = ({setLoading}) => {

  function getChildData(data) {
      if(data == false ) {
        setLoading(false)
      } else {
        console.log('Loading')
      }
  }

  return (
    <Canvas
        frameloop='demand'
        shadows
        dpr={[1, 2]}
        camera={{ position: [20, 3, 5], fov: 20 }}
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