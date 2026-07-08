import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setHidden(false);
      const { clientX: x, clientY: y } = e;

      // Animate the main cursor with a slight lag (trailing effect)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Animate the dot immediately
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.closest('a') ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.classList.contains('hover-target') ||
        target.closest('.hover-target')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${hovered ? 'hovered' : ''}`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate3d(-50%, -50%, 0)',
          visibility: hidden ? 'hidden' : 'visible'
        }}
      />
      <div 
        ref={dotRef} 
        className="custom-cursor-dot" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: 'translate3d(-50%, -50%, 0)',
          visibility: hidden ? 'hidden' : 'visible'
        }}
      />
    </>
  );
}
