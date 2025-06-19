document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Lottie Fire Animation as background
    if (window.lottie) {
        lottie.loadAnimation({
            container: document.getElementById('fire-background'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/animations/Fire Animation.json' // Adjust filename if needed
        });

        lottie.loadAnimation({
            container: document.getElementById('fire-lottie'),
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: './assets/animations/fire.json' // adjust if needed
        });
    }

    // Particles.js for fire ashes (higher density, no lines)
    if (window.particlesJS) {
        // Bottom left ashes
        particlesJS('fire-ashes', {
            particles: {
                number: { value: 180, density: { enable: true, value_area: 200 } }, // more dense
                color: { value: "#ffae42" },
                shape: { type: "circle" },
                opacity: { value: 0.7, random: true },
                size: { value: 3, random: true },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "top-right",
                    random: true,
                    straight: false,
                    out_mode: "out"
                },
                line_linked: { enable: false }
            },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } },
            retina_detect: true
        });

        // Top right ashes
        particlesJS('fire-ashes-top', {
            particles: {
                number: { value: 180, density: { enable: true, value_area: 200 } }, // more dense
                color: { value: "#ffae42" },
                shape: { type: "circle" },
                opacity: { value: 0.7, random: true },
                size: { value: 3, random: true },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "bottom-left",
                    random: true,
                    straight: false,
                    out_mode: "out"
                },
                line_linked: { enable: false }
            },
            interactivity: { detect_on: "canvas", events: { onhover: { enable: false } } },
            retina_detect: true
        });
    }

    // Parallax effect for slideshow (if any)
    const slideshowItems = document.querySelectorAll('.slideshow-item');
    if (slideshowItems.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            slideshowItems.forEach(item => {
                item.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Animate coming soon text letters (if any)
    const comingSoonSpans = document.querySelectorAll('.coming-soon-text span');
    if (comingSoonSpans.length > 0) {
        comingSoonSpans.forEach((span, index) => {
            span.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Remove Lottie coming soon animation if present
    // (No need to load it anymore)

    // Typewriter effect for "Coming" and "soon" on two lines, then "SHUNYA"
    // Example for two lines: "Coming" (line1), "soon" (line2), then "SHUNYA" (line1)
    const line1 = document.getElementById('typewriter-line1');
    const line2 = document.getElementById('typewriter-line2');
    if (line1 && line2) {
        const sequences = [
            { line1: "Coming", line2: "soon" },
            { line1: "SHUNYA", line2: "" }
        ];
        let seqIndex = 0;
        let charIndex1 = 0;
        let charIndex2 = 0;

        const typingSpeed = 60;
        const pauseAfterTyping = 2000; // 2 seconds

        function type() {
            const current = sequences[seqIndex];

            if (charIndex1 < current.line1.length) {
                line1.textContent = current.line1.substring(0, charIndex1 + 1);
                charIndex1++;
                setTimeout(type, typingSpeed);
            } else if (charIndex2 < current.line2.length) {
                line2.textContent = current.line2.substring(0, charIndex2 + 1);
                charIndex2++;
                setTimeout(type, typingSpeed);
            } else {
                // Pause with text visible, then instantly switch to next text
                setTimeout(() => {
                    seqIndex = (seqIndex + 1) % sequences.length;
                    charIndex1 = 0;
                    charIndex2 = 0;
                    line1.textContent = "";
                    line2.textContent = "";
                    type();
                }, pauseAfterTyping);
            }
        }
        type();
    }

    // Fire-themed dramatic reveal text animation
    const fireText = document.getElementById('fire-text');
    if (fireText) {
        const messages = [
            "Coming Soon",
            "SHUNYA"
        ];
        let msgIndex = 0;

        function showFireText(text, callback) {
            fireText.innerHTML = "";
            for (let i = 0; i < text.length; i++) {
                const span = document.createElement('span');
                span.textContent = text[i] === " " ? "\u00A0" : text[i];
                span.className = 'fire-letter';
                span.style.animationDelay = (i * 0.08) + "s";
                fireText.appendChild(span);
            }
            // After animation, call callback
            setTimeout(callback, 1800 + text.length * 80);
        }

        function loopFireText() {
            showFireText(messages[msgIndex], () => {
                setTimeout(() => {
                    msgIndex = (msgIndex + 1) % messages.length;
                    loopFireText();
                }, 1800);
            });
        }
        loopFireText();
    }

    // 3D Rotating Cube (auto-rotate, no user interaction)
    (function() {
        const cubeDiv = document.getElementById('cube-container');
        if (!cubeDiv) return;

        const script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = `
            import * as THREE from 'https://unpkg.com/three@0.153.0/build/three.module.js';

            const cubeDiv = document.getElementById('cube-container');
            const getSize = () => {
                const rect = cubeDiv.getBoundingClientRect();
                return {
                    width: rect.width || 240,
                    height: rect.height || 240
                };
            };
            let { width, height } = getSize();

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
            camera.position.z = 3;

            const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
            renderer.setSize(width, height);
            cubeDiv.appendChild(renderer.domElement);

            // Lighting for high contrast and shine
            const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
            scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0xffffff, 1.5);
            pointLight.position.set(5, 5, 5);
            scene.add(pointLight);

            // Environment map for extra shine
            const envLoader = new THREE.CubeTextureLoader();
            const envMap = envLoader.load([
                'https://threejs.org/examples/textures/cube/Bridge2/posx.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negx.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/posy.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negy.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/posz.jpg',
                'https://threejs.org/examples/textures/cube/Bridge2/negz.jpg'
            ]);
            scene.environment = envMap;

            // Load the logo texture and create the cube
            const loader = new THREE.TextureLoader();
            loader.load('./components/images/Brown Chic Clothing Store Logo.png', function(texture) {
                const materials = [];
                for (let i = 0; i < 6; i++) {
                    materials.push(new THREE.MeshPhysicalMaterial({
                        map: texture,
                        metalness: 1,
                        roughness: 0,
                        transparent: false,
                        opacity: 1,
                        reflectivity: 1,
                        clearcoat: 1,
                        clearcoatRoughness: 0,
                        ior: 2.3,
                        envMap: envMap,
                        envMapIntensity: 2.5
                    }));
                }
                const geometry = new THREE.BoxGeometry(1.3, 1.3, 1.3);
                const cube = new THREE.Mesh(geometry, materials);
                scene.add(cube);

                // Animation loop (auto-rotate only)
                function animateCube() {
                    requestAnimationFrame(animateCube);
                    cube.rotation.y += 0.012;
                    cube.rotation.x += 0.008;
                    renderer.render(scene, camera);
                }
                animateCube();

                // Responsive resize
                window.addEventListener('resize', () => {
                    const { width: newWidth, height: newHeight } = getSize();
                    renderer.setSize(newWidth, newHeight);
                    camera.aspect = newWidth / newHeight;
                    camera.updateProjectionMatrix();
                });
            });
        `;
        document.body.appendChild(script);
    })();
});