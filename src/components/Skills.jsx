import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import css from '../assets/skills/css.svg';
import html from '../assets/skills/html.svg';
import js from '../assets/skills/js.svg';
import react from '../assets/skills/react.svg';
import tailwind from '../assets/skills/tailwind.svg';
import github from '../assets/skills/github.svg';
import nodejs from '../assets/skills/nodeJS.svg';
import socket from '../assets/skills/socket.svg';
import vs from '../assets/skills/vs.svg';
import gpt from '../assets/skills/gpt.svg';
import express from '../assets/skills/express.svg';
import mongo from '../assets/skills/mongo.svg';
import figma from '../assets/skills/figma.svg';


gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const [current, setCurrent] = useState('Frontend');
  const [skills, setSkills] = useState([]);
  const skillRefs = useRef([]);

  useEffect(() => {
    if (current === 'Frontend') {
      setSkills([
        { img: html, percent: '85' },
        { img: css, percent: '90' },
        { img: js, percent: '80' },
        { img: react, percent: '94' },
        { img: tailwind, percent: '88' }
      ]);
    } else if (current === 'Backend') {
      setSkills([
        { img: nodejs, percent: '90' },
        { img: express, percent: '100' },
        { img: mongo, percent: '100' },
        { img: socket, percent: '85' },
      ]);
    } else if (current === 'Tools') {
      setSkills([
        { img: github, percent: '100' },
        { img: figma, percent: '100' },
        { img: vs, percent: '95' },
        { img: gpt, percent: '100' },
      ]);
    }
  }, [current]);

  useEffect(() => {
    skillRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref.querySelector('.loader'), 
          { width: '0%' }, 
          {
            width: `${skills[index].percent}%`,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 80%',
              end: 'top 90%',
              scrub: true,
              toggleActions: 'play none none reverse',
              // markers: true
            }
          }
        );
      }
    });
  }, [skills]);

  return (
    <div className="container-skills w-full min-h-screen z-[1] relative bg-[#050816] p-[6em] pt-[10em] text-white">
      <div className="text">
        <h3 className="opacity-[0.6]">INTRODUCTION</h3>
        <h1 className="main-t text-6xl font-black">Overview</h1>
        <p className="big-p opacity-[0.6] mt-[1em] w-[450px]">
          I'm a skilled software developer with experience in TypeScript and JavaScript, and expertise in frameworks like React, Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable, and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
        </p>
      </div>

      <div className="skills mt-[5em]">
        <h1 className="text-[#925EFF] w-[fit-content] font-semibold text-4xl hover:underline cursor-pointer">
          <span className="text-[#6940C1]">#</span> Skills
        </h1>
        <div className="selector flex gap-[1em] mt-[2em]">
          <div onClick={() => setCurrent('Frontend')} className={`${current === 'Frontend' ? 'bg-[#925EFF]' : 'bg-[#252E5C]'} w-[10em] h-[2.6em] font-medium cursor-pointer flex items-center justify-center rounded-[10px]`}>
            Frontend
          </div>
          <div onClick={() => setCurrent('Backend')} className={`${current === 'Backend' ? 'bg-[#925EFF]' : 'bg-[#252E5C]'} w-[10em] h-[2.6em] font-medium cursor-pointer flex items-center justify-center rounded-[10px]`}>
            Backend
          </div>
          <div onClick={() => setCurrent('Tools')} className={`${current === 'Tools' ? 'bg-[#925EFF]' : 'bg-[#252E5C]'} w-[10em] h-[2.6em] font-medium cursor-pointer flex items-center justify-center rounded-[10px]`}>
            Tools
          </div>
        </div>

        <div className="display-skills mt-[2em] gap-[1em]">
          {skills.map((skill, index) => (
            <div className="flex gap-[1em] mb-[1em]" key={index} ref={(el) => skillRefs.current[index] = el}>
              <img src={skill.img} alt="Skill" />
              <div className="relative percent w-[70%] h-[6px]">
                <p className={`w-fit-content `} style={{ paddingLeft: `${Number(skill.percent) - 5}%` }}>{`${skill.percent}%`}</p>
                <div
                  className="loader bg-[#925EFF] absolute h-full z-[2] rounded-full"
                ></div>
                <div className="absolute h-full w-full bg-[#384066] z-[1] rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
