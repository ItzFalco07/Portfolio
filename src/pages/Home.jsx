import React from 'react';
import DesktopCanvas from '../components/DesktopCanvas';
import Skills from '../components/Skills';
import { useState, useRef } from 'react';
import Logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';

const Home = () => {
  const [Loading, setLoading] = useState(true);
  const [Switch, setSwitch] = useState(false);
  const [ToggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);
  const items = useRef(null);

  const handleMenu = () => {
    if(ToggleMenu) {
      setToggleMenu(false);
      items.current.style.right = '-100%';
    } else {
      setToggleMenu(true);
      items.current.style.right = '0';
    }

    // Fade out current icon
    if (menuRef.current) {
      menuRef.current.style.opacity = 0;
    }

    // After the fade-out animation, switch the icon and fade in the new one
    setTimeout(() => {
      setSwitch(!Switch);
      if (menuRef.current) {
        menuRef.current.style.opacity = 1; // Fade in the new icon
      }
    }, 300); // This should match your CSS transition duration
  };

  return (
    <>
      <div id="hero" className="w-full h-screen text-white relative z-[10]">
        <div className="item-container absolute w-[70%] h-screen bg-[#0d102b] z-[20] right-[-100%] flex flex-col items-center justify-center gap-[1em] text-xl" ref={items}>
          <a href="">Skills</a>
          <a href="">Projects</a>
          <a href="">Hire Me</a>
        </div>
        <div className="w-full h-[50vh] nav">
          <nav className="w-full h-[70px] px-[14em] flex justify-between items-center">
            <img src={Logo} className="logo w-[15em]" alt="Logo"></img>
            <div className="links-con flex items-center">
              <div className="links text mx-[2em] h-full gap-[2em] z-[21] w-[34%] flex justify-between items-center">
                <Link className="Link relative font-medium tracking-widest hover:text-[#925eff]">Skills</Link>
                <Link className="Link relative font-medium tracking-widest hover:text-[#925eff]">Projects</Link>
              </div>
              <button className="z-[21] btn font-medium ml-[2em] w-[8em] rounded-[6px] px-[20px] py-[8px] break-keep font-bold">Hire Me</button>
            </div>
            <img
              src={Switch ? close : menu}
              onClick={handleMenu}
              ref={menuRef}
              className="menu-icon hidden z-[26]"
              alt="menu toggle"
            />
          </nav>
          <div className="text-stuff w-full h-full px-[18em] pt-[3em] flex">
            <div className="w-[50px] h-full flex flex-col items-center">
              <div className="ball rounded-full w-[20px] h-[20px] bg-[#925eff]"></div>
              <div className="stripe h-[60%] w-[4px]"></div>
            </div>
            <div className="text">
              <h1 className="heroH">Hi, I'm <span id="special">Falco</span></h1>
              <p className="text-xl font-medium para">
                Fullstack Web Developer <br /> and Designer
              </p>
            </div>
          </div>
        </div>

        <div id="hi" className="absolute bottom-[-3em] w-full h-[60vh] z-[10]">
          <DesktopCanvas setLoading={setLoading} />
        </div>
      </div>
      <Skills />
    </>
  );
};

export default Home;
