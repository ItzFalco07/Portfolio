import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167, 139, 250, 0.1)';
        ctx.fill();
      });
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
};

const Button = ({ children, ...props }) => (
  <button
    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent hover:bg-[#a78bfa] hover:bg-opacity-20 h-10 w-10"
    {...props}
  >
    {children}
  </button>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.3 });

  const socialLinks = [
    { icon: Github, href: 'https://github.com/ItzFalco07' },
    { icon: Linkedin, href: 'https://www.upwork.com/freelancers/~0184cf5697571fafe6' },
    { icon: Send, href: 'https://t.me/+nygHO4lU-hIyNWRl' },
    { icon: Mail, href: 'mailto:falcogaming2022@gmail.com' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-[#0D0C18] text-white py-12 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <ParticleBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="mb-8 md:mb-0"
            variants={itemVariants}
          >
            <h2 className="text-3xl font-bold text-[#a78bfa]">CodeWithFalco</h2>
            <p className="text-sm text-gray-400 mt-2">Fullstack Web Developer and Designer</p>
          </motion.div>
          <motion.div 
            className="flex space-x-4"
            variants={itemVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button>
                  <link.icon className="h-5 w-5 text-[#a78bfa]" />
                </Button>
              </motion.a>
            ))}
          </motion.div>
        </div>
        <motion.div 
          className="mt-8 text-center text-sm text-gray-400"
          variants={itemVariants}
        >
          <p>&copy; {currentYear} CodeWithFalco. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}