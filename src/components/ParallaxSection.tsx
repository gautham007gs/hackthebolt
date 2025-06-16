import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  children, 
  className = '', 
  speed = 0.5, 
  direction = 'up' 
}) => {
  const [elementTop, setElementTop] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const initial = elementTop - clientHeight;
  const final = elementTop + (ref.current?.offsetHeight || 0);

  const yRange = useTransform(
    scrollY,
    [initial, final],
    direction === 'up' ? [0, -(final - initial) * speed] : [0, (final - initial) * speed]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onResize = () => {
      setElementTop(element.offsetTop);
      setClientHeight(window.innerHeight);
    };

    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ y: yRange }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;