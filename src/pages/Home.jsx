import React from 'react';
import DesktopCanvas from '../components/DesktopCanvas';
import Skills from '../components/Skills'
import {useState, useEffect} from 'react';
import Logo from '../assets/Logo.svg';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom'

const Home = () => {
  const [Loading, setLoading] = useState(true);


  return (
    <>
      <div id="hero" className="w-full h-screen text-white relative z-[10] " >
        {/*<div id="loader" className={`absolute w-full h-screen bg-black text-white z-[100] ${Loading ? '' : 'move'} `} >Loader component</div>*/}
        <div className = 'w-full h-[50vh] nav' >
          <nav className = "w-full h-[70px] px-[14em] flex justify-between items-center" >
            <img src={Logo} className = "logo w-[15em]"></img>
            <div className = "flex items-center" >
            <div className = " text mx-[2em] h-full gap-[2em] w-[34%] flex justify-between items-center">
             <Link className = " Link relative font-medium tracking-widest hover:text-[#925eff]">Skills</Link>
             <Link className = " Link  relative font-medium tracking-widest hover:text-[#925eff]">Projects</Link>
            </div>
            <button className = "btn font-medium ml-[2em] w-[8em] rounded-[6px] px-[20px] py-[8px] break-keep font-bold">Hire Me</button>
            </div>
          </nav>
          <div className = "text-stuff w-full h-full px-[18em] pt-[3em] flex">
            <div className = "w-[50px] h-full  flex flex-col items-center " >
              <div className = "rounded-full w-[20px] h-[20px] bg-[#925eff] "></div>
              <div className = "stripe h-[60%] w-[4px] " ></div>
            </div>
            <div className = "text" >
              <h1 className = "heroH " >Hi, I'm <span id='special'>Falco</span></h1>
              <p className = "text-xl font-medium" >Fullstack Web Developer <br/> and Designer</p>
            </div>
          </div>
        </div>



        <div id ="hi" className="absolute bottom-[-3em] w-full h-[60vh] z-[10] " >
          <DesktopCanvas setLoading={setLoading} />
        </div>
      </div>
      <Skills/>
    </>
  );
};

export default Home;