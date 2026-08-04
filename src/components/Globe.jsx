import React, { useCallback, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import styles from './Globe.module.scss';

const GLOBE_CONFIG = {
  width: 800, height: 800, devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
  phi: 0, theta: 0.3, dark: 0, diffuse: 0.4, mapSamples: 16000, mapBrightness: 1.2,
  baseColor: [1, 1, 1], markerColor: [250 / 255, 172 / 255, 92 / 255], glowColor: [1, 0.97, 0.91],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 }, { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 }, { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 }, { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 }, { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 }, { location: [41.0082, 28.9784], size: 0.06 }
  ]
};

export default function Globe({ className = '', config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null), phiRef = useRef(0), widthRef = useRef(0), pointerRef = useRef(null), movementRef = useRef(0), rotationRef = useRef(0);
  const updatePointer = (value) => { pointerRef.current = value; if (canvasRef.current) canvasRef.current.style.cursor = value === null ? 'grab' : 'grabbing'; };
  const updateMovement = (clientX) => { if (pointerRef.current !== null) { const delta = clientX - pointerRef.current; movementRef.current = delta; rotationRef.current = delta / 200; } };
  const onRender = useCallback((state) => {
    if (pointerRef.current === null && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) phiRef.current += 0.0035;
    state.phi = phiRef.current + rotationRef.current; state.width = widthRef.current * 2; state.height = widthRef.current * 2;
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return undefined;
    const onResize = () => { widthRef.current = canvas.offsetWidth; };
    window.addEventListener('resize', onResize); onResize();
    const globe = createGlobe(canvas, { ...config, width: widthRef.current * 2, height: widthRef.current * 2, onRender });
    const frame = requestAnimationFrame(() => canvas.classList.add(styles.visible));
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', onResize); globe.destroy(); };
  }, [config, onRender]);
  return <div className={`${styles.globe} ${className}`} aria-hidden="true"><canvas ref={canvasRef} className={styles.canvas}
    onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); updatePointer(event.clientX - movementRef.current); }}
    onPointerUp={() => updatePointer(null)} onPointerCancel={() => updatePointer(null)} onPointerMove={(event) => updateMovement(event.clientX)} /></div>;
}
