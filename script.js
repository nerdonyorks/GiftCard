// Gift Box Opening Animation
const giftBox = document.querySelector("#giftBox");
const giftBoxContainer = document.querySelector(".gift-box-container");
const tapToOpen = document.querySelector(".tap-to-open");
const card = document.querySelector(".card");
const introText = document.querySelector(".text-intro");
let isBoxOpened = false;

// Initialize gift box entrance animation
gsap.set(giftBox, { scale: 0, rotation: -180, opacity: 0 });
gsap.set(tapToOpen, { opacity: 0, y: -20 });

// Gift box entrance
gsap.to(giftBox, {
  scale: 1,
  rotation: 0,
  opacity: 1,
  duration: 1.2,
  ease: "back.out(1.7)",
  delay: 0.3
});

// "Tap to Open" text animation
gsap.to(tapToOpen, {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out",
  delay: 0.8
});

// Add floating animation to gift box
gsap.to(giftBox, {
  y: "+=15",
  duration: 2.5,
  ease: "power1.inOut",
  yoyo: true,
  repeat: -1,
  delay: 1.5
});

// Gift box click/tap handler
giftBoxContainer.addEventListener("click", openGiftBox);
giftBoxContainer.addEventListener("touchend", openGiftBox);

function openGiftBox(e) {
  e.preventDefault();
  if (isBoxOpened) return;
  
  isBoxOpened = true;
  
  // Hide "Tap to Open" text
  gsap.to(tapToOpen, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    ease: "power2.in"
  });
  
  // Open the gift box lid
  giftBox.classList.add("opening");
  
  // Animate bow and ribbons
  gsap.to([".bow-left", ".bow-right"], {
    scale: 1.5,
    rotation: 360,
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.2
  });
  
  gsap.to([".ribbon-vertical", ".ribbon-horizontal"], {
    scale: 0.8,
    opacity: 0.5,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.2
  });
  
  // Confetti effect when opening
  setTimeout(() => {
    confetti({
      particleCount: 200,
      spread: 80,
      origin: { y: 0.5 }
    });
  }, 400);
  
  // Show card after box opens with smooth transition
  setTimeout(() => {
    // Smoothly hide gift box
    gsap.to(giftBoxContainer, {
      opacity: 0,
      scale: 0.7,
      y: -30,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        giftBoxContainer.style.display = "none";
      }
    });
    
    // Show card with smooth animation
    card.style.display = "block";
    introText.innerHTML = `Hi You!`;
    
    // Initial state - start from center with smooth fade
    gsap.set(card, { 
      scale: 0.3, 
      opacity: 0, 
      y: 0,
      rotationY: 0,
      rotationX: 0
    });
    
    // Smooth appearance animation
    gsap.to(card, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.2
    });
    
    // Animate intro text smoothly
    gsap.set(introText, { opacity: 0, y: 10 });
    gsap.to(introText, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.8
    });
    
    // Add floating animation to intro text
    gsap.to(introText, {
      y: "+=10",
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.8
    });
    
    // Add gentle breathing effect to card
    gsap.to(card, {
      scale: 1.02,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.5
    });
    
    // Open card automatically after smooth appearance
    setTimeout(() => {
      openCardDirectly();
    }, 1000);
  }, 600);
}

// Open card directly without pull animation
function openCardDirectly() {
  card.classList.add("open");

  // Confetti effect
  confetti({
    particleCount: 300,
    spread: 100,
    origin: { y: 0.6 }
  });

  // Smoothly show content
  gsap.to(".card-content", {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
    delay: 0.2
  });

  // Smoothly show valentine text first
  gsap.set(".valentine-text", { opacity: 0, y: 20, scale: 0.9 });
  gsap.to(".valentine-text", {
    display: "block",
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.2)",
    delay: 0.4
  });

  // Smoothly show buttons with centered animation
  gsap.set(".buttons", { opacity: 0, y: 30, scale: 0.8 });
  gsap.to(".buttons", {
    display: "flex",
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.2)",
    delay: 0.7,
    onComplete: () => {
      // Initialize no button animation after buttons are visible
      initializeNoButtonAnimation();
    }
  });

  // Hide intro text smoothly
  gsap.to(".text-intro", {
    opacity: 0,
    y: -10,
    duration: 0.4,
    ease: "power2.in",
    delay: 0.3,
    onComplete: () => {
      introText.style.display = "none";
    }
  });
}


// Add event listeners for buttons
const yesButton = document.querySelector(".buttons .yes");
const noButtonElement = document.querySelector(".buttons .no");

if (yesButton) {
  yesButton.addEventListener("click", () => {
  const tl = new gsap.timeline();
  
  // Hide buttons and text
  gsap.to(".valentine-text, .buttons", {
    display: "none",
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  });
  
  // Show congrats section with smooth animation
  gsap.set(".valentine-congrats", { opacity: 0, scale: 0.9 });
  gsap.to(".valentine-congrats", {
    display: "flex",
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.2)",
    delay: 0.5
  });
  
  // Expand card smoothly
  tl.to(".card", {
    width: window.innerWidth < 420 ? window.innerWidth : 800,
    height: 540,
    duration: 1,
    ease: "power2.inOut"
  });
  
  // Animate floating hearts
  gsap.set(".floating-heart", { opacity: 0, scale: 0 });
  gsap.to(".floating-heart", {
    opacity: 0.6,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.5)",
    delay: 0.8,
    stagger: 0.15
  });
  
  // Animate content
  gsap.set(".congrats-title", { opacity: 0, y: -30, scale: 0.8 });
  gsap.set(".congrats-message", { opacity: 0, y: 20 });
  gsap.set(".congrats-wish", { opacity: 0, scale: 0.8 });
  
  gsap.to(".congrats-title", {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.5)",
    delay: 1
  });
  
  gsap.to(".congrats-message", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 1.3
  });
  
  gsap.to(".congrats-wish", {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "back.out(1.2)",
    delay: 1.6
  });

  // Confetti effect
  confetti({
    particleCount: 500,
    spread: 150,
    origin: { y: 0.6 }
  });
  
  // Continuous confetti
  setInterval(() => {
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 }
    });
  }, 4000);
  });
}

if (noButtonElement) {
  noButtonElement.addEventListener("click", () => {
  const tl = new gsap.timeline();
  
  // Hide buttons and text
  gsap.to(".valentine-text, .buttons", {
    display: "none",
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  });
  
  // Show sad message with smooth animation
  gsap.set(".valentine-sad", { opacity: 0, scale: 0.8, y: 30 });
  gsap.to(".valentine-sad", {
    display: "block",
    opacity: 1,
    scale: 1,
    y: 0,
    duration: 0.8,
    ease: "back.out(1.2)",
    delay: 0.5
  });
  
  // Expand card smoothly
  tl.to(".card", {
    width: window.innerWidth < 420 ? window.innerWidth : 800,
    height: 540,
    duration: 1,
    ease: "power2.inOut"
  });
  
  // Animate the message text
  gsap.set(".valentine-sad h1", { opacity: 0, y: 20 });
  gsap.to(".valentine-sad h1", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power2.out",
    delay: 1.2
  });
  });
}

// Enhanced "No" button run-away animation
let noButton = null;
let noButtonCurrentTransform = { x: 0, y: 0 };
let isAnimating = false;
let lastMoveTime = 0;
let lastDistance = Infinity;
const PROXIMITY_THRESHOLD = 150; // Distance in pixels to trigger movement
const MOVE_COOLDOWN = 150; // Minimum time between moves (ms) - reduced for faster response

// Initialize "No" button animation when buttons become visible
function initializeNoButtonAnimation() {
  noButton = document.querySelector(".buttons .no");
  if (!noButton) return;

  // Initialize GSAP transform for the no button - ensure it has full control
  gsap.set(noButton, { 
    x: 0, 
    y: 0, 
    rotation: 0, 
    scale: 1,
    clearProps: "all" // Clear any existing transforms
  });
}

function makeNoButtonRun(mouseX, mouseY) {
  // Prevent too frequent movements
  const now = Date.now();
  if (isAnimating || (now - lastMoveTime) < MOVE_COOLDOWN) {
    return;
  }

  // Get current button position
  const buttonRect = noButton.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;
  
  // Calculate direction away from cursor
  const dx = buttonCenterX - mouseX;
  const dy = buttonCenterY - mouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance === 0 || distance > PROXIMITY_THRESHOLD) {
    return; // Too far or same position
  }
  
  // Only move if cursor is getting closer
  if (distance >= lastDistance) {
    lastDistance = distance;
    return;
  }
  lastDistance = distance;
  
  isAnimating = true;
  lastMoveTime = now;
  
  // Normalize direction
  const directionX = dx / distance;
  const directionY = dy / distance;
  
  // Calculate movement distance - move more if cursor is closer
  const minDisplacement = 120;
  const maxDisplacement = 300;
  const closenessFactor = (PROXIMITY_THRESHOLD - distance) / PROXIMITY_THRESHOLD;
  const moveDistance = minDisplacement + (maxDisplacement - minDisplacement) * closenessFactor;
  
  // Calculate new position relative to current transform
  let newX = noButtonCurrentTransform.x + (directionX * moveDistance);
  let newY = noButtonCurrentTransform.y + (directionY * moveDistance);

  // Keep button within reasonable bounds
  const maxOffset = 350;
  newX = Math.max(-maxOffset, Math.min(maxOffset, newX));
  newY = Math.max(-maxOffset, Math.min(maxOffset, newY));

  // Add some random rotation for more fun
  const rotation = (Math.random() - 0.5) * 30;

  // Kill any existing animations first
  gsap.killTweensOf(noButton);
  
  // Animate with bounce effect - faster duration
  gsap.to(noButton, {
    x: newX,
    y: newY,
    rotation: rotation,
    scale: 1.15,
    duration: 0.2,
    ease: "power2.out",
    onComplete: () => {
      gsap.to(noButton, {
        scale: 1,
        rotation: 0,
        duration: 0.15,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
        }
      });
    }
  });

  noButtonCurrentTransform.x = newX;
  noButtonCurrentTransform.y = newY;
}

// Track mouse position globally and check proximity
let lastProximityCheck = 0;
const PROXIMITY_CHECK_INTERVAL = 50; // Check every 50ms for faster response

// Initialize mouse tracking
window.lastMouseX = window.innerWidth / 2;
window.lastMouseY = window.innerHeight / 2;

document.addEventListener("mousemove", (e) => {
  // Track mouse position
  window.lastMouseX = e.clientX;
  window.lastMouseY = e.clientY;
  
  // Throttle proximity checks
  const now = Date.now();
  if (now - lastProximityCheck < PROXIMITY_CHECK_INTERVAL) {
    return;
  }
  lastProximityCheck = now;
  
  // Only check if buttons are visible
  const buttonsContainer = document.querySelector(".buttons");
  if (!buttonsContainer || buttonsContainer.style.display === "none") {
    return;
  }

  // Check if button exists and is visible
  if (!noButton || noButton.offsetParent === null) {
    return;
  }

  const buttonRect = noButton.getBoundingClientRect();
  const buttonCenterX = buttonRect.left + buttonRect.width / 2;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2;
  
  const distance = Math.sqrt(
    Math.pow(e.clientX - buttonCenterX, 2) + 
    Math.pow(e.clientY - buttonCenterY, 2)
  );

  // If cursor is approaching the button (within threshold), make it run
  if (distance < PROXIMITY_THRESHOLD && distance > 40) {
    makeNoButtonRun(e.clientX, e.clientY);
  } else if (distance >= PROXIMITY_THRESHOLD) {
    // Reset distance tracking when cursor moves away
    lastDistance = Infinity;
  }
});

// Also run away on direct mouseover (set up after button is available)
document.addEventListener("click", function setupNoButtonEvents() {
  const noBtn = document.querySelector(".buttons .no");
  if (noBtn && !noBtn.hasAttribute("data-events-setup")) {
    noBtn.setAttribute("data-events-setup", "true");
    noBtn.addEventListener("mouseenter", (e) => {
      makeNoButtonRun(e.clientX, e.clientY);
    });
  }
}, { once: false });

// Reset position when mouse leaves the button area completely
const buttonsContainer = document.querySelector(".buttons");
let resetTimeout;

if (buttonsContainer) {
  buttonsContainer.addEventListener("mouseleave", () => {
  // Small delay before resetting to allow for re-entry
  clearTimeout(resetTimeout);
  resetTimeout = setTimeout(() => {
    const buttonRect = noButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    const mouseX = window.lastMouseX || 0;
    const mouseY = window.lastMouseY || 0;
    const distance = Math.sqrt(
      Math.pow(mouseX - buttonCenterX, 2) + 
      Math.pow(mouseY - buttonCenterY, 2)
    );
    
    // Only reset if mouse is far away and button has moved
    if (noButton && distance > PROXIMITY_THRESHOLD * 2 && (noButtonCurrentTransform.x !== 0 || noButtonCurrentTransform.y !== 0)) {
      gsap.killTweensOf(noButton);
      gsap.to(noButton, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          noButtonCurrentTransform = { x: 0, y: 0 };
          lastDistance = Infinity;
        }
      });
    }
  }, 1000);
  });
}