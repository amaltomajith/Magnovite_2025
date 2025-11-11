if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
  try {
    if (window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }

    // Hint GSAP to use GPU where possible to avoid wobble
    if (window.gsap && typeof window.gsap.defaults === 'function') {
      window.gsap.defaults({ force3D: true });
    }

    // Wait for video to be ready before starting animations
    function waitForVideoAndStartAnimations() {
      const video = document.querySelector('.hero-main-image');
      
      // If video is already ready, start animations immediately
      if (video && video.readyState >= 4) {
        startAnimations();
        return;
      }
      
      // Otherwise, wait for video to be ready
      if (video) {
        const checkVideoReady = () => {
          if (video.readyState >= 4) {
            console.log('Video ready for scroll animations');
            startAnimations();
          } else {
                // Check again in 100ms
                setTimeout(checkVideoReady, 100);
          }
        };
        
        // Start checking after a short delay
        setTimeout(checkVideoReady, 200);
        
        // Fallback: start animations after 3 seconds regardless
        setTimeout(() => {
          console.log('Starting animations - video timeout fallback');
          startAnimations();
        }, 3000);
      } else {
        // No video, start animations immediately
        startAnimations();
      }
    }

    function startAnimations() {
      // First step
      window.gsap.from(".hero-main-container", {
        scale: 1.45,
        duration: 2.8,
        ease: "power3.out",
      });

      window.gsap.to(".overlay", {
        opacity: 0,
        duration: 2.8,
        ease: "power3.out",
        onComplete: () => {
          document.body.style.overflow = "visible";
          document.body.style.overflowX = "hidden";
        },
      });
    }

    // Start the animation process
    waitForVideoAndStartAnimations();

    // Scroll Indicator
    const scrollIndicator = document.querySelector(".scroll-indicator");
    const bounceTimeline = window.gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    bounceTimeline.to(scrollIndicator, {
      y: 20,
      opacity: 0.3,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Hide scroll indicator when scrolling starts
    let hasScrolled = false;
    window.addEventListener('scroll', () => {
      if (!hasScrolled) {
        hasScrolled = true;
        window.gsap.to(scrollIndicator, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (scrollIndicator) scrollIndicator.style.display = 'none';
          }
        });
      }
    });

    // Create a timeline for better control
    const tl = window.gsap.timeline({
      scrollTrigger: {
        trigger: ".container",
        scrub: 2.2, // slightly slower scrub for longer presence
        pin: true,
        start: "top top",
        end: "+=2300", // revert to original distance; content after pin flows normally
        ease: "none",
      },
    });

    // Need to ensure that the scale is like this otherwise some flicks happens
    tl.set(".hero-main-container", { scale: 1.25, transformOrigin: "50% 50% 0" });
    tl.to(".hero-main-container", { scale: 1, duration: 1, transformOrigin: "50% 50% 0" });
    tl.to(
      ".hero-main-logo",
      { opacity: 0, duration: 0.5, transformOrigin: "50% 50% 0" },
      "<"
    );
    tl.to(
      ".hero-main-image",
      { opacity: 0, duration: 0.9 },
      "<+=0.5"
    );
    tl.to(
      ".hero-main-container",
      { backgroundSize: "28vh", duration: 1.5 },
      "<+=0.2"
    );
    tl.fromTo(
      ".hero-text",
      { backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` },
      { backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, duration: 3 },
      "<1.2"
    );
    tl.fromTo(
      ".hero-tagline",
      { 
        opacity: 0, 
        y: 30,
        backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` 
      },
      { 
        opacity: 1, 
        y: 0,
        backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, 
        duration: 3 
      },
      "<0.2"
    );
    tl.fromTo(
      ".hero-text-logo",
      { opacity: 0, maskImage: `radial-gradient(circle at 50% 145.835%, rgb(0, 0, 0) 36.11%, rgba(0, 0, 0, 0) 68.055%)` },
      { opacity: 1, maskImage: `radial-gradient(circle at 50% 105.594%, rgb(0, 0, 0) 62.9372%, rgba(0, 0, 0, 0) 81.4686%)`, duration: 3 },
      "<0.2"
    );
    // Fade out the introducing.png background as the MAGNOVITE logo/text come in
    tl.to(
      ".hero-main-container",
      { opacity: 0, duration: 0.6 },
      "<"
    );
    tl.set(".hero-main-container", { opacity: 0 });
    tl.to(".hero-1-container", { scale: 0.85, duration: 3 }, "<-=3");
    tl.set(
      ".hero-1-container",
      { maskImage: `radial-gradient(circle at 50% 16.1137vh, rgb(0, 0, 0) 96.1949vh, rgba(0, 0, 0, 0) 112.065vh)` },
      "<+=2.1"
    );
    tl.to(
      ".hero-1-container",
      { maskImage: `radial-gradient(circle at 50% -40vh, rgb(0, 0, 0) 0vh, rgba(0, 0, 0, 0) 80vh)`, duration: 2 },
      "<+=0.2"
    );
    tl.to(
      ".hero-text-logo",
      { opacity: 0, duration: 2 },
      "<1.5"
    );
    tl.set(".hero-1-container", { opacity: 0 });
    tl.set(".hero-2-container", { visibility: "visible" });
    tl.to(".hero-2-container", { opacity: 1, duration: 3 }, "<+=0.2");
    tl.fromTo(
      ".hero-2-container",
      { backgroundImage: `radial-gradient(
            circle at 50% 200vh,
            rgba(255, 214, 135, 0) 0,
            rgba(157, 47, 106, 0.5) 90vh,
            rgba(157, 47, 106, 0.8) 120vh,
            rgba(32, 31, 66, 0) 150vh
          )` },
      { backgroundImage: `radial-gradient(circle at 50% 3.9575vh,
          rgb(210, 180, 255) 0vh,
          rgb(160, 120, 255) 50.011vh,
          rgb(80, 140, 255) 90.0183vh,
          rgba(32, 31, 66, 0) 140.599vh)`, duration: 3 },
      "<1.2"
    );
    // Animate YouTube play button to appear smoothly with the description
    tl.set(".youtube-play-button", { opacity: 0, y: 20 });
    tl.to(".youtube-play-button", { 
      opacity: 1, 
      y: 0, 
      duration: 1.5, 
      ease: "power2.out" 
    }, "<+=0.3");
    // Content after the pinned scroll (e.g., Masala Coffee section, promo video) flows normally
  } catch (err) {
    // no-op on pages without GSAP/ScrollTrigger
  }
}

// Main video modal logic
const mainVideo = document.querySelector('.hero-main-image');
const videoModal = document.getElementById('videoModal');
const mainVideoModal = document.getElementById('mainVideoModal');
const videoCloseBtn = document.querySelector('.video-modal__close');

// Store original scroll position for mobile
let originalScrollPosition = 0;

// Main video modal functions
function openVideoModal() {
  if (!videoModal) return;
  
  // Store current scroll position for mobile return
  originalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Mobile: Fullscreen landscape mode
    videoModal.style.position = 'fixed';
    videoModal.style.top = '0';
    videoModal.style.left = '0';
    videoModal.style.width = '100vw';
    videoModal.style.height = '100vh';
    videoModal.style.background = '#000';
    videoModal.style.zIndex = '9999';
    videoModal.style.padding = '0';
    videoModal.style.alignItems = 'center';
    videoModal.style.justifyContent = 'center';
  } else {
    // Desktop: Position 10cm above current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const videoTop = Math.max(0, scrollTop - 100);
    
    videoModal.style.alignItems = 'flex-start';
    videoModal.style.paddingTop = '0';
    videoModal.style.top = `${videoTop}px`;
    videoModal.style.background = 'transparent';
  }
  
  videoModal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  
  if (mainVideoModal) {
    mainVideoModal.currentTime = 0;
    mainVideoModal.play().catch(() => {});
    updatePlayPauseButton();
  }
}

function closeVideoModal() {
  if (!videoModal) return;
  videoModal.classList.remove('is-open');
  document.body.style.overflow = 'visible';
  
  // Check if mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Mobile: Return to original scroll position
    window.scrollTo(0, originalScrollPosition);
    
    // Reset mobile styles
    videoModal.style.position = 'fixed';
    videoModal.style.top = '0';
    videoModal.style.left = '0';
    videoModal.style.width = '100vw';
    videoModal.style.height = '100vh';
    videoModal.style.background = 'transparent';
    videoModal.style.zIndex = '2000';
    videoModal.style.padding = '';
  } else {
    // Desktop: Reset video position
    videoModal.style.alignItems = 'flex-start';
    videoModal.style.paddingTop = '0';
    videoModal.style.top = '0';
    videoModal.style.background = 'transparent';
  }
  
  if (mainVideoModal) {
    mainVideoModal.pause();
  }
}

// Custom video controls
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeDisplay = document.getElementById('timeDisplay');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

function updatePlayPauseButton() {
  if (!mainVideoModal || !playIcon || !pauseIcon) return;
  
  if (mainVideoModal.paused) {
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
  } else {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }
}

function updateProgress() {
  if (!mainVideoModal || !progressFill || !timeDisplay) return;
  
  const progress = (mainVideoModal.currentTime / mainVideoModal.duration) * 100;
  progressFill.style.width = `${progress}%`;
  
  const currentTime = formatTime(mainVideoModal.currentTime);
  const duration = formatTime(mainVideoModal.duration);
  timeDisplay.textContent = `${currentTime} / ${duration}`;
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function seekVideo(e) {
  if (!mainVideoModal || !progressBar) return;
  
  const rect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const percentage = clickX / rect.width;
  const newTime = percentage * mainVideoModal.duration;
  
  mainVideoModal.currentTime = newTime;
}

// Event listeners for custom controls
if (playPauseBtn && mainVideoModal) {
  playPauseBtn.addEventListener('click', () => {
    if (mainVideoModal.paused) {
      mainVideoModal.play();
    } else {
      mainVideoModal.pause();
    }
    updatePlayPauseButton();
  });
}

if (progressBar && mainVideoModal) {
  progressBar.addEventListener('click', seekVideo);
}

if (mainVideoModal) {
  mainVideoModal.addEventListener('play', updatePlayPauseButton);
  mainVideoModal.addEventListener('pause', updatePlayPauseButton);
  mainVideoModal.addEventListener('timeupdate', updateProgress);
  mainVideoModal.addEventListener('loadedmetadata', updateProgress);
}

// Disable opening modal from the hero background video to avoid showing playback/pause UI
// Intentionally do not attach any click handler on the hero video
if (mainVideo) {
  mainVideo.style.cursor = 'default';
}

// Add modal event handlers
if (videoModal) {
  videoModal.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    // Close when clicking on elements marked with data-close (including their children)
    if (target.closest('[data-close]')) {
      closeVideoModal();
      return;
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });
}

if (videoCloseBtn) {
  videoCloseBtn.addEventListener('click', closeVideoModal);
}

// Handle Android back button on mobile
if (videoModal) {
  // Listen for popstate (back button) on mobile
  window.addEventListener('popstate', function(event) {
    if (videoModal.classList.contains('is-open')) {
      closeVideoModal();
    }
  });
  
  // Add history state when opening video on mobile
  const originalOpenVideoModal = openVideoModal;
  openVideoModal = function() {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // Push state to history for back button support
      history.pushState({videoOpen: true}, '', '');
    }
    originalOpenVideoModal();
  };
}

// Gallery Lightbox (only runs on gallery page)
const galleryGrid = document.querySelector('.gallery-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxPrev = document.querySelector('.lightbox__prev');
const lightboxNext = document.querySelector('.lightbox__next');

let galleryImages = [];
let currentIndex = -1;

let currentScale = 1;
let originX = 0;
let originY = 0;
let isPanning = false;
let panStartX = 0;
let panStartY = 0;

function resetLightboxTransforms() {
  currentScale = 1;
  originX = 0;
  originY = 0;
  if (lightboxImg) {
    lightboxImg.style.transform = `translate(0px, 0px) scale(1)`;
  }
}

function openLightboxByIndex(index) {
  if (!lightbox || !lightboxImg) return;
  if (!galleryImages.length) return;
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
  resetLightboxTransforms();
  lightbox.classList.add('is-active');
  // allow CSS transitions to catch
  requestAnimationFrame(() => lightbox.classList.add('is-open'));
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('is-open');
  // wait for transition to finish before fully hiding
  setTimeout(() => {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = 'visible';
  }, 220);
}

if (galleryGrid && lightbox && lightboxImg) {
  galleryImages = Array.from(document.querySelectorAll('.gallery-img'));

  const openFromTarget = (target) => {
    if (!(target instanceof Element)) return;
    const imgEl = target.closest('.gallery-img');
    if (imgEl && imgEl instanceof HTMLImageElement) {
      const idx = galleryImages.indexOf(imgEl);
      if (idx !== -1) openLightboxByIndex(idx);
    }
  };

  galleryGrid.addEventListener('click', (e) => {
    const target = e.target;
    openFromTarget(target);
  });

  // Support touch taps and stylus
  galleryGrid.addEventListener('pointerup', (e) => {
    // ignore if it was a drag/scroll; quick taps only
    if (e.pointerType === 'mouse') return; // mouse handled by click
    openFromTarget(e.target);
  });

  // Keyboard accessibility
  galleryGrid.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    openFromTarget(e.target);
  });

  lightbox.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.closest('[data-close]')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') {
      openLightboxByIndex(currentIndex + 1);
    }
    if (e.key === 'ArrowLeft') {
      openLightboxByIndex(currentIndex - 1);
    }
  });

  // Zoom with wheel
  lightboxImg.addEventListener('wheel', (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    const step = 0.15;
    const nextScale = Math.min(4, Math.max(1, currentScale - delta * step));
    currentScale = nextScale;
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  }, { passive: false });

  // Click to toggle zoom centered on click point
  lightboxImg.addEventListener('click', (e) => {
    const rect = lightboxImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    if (currentScale <= 1.01) {
      const targetScale = 2.5;
      originX = cx - targetScale * x;
      originY = cy - targetScale * y;
      currentScale = targetScale;
      lightboxImg.style.cursor = 'grabbing';
    } else {
      currentScale = 1;
      originX = 0;
      originY = 0;
      lightboxImg.style.cursor = 'grab';
    }
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  });

  // Drag to pan when zoomed
  lightboxImg.addEventListener('mousedown', (e) => {
    if (currentScale <= 1) return;
    isPanning = true;
    panStartX = e.clientX - originX;
    panStartY = e.clientY - originY;
    lightboxImg.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isPanning) return;
    originX = e.clientX - panStartX;
    originY = e.clientY - panStartY;
    lightboxImg.style.transform = `translate(${originX}px, ${originY}px) scale(${currentScale})`;
  });

  window.addEventListener('mouseup', () => {
    isPanning = false;
    lightboxImg.style.cursor = 'grab';
  });

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => openLightboxByIndex(currentIndex + 1));
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => openLightboxByIndex(currentIndex - 1));
  }
}
