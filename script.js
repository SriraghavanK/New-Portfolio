// import { Chart } from "./chart.js"
/**
 * Sriraghavan K - Tech Portfolio
 * Main JavaScript
 */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS animations if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  // Initialize loader with a forced timeout
  initLoader();

  // Initialize background particles
  initBackgroundParticles();

  // Initialize 3D tech background
  init3DTechBackground();

  // Initialize navbar scroll effect
  initNavbar();

  // Initialize back to top button
  initBackToTop();

  // Initialize project cards hover effects
  initProjectCards();

  // Initialize project filters
  initProjectFilters();

  // Initialize typing animation
  initTypingAnimation();

  // Initialize 3D skills cube
  initSkillsCube();

  // Initialize About tabs
  initAboutTabs();

  // Add the new initialization
  initRevampedSkills();

  // Add the new responsive enhancements
  enhanceResponsiveness();
});

// Initialize typing animation
function initTypingAnimation() {
  const textElement = document.getElementById("typing-text");
  if (!textElement) return;

  const roles = [
    "WEB DEVELOPER",
    "TECH ENTHUSIAST",
    "UI/UX DESIGNER",
    "PROBLEM SOLVER",
    "GAMER",
  ];

  let currentRoleIndex = 0;

  function typeText() {
    const currentRole = roles[currentRoleIndex];
    let charIndex = 0;

    // Clear previous text
    textElement.textContent = "";

    // Type current role
    const typingInterval = setInterval(() => {
      if (charIndex < currentRole.length) {
        textElement.textContent += currentRole.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);

        // Wait before erasing
        setTimeout(eraseText, 2000);
      }
    }, 100);
  }

  function eraseText() {
    const currentText = textElement.textContent;
    let charIndex = currentText.length;

    const erasingInterval = setInterval(() => {
      if (charIndex > 0) {
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        clearInterval(erasingInterval);

        // Move to next role
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;

        // Start typing next role
        setTimeout(typeText, 500);
      }
    }, 50);
  }

  // Start the typing animation
  typeText();
}

// Replace the initSkillsCube function with this improved version
function initSkillsCube() {
  const cube = document.querySelector(".skills-cube");
  if (!cube) return;

  // Add mouse interaction for the cube
  const cubeContainer = document.querySelector(".skills-cube-container");

  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  const rotation = { x: 0, y: 0 };

  // Mouse down event to start dragging
  cubeContainer.addEventListener("mousedown", (e) => {
    isDragging = true;
    previousMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };

    // Prevent default to avoid text selection during drag
    e.preventDefault();

    // Stop animation when starting to drag
    cube.style.animation = "none";
  });

  // Mouse move event to rotate the cube
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaMove = {
      x: e.clientX - previousMousePosition.x,
      y: e.clientY - previousMousePosition.y,
    };

    // Update rotation based on mouse movement
    rotation.x += deltaMove.y * 0.5;
    rotation.y += deltaMove.x * 0.5;

    // Apply rotation
    cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;

    // Update previous position
    previousMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  });

  // Mouse up event to stop dragging
  document.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Mouse leave event to stop dragging
  cubeContainer.addEventListener("mouseleave", () => {
    if (isDragging) {
      isDragging = false;
      // Don't resume animation when leaving after dragging
    } else {
      // Only resume animation if we weren't dragging
      cube.style.animation = "rotateCube 20s infinite linear";
      cube.style.transform = "";
    }
  });
}

// Initialize 3D tech background
function init3DTechBackground() {
  if (!document.querySelector(".tech-3d-scene")) {
    // Create the scene container if it doesn't exist
    const sceneContainer = document.createElement("div");
    sceneContainer.className = "tech-3d-scene";
    sceneContainer.style.position = "absolute";
    sceneContainer.style.top = "0";
    sceneContainer.style.left = "0";
    sceneContainer.style.width = "100%";
    sceneContainer.style.height = "100%";
    sceneContainer.style.zIndex = "2";
    document.querySelector(".hero").appendChild(sceneContainer);
  }

  // Check if Three.js is loaded
  if (typeof THREE === "undefined") {
    console.warn(
      "Three.js is not loaded. 3D background will not be initialized."
    );
    // Add Three.js dynamically if not available
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = setupScene;
    script.head = document.head;
    document.head.appendChild(script);
    return;
  }

  setupScene();

  function setupScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.querySelector(".tech-3d-scene").appendChild(renderer.domElement);

    // Create tech-themed objects
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00c6ff,
      transparent: true,
      opacity: 0.7,
    });

    const icosahedron = new THREE.LineSegments(wireframe, material);
    scene.add(icosahedron);

    // Add more tech elements - floating cubes
    const cubes = [];
    // Reduce number of cubes on mobile for better performance
    const cubeCount = window.innerWidth < 768 ? 10 : 20;

    for (let i = 0; i < cubeCount; i++) {
      const size = Math.random() * 0.3 + 0.1;
      const cubeGeometry = new THREE.BoxGeometry(size, size, size);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00c6ff : 0xff5c33,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });

      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = (Math.random() - 0.5) * 10;
      cube.position.y = (Math.random() - 0.5) * 10;
      cube.position.z = (Math.random() - 0.5) * 10 - 5;

      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;

      // Store rotation speed
      cube.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
        },
      };

      scene.add(cube);
      cubes.push(cube);
    }

    // Add connecting lines between some cubes - fewer on mobile
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0x00c6ff,
      transparent: true,
      opacity: 0.3,
    });

    const lineCount = window.innerWidth < 768 ? 8 : 15;
    for (let i = 0; i < lineCount; i++) {
      const startCube = cubes[Math.floor(Math.random() * cubes.length)];
      const endCube = cubes[Math.floor(Math.random() * cubes.length)];

      if (startCube !== endCube) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          startCube.position,
          endCube.position,
        ]);

        const line = new THREE.Line(lineGeometry, linesMaterial);
        scene.add(line);
      }
    }

    // Create tech logo - a circuit board style logo
    createTechLogo(scene);

    // Position camera
    camera.position.z = 5;

    // Handle window resize
    window.addEventListener("resize", () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Adjust camera position based on screen size
      if (width < 768) {
        camera.position.z = 7; // Move camera back on mobile for better view
      } else {
        camera.position.z = 5;
      }
    });

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);

      // Rotate icosahedron
      icosahedron.rotation.x += 0.002;
      icosahedron.rotation.y += 0.003;

      // Rotate cubes
      cubes.forEach((cube) => {
        cube.rotation.x += cube.userData.rotationSpeed.x;
        cube.rotation.y += cube.userData.rotationSpeed.y;
      });

      // Subtle camera movement - reduce on mobile
      const movementIntensity = window.innerWidth < 768 ? 0.0002 : 0.0005;
      camera.position.x = Math.sin(Date.now() * movementIntensity) * 0.5;
      camera.position.y = Math.cos(Date.now() * movementIntensity) * 0.5;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    animate();
  }

  // Create a tech-related 3D logo (circuit board style)
  function createTechLogo(scene) {
    // Create a group to hold all logo elements
    const logoGroup = new THREE.Group();
    logoGroup.position.set(0, 0, -2); // Position in front of other elements

    // Create the main circuit board base
    const boardGeometry = new THREE.BoxGeometry(3, 2, 0.1);
    const boardMaterial = new THREE.MeshBasicMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.8,
    });
    const board = new THREE.Mesh(boardGeometry, boardMaterial);
    logoGroup.add(board);

    // Add circuit traces
    const traceMaterial = new THREE.LineBasicMaterial({
      color: 0x00c6ff,
      transparent: true,
      opacity: 0.9,
      linewidth: 2,
    });

    // Create horizontal traces
    for (let i = 0; i < 5; i++) {
      const points = [];
      const y = -0.8 + i * 0.4;
      points.push(new THREE.Vector3(-1.5, y, 0.06));
      points.push(new THREE.Vector3(1.5, y, 0.06));

      const traceGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const trace = new THREE.Line(traceGeometry, traceMaterial);
      logoGroup.add(trace);
    }

    // Create vertical traces
    for (let i = 0; i < 7; i++) {
      const points = [];
      const x = -1.5 + i * 0.5;
      points.push(new THREE.Vector3(x, -0.8, 0.06));
      points.push(new THREE.Vector3(x, 0.8, 0.06));

      const traceGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const trace = new THREE.Line(traceGeometry, traceMaterial);
      logoGroup.add(trace);
    }

    // Add CPU/chip in the center
    const chipGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
    const chipMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5c33,
      transparent: true,
      opacity: 0.9,
    });
    const chip = new THREE.Mesh(chipGeometry, chipMaterial);
    chip.position.set(0, 0, 0.1);
    logoGroup.add(chip);

    // Add smaller components (resistors, capacitors)
    const componentColors = [0x00c6ff, 0xff5c33, 0x00ff00, 0xffff00];

    // Reduce components on mobile
    const componentCount = window.innerWidth < 768 ? 6 : 12;

    for (let i = 0; i < componentCount; i++) {
      const size = 0.15 + Math.random() * 0.1;
      const componentGeometry = new THREE.BoxGeometry(size, size, 0.05);
      const componentMaterial = new THREE.MeshBasicMaterial({
        color: componentColors[i % componentColors.length],
        transparent: true,
        opacity: 0.9,
      });

      const component = new THREE.Mesh(componentGeometry, componentMaterial);

      // Position components around the board but not in the center
      let x, y;
      do {
        x = (Math.random() - 0.5) * 2.5;
        y = (Math.random() - 0.5) * 1.5;
      } while (Math.abs(x) < 0.5 && Math.abs(y) < 0.5); // Avoid center

      component.position.set(x, y, 0.1);
      logoGroup.add(component);
    }

    // Add pulsing effect to the logo
    const pulseAnimation = {
      time: 0,
      update: function (delta) {
        this.time += delta;
        const pulse = Math.sin(this.time * 2) * 0.1 + 1;
        logoGroup.scale.set(pulse, pulse, 1);
      },
    };

    // Store the animation in the userData
    logoGroup.userData.animation = pulseAnimation;

    // Add the logo group to the scene
    scene.add(logoGroup);

    // Create a clock for animation timing
    const clock = new THREE.Clock();

    // Update the animation in the render loop
    function updateLogoAnimation() {
      const delta = clock.getDelta();
      logoGroup.userData.animation.update(delta);
      requestAnimationFrame(updateLogoAnimation);
    }

    updateLogoAnimation();

    return logoGroup;
  }
}

// Loader animation with forced timeout
function initLoader() {
  const loaderWrapper = document.querySelector(".loader-wrapper");

  // Force hide loader after a maximum time (1 second)
  setTimeout(() => {
    if (loaderWrapper) {
      loaderWrapper.classList.add("fade-out");
      document.body.style.overflow = "auto";
    }
  }, 1000);

  // Also hide loader on window load event as backup
  window.addEventListener("load", () => {
    if (loaderWrapper) {
      loaderWrapper.classList.add("fade-out");
      document.body.style.overflow = "auto";
    }
  });

  // Disable scrolling while loader is active
  document.body.style.overflow = "hidden";
}

// Create background particles
function initBackgroundParticles() {
  const particlesContainer = document.querySelector(".particles-background");
  if (!particlesContainer) return;

  // Create floating particles
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer);
  }

  // Create floating code elements
  const codeElements = [
    "{",
    "}",
    "<>",
    "/>",
    "()",
    "[]",
    "&&",
    "||",
    "=>",
    "++",
  ];

  for (let i = 0; i < 15; i++) {
    createCodeElement(particlesContainer, codeElements);
  }
}

// Create a single particle
function createParticle(container) {
  const particle = document.createElement("div");

  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;

  // Random size
  const size = Math.random() * 5 + 2;

  // Random opacity
  const opacity = Math.random() * 0.5 + 0.1;

  // Style the particle
  particle.style.cssText = `
    position: absolute;
    top: ${posY}%;
    left: ${posX}%;
    width: ${size}px;
    height: ${size}px;
    background-color: ${Math.random() > 0.5 ? "#00c6ff" : "#ff5c33"};
    border-radius: 50%;
    opacity: ${opacity};
    box-shadow: 0 0 10px rgba(0, 198, 255, 0.8);
    animation: float ${Math.random() * 10 + 10}s linear infinite;
    z-index: 1;
  `;

  container.appendChild(particle);
}

// Create a floating code element
function createCodeElement(container, codeElements) {
  const codeElement = document.createElement("div");

  // Random position
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;

  // Random text
  const text = codeElements[Math.floor(Math.random() * codeElements.length)];

  codeElement.textContent = text;
  codeElement.style.cssText = `
    position: absolute;
    top: ${posY}%;
    left: ${posX}%;
    color: ${Math.random() > 0.5 ? "#00c6ff" : "#ff5c33"};
    font-family: 'JetBrains Mono', monospace;
    font-size: ${Math.random() * 14 + 10}px;
    opacity: ${Math.random() * 0.5 + 0.1};
    animation: float ${Math.random() * 20 + 10}s linear infinite;
    z-index: 2;
  `;

  container.appendChild(codeElement);
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  // Add scrolled class to navbar when scrolled
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    let current = "";

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      window.scrollTo({
        top: targetSection.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        document.querySelector(".navbar-toggler").click();
      }
    });
  });

  // Add animation to mobile menu items
  if (window.innerWidth < 992) {
    const navItems = document.querySelectorAll(".navbar-nav .nav-item");
    navItems.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(20px)";
      item.style.transition = `opacity 0.3s ease ${
        index * 0.1
      }s, transform 0.3s ease ${index * 0.1}s`;
    });

    // Animate menu items when menu opens
    const navbarToggler = document.querySelector(".navbar-toggler");
    navbarToggler.addEventListener("click", () => {
      setTimeout(() => {
        if (navbarCollapse.classList.contains("show")) {
          navItems.forEach((item) => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          });
        } else {
          navItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
          });
        }
      }, 100);
    });
  }
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("active");
    } else {
      backToTopBtn.classList.remove("active");
    }
  });

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Project card hover effects
function initProjectCards() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      const angleY = (e.clientX - cardCenterX) / 15; // Reduced intensity for smoother effect
      const angleX = (cardCenterY - e.clientY) / 15;

      card.style.transform = `translateY(-10px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;

      // Add subtle shadow movement
      const shadowX = (e.clientX - cardCenterX) / 25;
      const shadowY = (e.clientY - cardCenterY) / 25;
      card.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.2)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
      card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
      setTimeout(() => {
        card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      }, 100);
    });

    card.addEventListener("mouseenter", () => {
      card.style.transition = "none";
    });
  });
}

// Project filters
function initProjectFilters() {
  const filterItems = document.querySelectorAll(".filter-item");
  const projectItems = document.querySelectorAll(".project-item");

  if (!filterItems.length || !projectItems.length) return;

  filterItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Remove active class from all filter items
      filterItems.forEach((filter) => {
        filter.classList.remove("active");
      });

      // Add active class to clicked filter item
      this.classList.add("active");

      // Get filter value
      const filterValue = this.getAttribute("data-filter");

      // Filter projects
      projectItems.forEach((project) => {
        if (filterValue === "all" || project.classList.contains(filterValue)) {
          project.style.display = "block";
          setTimeout(() => {
            project.style.opacity = "1";
            project.style.transform = "scale(1)";
          }, 100);
        } else {
          project.style.opacity = "0";
          project.style.transform = "scale(0.8)";
          setTimeout(() => {
            project.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Fix the About section tabs issue by adding this function
function initAboutTabs() {
  const aboutTabs = document.querySelectorAll("#aboutTabs .nav-link");

  aboutTabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all tabs
      aboutTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      // Show the corresponding tab content
      const targetId = this.getAttribute("data-bs-target");
      const tabContents = document.querySelectorAll(
        "#aboutTabsContent .tab-pane"
      );

      tabContents.forEach((content) => {
        content.classList.remove("show", "active");
      });

      document.querySelector(targetId).classList.add("show", "active");
    });
  });
}

// Add this function to initialize the revamped skills section
function initRevampedSkills() {
  // Create particles for each skill card
  const skillCards = document.querySelectorAll(".skill-card");

  // Process each skill card
  skillCards.forEach((card, index) => {
    // Set animation delay based on index
    card.style.setProperty("--i", index);

    // Extract color from style and convert to RGB for rgba usage
    const color = card.style.getPropertyValue("--color") || "#ff5c33";
    const rgb = hexToRgb(color);
    card.style.setProperty("--color-rgb", `${rgb.r}, ${rgb.g}, ${rgb.b}`);

    // Create particles for hover effect
    const particlesContainer = card.querySelector(".skill-particles");
    if (particlesContainer) {
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement("div");
        particle.className = "skill-particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particlesContainer.appendChild(particle);
      }
    }

    // Animate progress bar on scroll
    const progressBar = card.querySelector(".skill-progress-bar");
    if (progressBar) {
      const progress = progressBar.getAttribute("data-progress");

      // Create intersection observer to animate progress bar when visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              progressBar.style.width = `${progress}%`;
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(card);
    }
  });

  // Initialize skill category filtering
  const categoryButtons = document.querySelectorAll(".skill-category-btn");

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      const category = button.getAttribute("data-category");

      // Filter skill cards
      skillCards.forEach((card) => {
        const cardCategories = card.getAttribute("data-category");

        if (category === "all" || cardCategories.includes(category)) {
          card.style.display = "flex";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Initialize floating skills animations
  initFloatingSkills();

  // Initialize skill stats counter
  initSkillStatsCounter();

  // Initialize skills radar chart
  initSkillsRadarChart();
}

// Initialize floating skills animations
function initFloatingSkills() {
  const floatingSkills = document.querySelectorAll(".floating-skill");

  floatingSkills.forEach((skill) => {
    // Add random starting positions
    const randomX = Math.random() * 20 - 10;
    const randomY = Math.random() * 20 - 10;
    skill.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Add click interaction
    skill.addEventListener("click", () => {
      skill.style.color = getRandomColor();
      skill.style.textShadow = `0 0 20px ${skill.style.color}`;

      // Create burst effect
      createBurstEffect(skill);
    });
  });
}

// Create burst effect when clicking floating skills
function createBurstEffect(element) {
  const burstContainer = document.createElement("div");
  burstContainer.className = "burst-container";
  burstContainer.style.position = "absolute";
  burstContainer.style.top = "50%";
  burstContainer.style.left = "50%";
  burstContainer.style.transform = "translate(-50%, -50%)";
  burstContainer.style.pointerEvents = "none";
  burstContainer.style.zIndex = "10";

  element.appendChild(burstContainer);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.className = "burst-particle";
    particle.style.position = "absolute";
    particle.style.width = "5px";
    particle.style.height = "5px";
    particle.style.backgroundColor = element.style.color;
    particle.style.borderRadius = "50%";

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 100 + 50;
    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;

    particle.style.animation = `burstParticle 1s forwards`;
    particle.style.transform = `translate(${x}px, ${y}px)`;
    particle.style.opacity = "0";

    burstContainer.appendChild(particle);
  }

  // Remove burst container after animation
  setTimeout(() => {
    burstContainer.remove();
  }, 1000);
}

// Initialize skill stats counter
function initSkillStatsCounter() {
  const statNumbers = document.querySelectorAll(".stat-number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = Number.parseInt(target.getAttribute("data-count"));
          let count = 0;
          const duration = 2000; // 2 seconds
          const increment = Math.ceil(countTo / (duration / 30)); // Update every 30ms

          const interval = setInterval(() => {
            count += increment;
            if (count >= countTo) {
              clearInterval(interval);
              target.textContent = countTo + "+";
            } else {
              target.textContent = count + "+";
            }
          }, 30);

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((stat) => {
    observer.observe(stat);
  });
}

// Initialize skills radar chart
function initSkillsRadarChart() {
  const ctx = document.getElementById("skillsRadarChart");

  if (!ctx) return;

  // Create radar chart
  const chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Frontend",
        "Backend",
        "Languages",
        "Databases",
        "Tools",
        "UI/UX",
      ],
      datasets: [
        {
          label: "Skill Level",
          data: [90, 80, 85, 75, 85, 75],
          backgroundColor: "rgba(255, 92, 51, 0.2)",
          borderColor: "rgba(255, 92, 51, 1)",
          pointBackgroundColor: "rgba(255, 92, 51, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 92, 51, 1)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
          pointLabels: {
            color: "rgba(255, 255, 255, 0.7)",
            font: {
              size: 12,
            },
          },
          ticks: {
            backdropColor: "transparent",
            color: "rgba(255, 255, 255, 0.5)",
            stepSize: 20,
            max: 100,
            beginAtZero: true,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });

  return chart;
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace("#", "");

  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  // Parse the hex values
  const r = Number.parseInt(hex.substring(0, 2), 16);
  const g = Number.parseInt(hex.substring(2, 4), 16);
  const b = Number.parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

// Get random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Add this function to improve responsiveness
function enhanceResponsiveness() {
  // Handle responsive adjustments based on screen size
  const handleResize = () => {
    const width = window.innerWidth;

    // Adjust 3D elements for mobile
    const techScene = document.querySelector(".tech-3d-scene");
    if (techScene) {
      if (width < 768) {
        // Reduce complexity on mobile
        const renderer = techScene.querySelector("canvas");
        if (renderer) {
          renderer.style.opacity = "0.5"; // Make background less prominent on mobile
        }
      } else {
        const renderer = techScene.querySelector("canvas");
        if (renderer) {
          renderer.style.opacity = "1";
        }
      }
    }

    // Adjust skill cards layout for better mobile view
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach((card) => {
      if (width < 576) {
        card.style.minHeight = "220px"; // Smaller height on mobile
      } else {
        card.style.minHeight = "280px";
      }
    });

    // Adjust hero content for better mobile view
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      if (width < 576) {
        heroContent.style.paddingTop = "80px"; // Add space at top on mobile
      } else {
        heroContent.style.paddingTop = "0";
      }
    }

    // Adjust project cards for better mobile view
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      if (width < 576) {
        const projectImg = card.querySelector(".project-img");
        if (projectImg) {
          projectImg.style.height = "180px"; // Smaller images on mobile
        }
      } else {
        const projectImg = card.querySelector(".project-img");
        if (projectImg) {
          projectImg.style.height = "250px";
        }
      }
    });
  };

  // Run on load and resize
  handleResize();
  window.addEventListener("resize", handleResize);

  // Improve touch interactions for mobile
  const addTouchSupport = () => {
    // Add touch support for skills cube
    const cube = document.querySelector(".skills-cube");
    if (cube) {
      const cubeContainer = document.querySelector(".skills-cube-container");

      let touchStartX, touchStartY;
      let initialRotation = { x: 0, y: 0 };

      cubeContainer.addEventListener("touchstart", (e) => {
        if (!e.touches[0]) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;

        // Get current rotation
        const transform = cube.style.transform;
        const rotateXMatch = transform.match(/rotateX$$([^)]+)$$/);
        const rotateYMatch = transform.match(/rotateY$$([^)]+)$$/);

        initialRotation.x = rotateXMatch ? parseFloat(rotateXMatch[1]) : 0;
        initialRotation.y = rotateYMatch ? parseFloat(rotateYMatch[1]) : 0;

        // Stop animation when starting to touch
        cube.style.animation = "none";
      });

      cubeContainer.addEventListener("touchmove", (e) => {
        if (!e.touches[0]) return;
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;

        const newRotationX = initialRotation.x + deltaY * 0.5;
        const newRotationY = initialRotation.y + deltaX * 0.5;

        cube.style.transform = `rotateX(${newRotationX}deg) rotateY(${newRotationY}deg)`;
      });

      cubeContainer.addEventListener("touchend", () => {
        // Resume animation after touch
        setTimeout(() => {
          cube.style.animation = "rotateCube 20s infinite linear";
          cube.style.transform = "";
        }, 1000);
      });
    }

    // Add touch support for project cards
    const projectCards = document.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.addEventListener("touchstart", () => {
        card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
        card.style.transform = "translateY(-10px) rotateX(0) rotateY(0)";
        card.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
      });

      card.addEventListener("touchend", () => {
        setTimeout(() => {
          card.style.transform = "translateY(0) rotateX(0) rotateY(0)";
          card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
        }, 100);
      });
    });
  };

  addTouchSupport();
}
// Add this code at the end of your script.js file, after all the existing code

// Initialize contact form submission
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")
  const formStatus = document.getElementById("form-status")
  const submitBtn = document.getElementById("submit-btn")

  if (contactForm) {
    // Get all form fields that need validation
    const formFields = contactForm.querySelectorAll('input[required], textarea[required], input[type="email"]')

    // Add minlength attributes to fields
    const nameField = document.getElementById("name")
    const messageField = document.getElementById("message")
    const emailField = document.getElementById("email")
    const phoneField = document.getElementById("phone")

    if (nameField) nameField.setAttribute("minlength", "2")
    if (messageField) messageField.setAttribute("minlength", "5")
    if (phoneField) phoneField.setAttribute("minlength", "10")

    // Add input event listeners to all fields for real-time validation
    formFields.forEach((field) => {
      // Mark as dirty and validate on input (as user types)
      field.addEventListener("input", () => {
        if (!field.classList.contains("dirty")) {
          field.classList.add("dirty")
        }
        validateField(field)
      })

      // Also validate on blur (when user leaves the field)
      field.addEventListener("blur", () => {
        field.classList.add("dirty")
        validateField(field)
      })
    })

    // Handle form submission - REPLACE the existing submit handler
    contactForm.addEventListener("submit", async (e) => {
      // Always prevent default form submission
      e.preventDefault()

      // Mark all fields as dirty
      formFields.forEach((field) => {
        field.classList.add("dirty")
      })

      // Validate all fields
      let isValid = true
      const phoneValue = phoneField.value.trim();
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phoneValue)) {
        phoneField.classList.add("is-invalid");
        phoneField.classList.remove("is-valid");
        phoneField.focus();
        isValid = false;
      } else {
        phoneField.classList.remove("is-invalid");
        phoneField.classList.add("is-valid");
      }
      formFields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false
        }
      })

      // Don't proceed if form is invalid
      if (!isValid) {
        formStatus.innerHTML = '<div class="alert alert-danger">Please fix the errors before submitting.</div>'
        return
      }

      // If validation passes, proceed with form submission
      submitBtn.textContent = "SENDING..."
      submitBtn.disabled = true

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value,
      }

      try {
        // Send data to your Express server
        const response = await fetch("https://new-portfolio-qw7x.onrender.com/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const data = await response.json()

        if (response.ok) {
          // Success message
          formStatus.innerHTML = `<div class="alert alert-success">${data.message || "Message sent successfully!"}</div>`
          contactForm.reset()

          // Reset validation state after successful submission
          formFields.forEach((field) => {
            field.classList.remove("dirty")
            field.classList.remove("is-valid")
            field.classList.remove("is-invalid")
          })
        } else {
          // Error message
          formStatus.innerHTML = `<div class="alert alert-danger">${data.message || "Something went wrong. Please try again."}</div>`
        }
      } catch (error) {
        // Network error
        formStatus.innerHTML = '<div class="alert alert-danger">Network error. Please check your connection.</div>'
        console.error("Error:", error)
      } finally {
        // Reset button
        submitBtn.textContent = "SEND MESSAGE"
        submitBtn.disabled = false
      }
    })
  }
})

// Form validation function
function validateField(field) {
  const invalidFeedback = field.nextElementSibling

  // Reset validation state
  field.classList.remove("is-invalid")
  field.classList.remove("is-valid")

  // Only validate if the field is "dirty" (user has interacted with it)
  if (!field.classList.contains("dirty")) return true

  let errorMessage = ""

  // Check validity
  if (field.validity.valueMissing) {
    errorMessage = `${field.placeholder} is required`
  } else if (field.validity.typeMismatch && field.type === "email") {
    errorMessage = "Please enter a valid email address (include @ symbol)"
  } else if (field.validity.tooShort) {
    errorMessage = `${field.placeholder} must be at least ${field.minLength} characters`
  } else if (field.validity.tooLong) {
    errorMessage = `${field.placeholder} must be less than ${field.maxLength} characters`
  } else if (field.validity.patternMismatch && field.type === "email") {
    errorMessage = "Please enter a valid email address"
  }

  // Update validation state
  if (errorMessage) {
    field.classList.add("is-invalid")
    invalidFeedback.textContent = errorMessage
    return false
  } else {
    field.classList.add("is-valid")
    return true
  }
}
