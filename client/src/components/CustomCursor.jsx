import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring trail
  const ringX = useSpring(mouseX, { damping: 22, stiffness: 260, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 22, stiffness: 260, mass: 0.5 });

  // Snappier spring for central dot
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 700 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 700 });

  useEffect(() => {
    // Detect touch / mobile devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.card') ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
      setIsClicked(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Outer Animated Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-orange-500 pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          width: 36,
          height: 36,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 0.75 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? 'rgba(245, 106, 0, 0.12)' : 'rgba(245, 106, 0, 0.02)',
          borderColor: isHovered ? '#f56a00' : 'rgba(245, 106, 0, 0.55)',
          boxShadow: isHovered
            ? '0 0 25px rgba(245, 106, 0, 0.5), inset 0 0 10px rgba(245, 106, 0, 0.25)'
            : '0 0 10px rgba(245, 106, 0, 0.2)',
        }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 24,
        }}
      />

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          width: 8,
          height: 8,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: '#f56a00',
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicked ? 1.5 : isHovered ? 0.5 : 1,
          boxShadow: '0 0 8px #f56a00',
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 26,
        }}
      />
    </div>
  );
};

export default CustomCursor;
