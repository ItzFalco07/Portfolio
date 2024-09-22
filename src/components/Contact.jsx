import { useRef, useEffect, useState } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { toast } from 'react-toastify'
import validator from 'validator'
import EarthCanvas from './EarthCanvas'

const StarBackground = () => {
  const [stars, setStars] = useState([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.1,
        })
      }
      setStars(newStars)
    }

    generateStars()
    window.addEventListener('resize', generateStars)

    return () => window.removeEventListener('resize', generateStars)
  }, [])

  useEffect(() => {
    const animateStars = () => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          y: (star.y + star.speed) % window.innerHeight,
        }))
      )
      requestAnimationFrame(animateStars)
    }

    const animationFrame = requestAnimationFrame(animateStars)
    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <div className="absolute w-full h-full inset-0 pointer-events-none">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.5 + 0.5,
          }}
        />
      ))}
    </div>
  )
}

const Contact = () => {
  const [loadingButton, setLoadingButton] = useState(false)
  const form = useRef()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
  const [seconds, setSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const formRef = useRef(null)
  const earthRef = useRef(null)
  const formInView = useInView(formRef, { once: true })
  const earthInView = useInView(earthRef, { once: true })
  const formControls = useAnimation()
  const earthControls = useAnimation()

  useEffect(() => {
    if (formInView) {
      formControls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } })
    }
    if (earthInView) {
      earthControls.start({ x: 0, opacity: 1, transition: { duration: 0.5 } })
    }
  }, [formInView, earthInView, formControls, earthControls])

  const sendEmail = (e) => {
    e.preventDefault()
    setLoadingButton(true)
    if (!isTimerRunning) {
      if (name && email && message) {
        if (validator.isEmail(email)) {
          emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
              publicKey: PUBLIC_KEY,
            })
            .then(
              () => {
                toast.success('Email Sent!')
                setLoadingButton(false)
                setLimit()
              },
              (error) => {
                toast.error('FAILED...', error.text)
              }
            )
        } else {
          toast.error('Enter a valid email')
          setLoadingButton(false)
        }
      } else {
        toast.error('Enter all details')
        setLoadingButton(false)
      }
    } else {
      toast(`Please try again in ${60 - seconds} seconds`)
      setTimeout(() => {
        setLoadingButton(false)
      }, 400)
    }
  }

  const setLimit = () => {
    setIsTimerRunning(true)
  }

  useEffect(() => {
    let timer
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    if (seconds >= 60) {
      setIsTimerRunning(false)
      setSeconds(0)
    }
    return () => clearInterval(timer)
  }, [isTimerRunning, seconds])

  return (
    <>
      <div id="contact" className="w-full relative min-h-screen text-white bg-[#050816] flex overflow-hidden">
        <StarBackground />
        <motion.div
          ref={formRef}
          initial={{ x: -100, opacity: 0 }}
          animate={formControls}
          className="form bg-[#090325] py-[3em] my-auto px-[3em] w-[fit-content]"
        >
          <h3 className="text-zinc-400">GET IN TOUCH</h3>
          <h1 className="font-black text-6xl">Contact.</h1>
          <form className="gap-[2em] mt-[2em]" ref={form} onSubmit={sendEmail}>
            <div>
              <label htmlFor="name" className="w-full text-[1.1em]">
                Enter Name:
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                name="user_name"
                id="name"
                className="w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2"
                placeholder="What's your name?"
                type="text"
              />
            </div>

            <div className="mt-[2em]">
              <label htmlFor="email" className="w-full text-[1.1em]">
                Enter Email:
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                name="user_email"
                id="email"
                className="w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2"
                placeholder="What's your Email?"
                type="text"
              />
            </div>

            <div className="mt-[2em]">
              <label htmlFor="message" className="w-full text-[1.1em]">
                Your Message:
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                name="message"
                id="message"
                className="h-[10em] w-full bg-[#151030] text-zinc-100 py-2 rounded-[6px] px-[1em] mt-2"
                placeholder="What do you want to say?"
              />
            </div>

            <button
              type="submit"
              className={`${
                loadingButton ? 'bg-zinc-500' : 'bg-[#925eff] hover:bg-[#543497]'
              } w-full px-[1em] py-[0.7em] font-semibold rounded-[10px] mt-[2em]`}
            >
              {loadingButton ? (
                <i className="fa-solid fa-spinner fa-spin-pulse text-zinc-300 fa-2xl"></i>
              ) : (
                <h1>Send</h1>
              )}
            </button>
          </form>
        </motion.div>
        <motion.div
          ref={earthRef}
          initial={{ x: 100, opacity: 0 }}
          animate={earthControls}
          className="earth w-[50%] mx-auto h-[100vh]"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </>
  )
}

export default Contact
