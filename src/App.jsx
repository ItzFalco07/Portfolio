import {BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import { ReactLenis, useLenis } from 'lenis/react'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

    const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })


  return (
    <ReactLenis root>
     <Router>
       <Routes>
         <Route path="/" element ={<Home/>} />
       </Routes>
       <ToastContainer theme="dark"/>
     </Router>
    </ReactLenis>
  )
}

export default App;
