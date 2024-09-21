import EarthCanvas from './EarthCanvas'
import emailjs from '@emailjs/browser';
import {useRef} from 'react';

const Contact = () => {
  const form = useRef();
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
        publicKey: PUBLIC_KEY,
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <>
    <div id="contact" className="w-full relative min-h-screen text-white bg-[#050816] flex">
       <div id="form" className="form bg-[#090325] py-[3em] my-auto px-[3em] w-[fit-content]">
	       	<h3 className="text-zinc-400">GET IN TOUCH</h3>
	       	<h1 className="font-black text-6xl" >Contact.</h1>
	       	<form className="gap-[2em] mt-[2em]" ref={form} action="">
		       	<div>
			       	<label htmlFor="name" className="w-full text-[1.1em]">Enter Name:</label>
			       	<input name="user_name" id="name" className="w-full bg-[#151030]  text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="Whats your name?" type="text"/>
		       	</div>
		       			       	
		       	<div className="mt-[2em]">
			       	<label htmlFor="name" className="w-full text-[1.1em]">Enter Email:</label>
			       	<input name="user_email" id="name" className="w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="Whats your Email?" type="text"/>
		       	</div>	

		       	<div className="mt-[2em]">
			       	<label htmlFor="name" className="w-full text-[1.1em]">Your Message:</label>
			       	<textarea name="message" id="name" className="h-[10em] w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2" placeholder="What do you want to say?" type="text"/>
		       	</div>

		       	<button type="submit" className="bg-[#925eff] hover:bg-[#543497] w-full px-[1em] py-[0.7em] font-semibold rounded-[10px] mt-[2em]">
		       		<h1>Send</h1>
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