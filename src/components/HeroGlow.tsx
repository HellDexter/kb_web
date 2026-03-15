import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

const BinaryParticle = ({ color }: { color: string }) => {
  const x = useMemo(() => Math.random() * 100, []);
  const y = useMemo(() => Math.random() * 100, []);
  const duration = useMemo(() => 3 + Math.random() * 5, []);
  const delay = useMemo(() => Math.random() * 5, []);
  const digit = useMemo(() => (Math.random() > 0.5 ? '1' : '0'), []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: [0, 0.4, 0],
        y: ['-10%', '110%'],
        scale: [0.5, 1, 0.5]
      }}
      transition={{ 
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "linear"
      }}
      className="absolute text-[10px] font-mono pointer-events-none select-none"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`,
        color,
        textShadow: `0 0 8px ${color}`
      }}
    >
      {digit}
    </motion.div>
  );
};

export const HeroGlow = () => {
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for the scanner effect
  const springConfig = { damping: 25, stiffness: 150 };
  const scannerX = useSpring(mouseX, springConfig);
  const scannerY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => (
      <BinaryParticle key={i} color={isMobile ? 'rgba(6, 182, 212, 0.2)' : 'rgba(6, 182, 212, 0.4)'} />
    ));
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Scanner Glow */}
      {!isMobile && (
        <motion.div
          style={{
            x: scannerX,
            y: scannerY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] mix-blend-screen"
        />
      )}

      {/* Interactive Lens Layer */}
      {!isMobile && (
        <motion.div
          style={{
            x: scannerX,
            y: scannerY,
            translateX: '-50%',
            translateY: '-50%',
            backdropFilter: 'brightness(1.15) saturate(1.2) contrast(1.1)',
            WebkitBackdropFilter: 'brightness(1.15) saturate(1.2) contrast(1.1)',
            maskImage: 'radial-gradient(circle, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle, black 0%, transparent 70%)',
          }}
          className="absolute w-[400px] h-[400px] rounded-full pointer-events-none z-10"
        />
      )}

      {/* Global Atmosphere Breathing */}
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay"
      />

      {/* Binary Rain/Particles */}
      <div className="absolute inset-0 opacity-40">
        {particles}
      </div>

      {/* Scanning Line */}
      <motion.div
        animate={{ 
          top: ['-10%', '110%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10"
      />
    </div>
  );
};
