import {BrowserRouter as Router , Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
   <Router>
     <Routes>
       <Route path="/" element ={<Home/>} />
     </Routes>
     <ToastContainer theme="dark"/>
   </Router>
  )
}

export default App;
