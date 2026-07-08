import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function ThreeHeroBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentRef = mountRef.current;
    if (!currentRef) return;

    const width = currentRef.clientWidth;
    const height = currentRef.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentRef.appendChild(renderer.domElement);

    // Torus Knot Mesh
    const geometry = new THREE.TorusKnotGeometry(1.4, 0.35, 120, 16);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xFAAC5C,
      roughness: 0.2,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: true,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffd397, 3, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe99437, 2, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.003;

      // Soft mouse tracking inertia
      torusKnot.position.x += (mouseX * 3 - torusKnot.position.x) * 0.05;
      torusKnot.position.y += (-mouseY * 3 - torusKnot.position.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!currentRef) return;
      const w = currentRef.clientWidth;
      const h = currentRef.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer) renderer.dispose();
      if (currentRef && currentRef.contains(renderer.domElement)) {
        currentRef.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%', opacity: 0.7 }} />;
}
