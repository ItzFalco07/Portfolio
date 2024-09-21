import React from 'react';

const Loader = ({loaderRef}) => {
document.body.style.overflow = 'hidden';

  return (
    <>
    <div ref={loaderRef} id="loader" className="absolute top-[0]  bg-black z-[1000] w-full h-screen flex flex-col gap-[1em] items-center justify-center">
    	<h2 className="text-white font-black">CodeWithFalco.</h2>
    </div>
    </>
  );
};

export default Loader;