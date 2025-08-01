// import React from 'react';
// import '../styles/home.css';
// import coffeeCup from '../assets/3_7.jpg'; // Make sure to add an image in assets

// const Home = () => {
//   return (
//     <section className="home" id="home">
//       <div className="logo-container">
//         <div className="ripple">
//           <img src={coffeeCup} alt="Coffee Cup" className="coffee-cup" />
//         </div>
//         <h1 className="shop-name">Welcome to Cozy Corner</h1>
//       </div>
//     </section>
//   );
// };

// export default Home;


import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../styles/home.css'; // Assuming styles are in a subfolder

// Component for the Ripple Button to keep the logic clean
const RippleButton = ({ children, className }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const clickHandler = (e) => {
            const rect = button.getBoundingClientRect();
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');

            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            button.appendChild(circle);
        };

        button.addEventListener('click', clickHandler);

        return () => {
            button.removeEventListener('click', clickHandler);
        };
    }, []);

    return (
        <button ref={buttonRef} className={className}>
            {children}
        </button>
    );
};


// Main Home Component
const Home = () => {
    const canvasContainerRef = useRef(null);
    const scrollTextRef = useRef(null);
    const bestsellerRef = useRef(null);

    // --- EFFECT FOR 3D SCENE ---
    useEffect(() => {
        const container = canvasContainerRef.current;
        if (!container || container.childElementCount > 0) return; // Ensure it only runs once

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ color: 0xf5f5dc, roughness: 0.4, metalness: 0.1 });
        
        const cupGeometry = new THREE.CylinderGeometry(1.4, 1.1, 1.8, 48);
        const cup = new THREE.Mesh(cupGeometry, material);
        cup.position.y = 0.5;
        group.add(cup);
        
        const handleGeometry = new THREE.TorusGeometry(0.6, 0.18, 16, 32, Math.PI * 1.5);
        const handle = new THREE.Mesh(handleGeometry, material);
        handle.position.x = 1.3;
        handle.position.y = 0.7;
        handle.rotation.y = Math.PI / 2;
        group.add(handle);
        
        const saucerGeometry = new THREE.CylinderGeometry(2.2, 2, 0.3, 48);
        const saucer = new THREE.Mesh(saucerGeometry, material);
        saucer.position.y = -0.55;
        group.add(saucer);

        scene.add(group);
        group.rotation.x = 0.2;

        const particleTexture = new THREE.TextureLoader().load('https://i.imgur.com/b42WHbJ.png');
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff, size: 0.3, map: particleTexture,
            blending: THREE.AdditiveBlending, transparent: true, opacity: 0.4, depthWrite: false,
        });

        const particleCount = 50;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 1.5;
            positions[i * 3 + 1] = Math.random() * 2;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const steam = new THREE.Points(particleGeometry, particleMaterial);
        steam.position.y = 1.5;
        scene.add(steam);

        let mouseX = 0;
        const mouseMoveHandler = (event) => { mouseX = (event.clientX / window.innerWidth) * 2 - 1; };
        document.addEventListener('mousemove', mouseMoveHandler);

        const animate = () => {
            requestAnimationFrame(animate);
            group.rotation.y += (mouseX * 0.3 - group.rotation.y) * 0.05;
            steam.geometry.attributes.position.array.forEach((_, i) => {
                if (i % 3 === 1) {
                    steam.geometry.attributes.position.array[i] += 0.01;
                    if (steam.geometry.attributes.position.array[i] > 3) {
                        steam.geometry.attributes.position.array[i] = Math.random() * 0.5;
                    }
                }
            });
            steam.geometry.attributes.position.needsUpdate = true;
            renderer.render(scene, camera);
        };
        animate();

        const resizeHandler = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };
        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
            container.removeChild(renderer.domElement);
        };
    }, []);

    // --- EFFECT FOR SCROLL ANIMATIONS ---
    useEffect(() => {
        const scrollText = scrollTextRef.current;
        const bestseller = bestsellerRef.current;

        const scrollHandler = () => {
            if (scrollText) {
                const MAX_FONT_SIZE = window.innerWidth > 768 ? 10 : 12;
                const MIN_FONT_SIZE = window.innerWidth > 768 ? 6 : 8;
                const SCROLL_RANGE = 400;
                let scale = Math.min(window.scrollY / SCROLL_RANGE, 1);
                let fontSize = MIN_FONT_SIZE + (MAX_FONT_SIZE - MIN_FONT_SIZE) * scale;
                scrollText.style.fontSize = `${fontSize}vw`;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        if (bestseller) {
            observer.observe(bestseller);
        }

        window.addEventListener('scroll', scrollHandler, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            if (bestseller) {
                observer.unobserve(bestseller);
            }
        };
    }, []);


    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section">
                <div ref={canvasContainerRef} id="canvas-container" aria-hidden="true"></div>
                <h1 ref={scrollTextRef} className="hero-title">Welcome Home</h1>
            </section>

            {/* Bestseller Section */}
            <section ref={bestsellerRef} className="content-section bestseller">
                <div className="text-content">
                    <h2>Taste the Comfort</h2>
                    <p>Discover our signature sandwich, crafted with the freshest ingredients and a touch of homemade love. It's not just a meal; it's an experience that feels like a warm hug.</p>
                </div>
                <div className="image-content">
                    <img src="https://images.unsplash.com/photo-1528735602780-2552fd46c766?q=80&w=800" alt="A delicious-looking sandwich on a wooden board." />
                </div>
            </section>

            {/* Image Gallery Section */}
            <section className="content-section">
                <h2>Experience the Ambiance</h2>
                <div className="image-gallery">
                    <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=800" alt="Cozy cafe interior with warm lighting." />
                    <img src="https://images.unsplash.com/photo-1511920183353-3c9c93dae217?q=80&w=800" alt="Close up of a latte with beautiful art on top." />
                    <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800" alt="A person holding a coffee cup in a relaxing cafe setting." />
                    <img src="https://images.unsplash.com/photo-1552526881-72f222ed9de8?q=80&w=800" alt="An aesthetic corner of the cafe with plants and books." />
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="content-section cta-section">
                <h2>Find Your Corner</h2>
                <p>A perfect spot is waiting for you. Let us make your day a little cozier.</p>
                <RippleButton className="cta-button">
                    Reserve a Table
                </RippleButton>
            </section>
        </main>
    );
};

export default Home;
