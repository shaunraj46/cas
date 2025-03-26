document.addEventListener('DOMContentLoaded', () => {
    // Initialize Three.js canvas for hero section
    initHeroCanvas();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Mobile menu toggle
    initMobileMenu();
  });
  
  function initHeroCanvas() {
    // Create a simple Three.js scene for the hero section
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvas.appendChild(renderer.domElement);
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create blue gradient particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
  }
  
  function initScrollAnimations() {
    // Initialize GSAP ScrollTrigger animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate feature cards
      gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
      
      // Animate how-it-works steps
      gsap.utils.toArray('.how-it-works-step').forEach((step, i) => {
        gsap.from(step, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      });
      
      // Animate testimonial cards
      gsap.utils.toArray('.testimonial-card').forEach((card, i) => {
        gsap.from(card, {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      });
    }
  }
  
  function initMobileMenu() {
    // Add mobile menu functionality if needed
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  }