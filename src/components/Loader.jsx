import {useEffect} from 'react';

const Loader = ({loaderRef}) => {

  useEffect(()=> {
    document.body.style.overflow = 'hidden';
  }, [])
  return (
    <>
    
    <div ref={loaderRef} id="loader" className="overflow-hidden  absolute top-[0]  bg-[#0D0C18] z-[101] w-full h-screen flex flex-col items-center justify-center">
      <div id="background-glow"></div>
    	<h2 id="loader_text" className="text-white font-semibold text-3xl z-[2]">
        &lt; <span className="text-[#925eff] font-bold glow">CodeWithFalco</span> /&gt;
      </h2>
      <p className="opacity-[0.5] text-white relative left-[-0.6em]">
        Making Coffe into Code.. <i className="absolute fa-solid fa-spinner fa-spin-pulse text-zinc-300 ml-[0.6em]"></i>
      </p>
    </div>
    </>
  );
};

export default Loader;