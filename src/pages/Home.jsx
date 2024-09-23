import { useEffect, useState, useRef } from 'react';
import Logo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import menu from '../assets/menu.svg';
import close from '../assets/close.svg';
import DesktopCanvas from '../components/DesktopCanvas';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Home = () => {
  const [Loading, setLoading] = useState(true);
  const [Switch, setSwitch] = useState(false);
  const [ToggleMenu, setToggleMenu] = useState(false);
  const menuRef = useRef(null);
  const items = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const loaderRef = useRef(null);

  const handleMenu = () => {
    if(ToggleMenu) {
      setToggleMenu(false);
      items.current.style.right = '-100%';
      document.body.style.overflow = 'auto';
    } else {
      setToggleMenu(true);
      items.current.style.right = '0';
      document.body.style.overflow = 'hidden';
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
  const scrollToSkills = () => {
    console.log("Scrolling to Skills...");
    setSwitch(false);
    setToggleMenu(false)
    items.current.style.right = '-100%';
    document.body.style.overflow = 'auto';
    skillsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToProjects = () => {
    console.log("Scrolling to Projects...");
    setSwitch(false);
    setToggleMenu(false)
    items.current.style.right = '-100%';
    document.body.style.overflow = 'auto';
    projectsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(()=> {
    console.log(Loading)
    if(loaderRef.current) {
      if(!Loading) {
        loaderRef.current.style.top = '-100vh'
        document.body.style.overflow = 'auto'
      }
    }
  }, [Loading])

  return (
    <>
      <Loader loaderRef={loaderRef} />
      <div id="hero" className="overflow-x-hidden w-full h-screen text-white relative z-[10]">
        <div className="item-container absolute w-[70%] h-screen bg-[#0d102b] z-[20] right-[-100%] flex flex-col items-center justify-center gap-[1em] text-xl" ref={items}>
          <a onClick={scrollToSkills} className="cursor-pointer">Skills</a>
          <a onClick={scrollToProjects} className="cursor-pointer">Projects</a>
          <a href="https://www.upwork.com/freelancers/~0184cf5697571fafe6">Hire Me</a>
        </div>
        <div className="w-full h-[50vh] nav">
          <nav className="w-full h-[70px] px-[14em] flex justify-between items-center">
            <img src={Logo} className="logo w-[15em]" alt="Logo"></img>
            <div className="links-con flex items-center">
              <div className="links text mx-[2em] h-full gap-[2em] z-[21] w-[34%] flex justify-between items-center">
                <Link onClick={scrollToSkills} className="Link relative font-medium tracking-widest hover:text-[#925eff]">Skills</Link>
                <Link onClick={scrollToProjects} className="Link relative font-medium tracking-widest hover:text-[#925eff]">Projects</Link>
              </div>
              <button href="https://www.upwork.com/freelancers/~0184cf5697571fafe6" className="z-[21] btn font-medium ml-[2em] w-[8em] rounded-[6px] px-[20px] py-[8px] break-keep font-bold">Hire Me</button>
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
              <div className="contacts flex  mt-[2em] gap-[1.2em]" >
                <a href="https://github.com/ItzFalco07" className="social fa-brands fa-github fa-xl"></a>
                <a href="https://www.upwork.com/freelancers/~0184cf5697571fafe6" className="social fa-brands fa-upwork fa-xl"></a>
                <a href="https://t.me/+nygHO4lU-hIyNWRl" className="social fa-solid fa-paper-plane fa-lg"></a>
              </div>
            </div>
          </div>
        </div>

        <div id="hi" className="absolute overflow-hidden bottom-[-3em] w-full h-[60vh] z-[10]">
          <DesktopCanvas setLoading={setLoading} />
        </div>
      </div>
      <Skills skillsRef={skillsRef} />
      <Projects projectsRef={projectsRef} />
      <Contact/>
      <Footer/>
    </>
  );
};

export default Home;
