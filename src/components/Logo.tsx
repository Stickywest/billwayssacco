
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const kiteVariants = {
  hidden: { 
    y: 100,
    opacity: 0,
    x: -50,
    rotate: -20
  },
  visible: {
    y: [0, -20, 0, -10, 0], // Floating motion
    x: [0, 15, -10, 20, 0], // Side-to-side drift
    rotate: [-5, 5, -3, 3, 0], // Gentle tilting
    opacity: 1,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const stringVariants = {
  hidden: { 
    scaleY: 0,
    opacity: 0
  },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const tailVariants = {
  hidden: { 
    pathLength: 0,
    opacity: 0
  },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: {
      delay: i * 0.1,
      duration: 1.2,
      ease: "easeOut"
    }
  })
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      delay: 1.5, 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
};

const Logo = ({ isLoading = true }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isLoading, controls]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-blue-50 z-50">
      {/* Clouds */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-16 h-8 bg-white rounded-full opacity-80"
        initial={{ x: -100 }}
        animate={{ 
          x: [0, 20, 0],
          transition: {
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      <motion.div 
        className="absolute top-1/3 right-1/4 w-24 h-10 bg-white rounded-full opacity-80"
        initial={{ x: 100 }}
        animate={{ 
          x: [0, -30, 0],
          transition: {
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }
        }}
      />

      {/* Kite with string */}
      <div className="relative h-64 w-full flex items-center justify-center">
        <motion.div
          className="absolute top-1/4 z-10"
          initial="hidden"
          animate={controls}
          variants={kiteVariants}
        >
          {/* Kite body */}
          <div className="relative w-24 h-24 rotate-45 bg-gradient-to-br from-yellow-300 via-red-400 to-purple-500 shadow-lg">
            {/* Kite cross frame */}
            <div className="absolute inset-0 border-2 border-white border-opacity-50"></div>
            <div className="absolute top-0 left-1/2 w-1 h-full bg-white bg-opacity-70 transform -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-full h-1 bg-white bg-opacity-70 transform -translate-y-1/2"></div>
            
            {/* Kite details */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white"></div>
            <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 rounded-full bg-white"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-white"></div>
          </div>

          {/* Kite tail */}
          <svg 
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            width="8" 
            height="120" 
            viewBox="0 0 8 120"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.circle
                key={i}
                custom={i}
                variants={tailVariants}
                cx="4"
                cy={20 + (i * 20)}
                r="3"
                fill="purple"
                fillOpacity={0.6 - (i * 0.1)}
              />
            ))}
          </svg>
        </motion.div>

        {/* Kite string */}
        <motion.div
          className="absolute top-1/4 bottom-1/2 w-px bg-gray-400 transform -translate-y-1/2"
          style={{ originY: 0 }}
          initial="hidden"
          animate={controls}
          variants={stringVariants}
        />
      </div>

      <motion.h1
        className="mt-32 text-3xl font-bold text-blue-700 tracking-wide"
        variants={textVariants}
      >
        Billways Sacco
      </motion.h1>
    </div>
  );
};

export default Logo;