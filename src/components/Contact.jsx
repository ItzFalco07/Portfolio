import EarthCanvas from './EarthCanvas'
import emailjs from '@emailjs/browser';
import {useRef, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import validator from 'validator';

const Contact = () => {
	const [LoadingButton, setLoadingButton] = useState(false);
  const form = useRef();
  const [Name, setName] = useState(false);
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState(false);
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
  const [Seconds, setSeconds] = useState(0);
  const [IsTimerRunning, setIsTimerRunning] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoadingButton(true);
    if(IsTimerRunning == false) {
    	if(Name && Email != '' && Message ) {
	    	if(validator.isEmail(Email)) {
	    		// send data
		    	emailjs
		      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
		        publicKey: PUBLIC_KEY,
		      })
		      .then(
		        () => {
		          toast.success('Email Sent!');
		          setLoadingButton(false);
		          setLimit();
		        },
		        (error) => {
		          toast.error('FAILED...', error.text);
		        },
		      );

	    	} else {
	    		toast.error('enter a valid email')
	    		setLoadingButton(false);
	    	}
	    } else {
	    	toast.error('enter all details')
	    	setLoadingButton(false);
	    }
    } else {
    	toast(`Please try again in ${60 - Seconds} seconds`);
    	setTimeout(()=> {
    		setLoadingButton(false);
    	}, 400)
    }
  };

  const setLimit = () => {
  	setIsTimerRunning(true);
  }

  // Use useEffect to ensure setLimit runs only once when the component mounts
  useEffect(() => {
  	let timer
  	if(IsTimerRunning) {
    timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
  	}
    
      if (Seconds >= 60) {
        setIsTimerRunning(false);
        setSeconds(0); // Reset timer after 60 seconds
      }
    return () => clearInterval(timer);
  }, [IsTimerRunning, Seconds]); // Empty dependency array ensures it runs once

  console.log(Seconds);
  return (
    <>
    <div id="contact" className="w-full relative min-h-screen text-white bg-[#050816] flex">
       <div id="form" className="form bg-[#090325] py-[3em] my-auto px-[3em] w-[fit-content]">
	       	<h3 className="text-zinc-400">GET IN TOUCH</h3>
	       	<h1 className="font-black text-6xl" >Contact.</h1>
	       	<form className="gap-[2em] mt-[2em]" ref={form} onSubmit={sendEmail} >
		       	<div>
			       	<label htmlFor="name" className="w-full text-[1.1em]">Enter Name:</label>
			       	<input onChange={(e)=> setName(e.target.value)} name="user_name" id="name" className="w-full bg-[#151030]  text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="Whats your name?" type="text"/>
		       	</div>
		       			       	
		       	<div className="mt-[2em]">
			       	<label htmlFor="name" className="w-full text-[1.1em]">Enter Email:</label>
			       	<input onChange={(e)=> setEmail(e.target.value)} name="user_email" id="name" className="w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="Whats your Email?" type="text"/>
		       	</div>	

		       	<div className="mt-[2em]">
			       	<label htmlFor="name" className="w-full text-[1.1em]">Your Message:</label>
			       	<textarea onChange={(e)=> setMessage(e.target.value)} name="message" id="name" className="h-[10em] w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="What do you want to say?" type="text"/>
		       	</div>

		       	<button type="submit" className={`${LoadingButton ? 'bg-zinc-500' : 'bg-[#925eff] hover:bg-[#543497]'} w-full px-[1em] py-[0.7em] font-semibold rounded-[10px] mt-[2em]`}>
		       		{LoadingButton ?  <i className="fa-solid fa-spinner fa-spin-pulse text-zinc-300 fa-2xl"></i> : <h1>Send</h1>}
		       	</button>
	       	</form>
       </div>
       <div className="earth w-[50%] mx-auto h-[100vh]">
       	<EarthCanvas/>
       </div>
    </div>
    </>
  );
};

export default Contact;