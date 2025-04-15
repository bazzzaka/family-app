import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';

const NeonTree = ({ opacity = 0.8, scale = 1 }) => {
  const theme = useTheme();
  const mainColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;
  
  // Animation paths variants
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: opacity,
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5
      }
    }
  };
  
  // Glow animation variants
  const glowVariants = {
    dim: {
      filter: "drop-shadow(0 0 2px rgba(0, 255, 255, 0.3))",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    },
    bright: {
      filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.7))",
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  // Leaf animation variants
  const leafVariants = {
    sway: {
      rotate: [0, 2, 0, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      style={{ 
        width: `${scale * 100}%`, 
        height: `${scale * 100}%`,
        maxWidth: '100%',
        position: 'absolute',
        zIndex: 0,
        opacity: 0.9
      }}
      initial="hidden"
      animate="visible"
      variants={glowVariants}
      whileInView="bright"
    >
      {/* Tree trunk */}
      <motion.path
        d="M400,700 Q400,600 420,500 Q430,400 400,300 Q390,250 400,200"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="8"
        strokeLinecap="round"
        variants={pathVariants}
        custom={0}
      />
      
      {/* Main branches */}
      <motion.path
        d="M400,300 Q450,280 500,290 Q530,300 550,330"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="6"
        strokeLinecap="round"
        variants={pathVariants}
        custom={1}
      />
      
      <motion.path
        d="M400,300 Q350,270 300,290 Q270,310 250,340"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="6"
        strokeLinecap="round"
        variants={pathVariants}
        custom={1}
      />
      
      <motion.path
        d="M400,400 Q450,410 490,400 Q520,390 540,370"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants}
        custom={2}
      />
      
      <motion.path
        d="M400,400 Q350,410 310,400 Q280,390 260,370"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants}
        custom={2}
      />
      
      {/* Secondary branches */}
      <motion.path
        d="M400,200 Q430,180 460,190"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="4"
        strokeLinecap="round"
        variants={pathVariants}
        custom={3}
      />
      
      <motion.path
        d="M400,200 Q370,180 340,190"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="4"
        strokeLinecap="round"
        variants={pathVariants}
        custom={3}
      />
      
      {/* Leaves/foliage as animated glowing dots and small branches */}
      <motion.g variants={leafVariants} animate="sway">
        {/* Right side leaves */}
        <motion.circle cx="550" cy="330" r="5" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="530" cy="310" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="510" cy="290" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="540" cy="370" r="5" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="520" cy="380" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="500" cy="390" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="460" cy="190" r="3" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="470" cy="180" r="2" fill={secondaryColor} variants={pathVariants} />
        
        {/* Left side leaves */}
        <motion.circle cx="250" cy="340" r="5" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="270" cy="320" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="290" cy="300" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="260" cy="370" r="5" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="280" cy="380" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="300" cy="390" r="4" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="340" cy="190" r="3" fill={secondaryColor} variants={pathVariants} />
        <motion.circle cx="330" cy="180" r="2" fill={secondaryColor} variants={pathVariants} />
        
        {/* Small lines to connect leaves to branches - right side */}
        <motion.path
          d="M500,290 Q510,280 530,310"
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
        />
        
        <motion.path
          d="M490,400 Q510,410 520,380"
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
        />
        
        {/* Small lines to connect leaves to branches - left side */}
        <motion.path
          d="M300,290 Q280,280 270,320"
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
        />
        
        <motion.path
          d="M310,400 Q290,410 280,380"
          fill="transparent"
          stroke={secondaryColor}
          strokeWidth="2"
          strokeLinecap="round"
          variants={pathVariants}
        />
      </motion.g>
      
      {/* Roots */}
      <motion.path
        d="M400,700 Q430,720 460,730"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants}
        custom={3}
      />
      
      <motion.path
        d="M400,700 Q370,720 340,730"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="5"
        strokeLinecap="round"
        variants={pathVariants}
        custom={3}
      />
      
      {/* Root extensions */}
      <motion.path
        d="M460,730 Q480,735 490,740"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        custom={4}
      />
      
      <motion.path
        d="M340,730 Q320,735 310,740"
        fill="transparent"
        stroke={mainColor}
        strokeWidth="3"
        strokeLinecap="round"
        variants={pathVariants}
        custom={4}
      />
      
      {/* Light effect overlay */}
      <motion.ellipse
        cx="400"
        cy="450"
        rx="250"
        ry="300"
        fill="url(#radialGradient)"
        opacity="0.15"
        animate={{
          opacity: [0.05, 0.2, 0.05],
          rx: [230, 270, 230],
          ry: [280, 320, 280]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Defs for gradients and filters */}
      <defs>
        <radialGradient id="radialGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor={secondaryColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={mainColor} stopOpacity="0" />
        </radialGradient>
      </defs>
    </motion.svg>
  );
};

export default NeonTree; 