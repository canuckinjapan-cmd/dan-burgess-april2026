document.addEventListener('DOMContentLoaded', () => {
    // 1. Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Floating Logo Animation
    const floatingLogo = document.getElementById('floating-logo');
    const secondaryLogo = document.getElementById('secondary-logo');
    const heroTarget = document.querySelector('.hero-logo-target');
    const headerTarget = document.querySelector('.header-logo-target');
    const textDanburgess = floatingLogo.querySelector('.text-danburgess');
    const textDesign = floatingLogo.querySelector('.text-design');
    const textDesignMask = floatingLogo.querySelector('.text-design-mask');
    const logoImg = floatingLogo.querySelector('.logo-img');
    const logoText = floatingLogo.querySelector('.logo-text');

    function updateLogoPosition() {
        if (!heroTarget || !headerTarget) return;

        const isJapanese = document.documentElement.lang === 'ja';
        const isMobilePortrait = window.innerWidth <= 600 && window.innerHeight >= window.innerWidth;
        const isTabletPortrait = window.innerWidth > 600 && window.innerWidth <= 1024 && window.innerHeight >= window.innerWidth;
        const isMobileLandscape = window.innerHeight <= 500 && window.innerWidth > window.innerHeight;
        const isMobile = window.innerWidth <= 768 || isMobileLandscape;
        const scrollY = window.scrollY;

        // Secondary logo animation (opposite language)
        if (secondaryLogo) {
            // Slide off quickly as we scroll
            const slideProgress = Math.min(scrollY / 200, 1);
            secondaryLogo.style.transform = `translateX(${-120 * slideProgress}%)`;
            secondaryLogo.style.opacity = 1 - slideProgress;
        }

        // Adjust this value to change how far you need to scroll before the animation completes.
        // A larger number means the animation takes longer to finish (slower).
        const maxScroll = 400;

        let linearProgress = Math.min(scrollY / maxScroll, 1);

        // Easing function to make the animation start and end smoothly.
        // Currently using a standard "ease-in-out" sine curve.
        // For a more dramatic ease, you could try: let progress = Math.pow(linearProgress, 2) * (3 - 2 * linearProgress);
        // Or for a simple linear animation (no easing): let progress = linearProgress;
        let progress = Math.pow(linearProgress, 2) * (3 - 2 * linearProgress);

        const heroRect = heroTarget.getBoundingClientRect();
        const headerRect = headerTarget.getBoundingClientRect();

        // Hero state
        let heroLogoSize = 240;
        let heroLogoOffsetY = 0; // Align top of logo with top of text
        let heroFontSizeDan = 96;
        let heroFontSizeDesign = 180;
        let heroDesignY = 76;

        if (isJapanese) {
            heroFontSizeDan = 96;
            heroFontSizeDesign = 164; // Reduced from 168 to match ダンバージェス width
            heroDesignY = 85;
        }

        if (isMobilePortrait) {
            heroLogoSize = 0; // Hide logo in portrait
            heroLogoOffsetY = 0;
            if (isJapanese) {
                heroFontSizeDan = 49;
                heroFontSizeDesign = 83; // Reduced from 86
                heroDesignY = 48;
            } else {
                heroFontSizeDan = 49;
                heroFontSizeDesign = 93;
                heroDesignY = 45;
            }
        } else if (isTabletPortrait) {
            heroLogoSize = 150;
            heroLogoOffsetY = 0;
            if (isJapanese) {
                heroFontSizeDan = 60;
                heroFontSizeDesign = 101; // Reduced from 105
                heroDesignY = 60;
            } else {
                heroFontSizeDan = 60;
                heroFontSizeDesign = 112;
                heroDesignY = 55;
            }
        } else if (isMobileLandscape) {
            heroLogoSize = 125; // Adjust logo size for mobile landscape here
            heroLogoOffsetY = 10; // Adjust vertical position for mobile landscape here
            if (isJapanese) {
                heroFontSizeDan = 49;
                heroFontSizeDesign = 83; // Reduced from 86
                heroDesignY = 48;
            } else {
                heroFontSizeDan = 49;
                heroFontSizeDesign = 93;
                heroDesignY = 45;
            }
        }
        const heroDesignX = 0;

        // Header state
        let headerLogoSize = 40;
        const headerLogoOffsetY = 0;
        let headerFontSize = 28.8; // 24 * 1.2
        const headerDesignY = 0;

        if (isMobilePortrait || isTabletPortrait) {
            headerLogoSize = 30;
            headerFontSize = 24.48;
        }

        // Interpolate sizes first so we can measure width
        const currentLogoSize = heroLogoSize - (heroLogoSize - headerLogoSize) * progress;
        const currentLogoOffsetY = heroLogoOffsetY - (heroLogoOffsetY - headerLogoOffsetY) * progress;
        const currentFontSizeDan = heroFontSizeDan - (heroFontSizeDan - headerFontSize) * progress;
        const currentFontSizeDesign = heroFontSizeDesign - (heroFontSizeDesign - headerFontSize) * progress;

        logoImg.style.width = `${currentLogoSize}px`;
        logoImg.style.height = `${currentLogoSize}px`;
        logoImg.style.transform = `translateY(${currentLogoOffsetY}px)`;
        logoImg.style.opacity = isMobilePortrait && progress < 0.1 ? 0 : 1;
        logoImg.style.display = isMobilePortrait && progress === 0 ? 'none' : 'block';

        textDanburgess.style.fontSize = `${currentFontSizeDan}px`;
        textDesign.style.fontSize = `${currentFontSizeDesign}px`;

        // Measure danWidth for X translation
        const danWidth = textDanburgess.offsetWidth;
        const headerDesignX = danWidth;

        const currentDesignY = heroDesignY - (heroDesignY - headerDesignY) * progress;
        const currentDesignX = heroDesignX - (heroDesignX - headerDesignX) * progress;
        
        if (textDesignMask) {
            textDesignMask.style.transform = `translate(${currentDesignX}px, ${currentDesignY}px)`;
            textDesign.style.transform = 'none';
        } else {
            textDesign.style.transform = `translate(${currentDesignX}px, ${currentDesignY}px)`;
        }

        // Calculate text block height for perfect vertical centering
        const heroTextHeight = heroDesignY + heroFontSizeDesign * 1.1; // Increased from 0.72 to prevent clipping
        const headerTextHeight = headerFontSize;
        const currentTextHeight = heroTextHeight - (heroTextHeight - headerTextHeight) * progress;

        // Set logoText height so it centers properly with the logo
        if (logoText) {
            logoText.style.height = `${currentTextHeight}px`;
            logoText.style.width = `${Math.max(danWidth, textDesign.offsetWidth)}px`;
        }

        // Calculate total width of the logo block for centering in hero
        const totalHeroWidth = heroLogoSize + (isMobilePortrait ? 0 : 20) + Math.max(danWidth, textDesign.offsetWidth);

        const heroX = heroRect.left + (heroRect.width / 2) - (totalHeroWidth / 2);
        const heroY = heroRect.top + scrollY + (heroRect.height / 2) - (Math.max(currentLogoSize, currentTextHeight) / 2);

        const headerX = headerRect.left;
        const headerY = headerRect.top + scrollY;

        const currentX = heroX - (heroX - headerX) * progress;
        const currentY = (heroY - scrollY) - ((heroY - scrollY) - headerRect.top) * progress;

        floatingLogo.style.left = `${currentX}px`;
        floatingLogo.style.top = `${currentY}px`;

        const startGap = isMobilePortrait ? 0 : 20;
        const endGap = isMobilePortrait ? 4 : 10;
        const currentGap = startGap - (startGap - endGap) * progress;
        floatingLogo.style.gap = `${currentGap}px`;
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateLogoPosition);
    });

    // Initial call
    updateLogoPosition();

    // After entry animation is done, allow overflow for scroll
    setTimeout(() => {
        document.querySelectorAll('.hero-entry-mask').forEach(mask => {
            mask.classList.add('animation-finished');
        });
    }, 2500);

    // Recalculate on resize
    window.addEventListener('resize', updateLogoPosition);

    // 3. Portfolio Scale Effect & Services Sticky Scale
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const serviceCards = document.querySelectorAll('.service-card');

    function handleScrollEffects() {
        // Portfolio Scale
        portfolioItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            // When top of item goes above top of viewport
            if (rect.top < 0) {
                // Increased scaling effect to appear as moving into the distance
                const scale = Math.max(0.7, 1 + (rect.top * 0.0006));
                const opacity = Math.max(0.4, 1 + (rect.top * 0.0008));
                item.style.transform = `scale(${scale})`;
                item.style.opacity = opacity.toString();
            } else {
                item.style.transform = `scale(1)`;
                item.style.opacity = '1';
            }
        });

        // Services Scroll-Linked Animation
        const servicesContainer = document.querySelector('.services-container');
        if (servicesContainer) {
            const containerRect = servicesContainer.getBoundingClientRect();
            // How far from the top of viewport (offset by sticky point)
            const scrollOffset = -(containerRect.top - 120);
            const totalHeight = containerRect.height;
            
            // Total window for each card's animation
            // Using 1.2 * windowHeight to add a "delay" between card animations
            const stride = window.innerHeight * 1.1; 
            const activeRange = window.innerHeight * 0.9; // Card slides in during 90% of the stride
            
            serviceCards.forEach((card, index) => {
                // Each card starts its animation sequence at stride * index
                const start = index * stride;
                
                // Progress of THIS card's slide-in phase (0 to 1)
                let progress = (scrollOffset - start) / activeRange;
                progress = Math.max(0, Math.min(1, progress));
                
                // Ease out (deceleration) for a smooth "landing" at the right edge
                const easedProgress = 1 - Math.pow(1 - progress, 1.6);
                
                // 1. Calculate Translate X (-101% to 0%)
                const translateX = -101 + (easedProgress * 101);
                
                // 2. Calculate Opacity
                const opacity = Math.min(1, progress * 5); // very quick fade in
                
                // 3. Calculate Scale (based on NEXT card starting to slide)
                let scale = 1;
                if (index < serviceCards.length - 1) {
                    const nextStart = (index + 1) * stride;
                    let nextProgress = (scrollOffset - nextStart) / activeRange;
                    nextProgress = Math.max(0, Math.min(1, nextProgress));
                    // Scale down to 0.95 as the next card slides in
                    scale = 1 - (nextProgress * 0.05);
                }
                
                // Apply styles directly
                card.style.transform = `translate3d(${translateX}%, 0, 0) scale(${scale})`;
                card.style.opacity = opacity.toString();
                card.style.zIndex = (index + 10).toString();
            });
        }
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(handleScrollEffects);
    });
    handleScrollEffects();
    // 4. Intersection Observers for Animations (Split Reveal, Stagger Up, Roots Line)
    const animatedElements = document.querySelectorAll('.split-reveal, .stagger-up, .roots-line');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { 
            threshold: 0, 
            rootMargin: '100px 100% 100px 100%' // Allow detecting elements up to 100% of viewport width off-screen
        }); 
        animatedElements.forEach(el => observer.observe(el));
    }
    const processLogoContainers = document.querySelectorAll('.process-logo-container');
    if (processLogoContainers.length > 0) {
        const logoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('swapped');
                } else {
                    entry.target.classList.remove('swapped');
                }
            });
        }, { threshold: 0.8 }); // Lowered threshold slightly just in case 0.95 is too strict on some screens
        
        processLogoContainers.forEach(container => logoObserver.observe(container));
    }

    // 6. Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 7. Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // For the About section, we want to scroll to the very top of the section
                // to ensure Card 1 is displayed in its initial state.
                const offsetTop = targetElement.offsetTop;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it
                if (typeof mobileMenuOverlay !== 'undefined' && mobileMenuOverlay.classList.contains('active')) {
                    mobileMenuOverlay.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // 6. Contact Form AJAX Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');

            const isJapanese = document.documentElement.lang === 'ja';
            submitBtn.textContent = isJapanese ? '送信中...' : 'SENDING...';
            submitBtn.disabled = true;

            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(data => {
                    formStatus.textContent = data;
                    formStatus.style.color = 'green';
                    contactForm.reset();
                    submitBtn.textContent = isJapanese ? '送信' : 'SEND MESSAGE';
                    submitBtn.disabled = false;
                })
                .catch(error => {
                    formStatus.textContent = isJapanese ? 'エラーが発生しました。もう一度お試しください。' : 'An error occurred. Please try again.';
                    formStatus.style.color = 'red';
                    submitBtn.textContent = isJapanese ? '送信' : 'SEND MESSAGE';
                    submitBtn.disabled = false;
                });
        });
    }

    // 7. Hamburger Menu
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
    const header = document.getElementById('header');

    if (hamburgerBtn && mobileMenuOverlay) {
        let scrollPosOnOpen = 0;
        const toggleMenu = () => {
            const isOpen = mobileMenuOverlay.classList.contains('open');
            if (!isOpen) {
                mobileMenuOverlay.style.top = `${window.scrollY}px`;
                scrollPosOnOpen = window.scrollY;
            }
            hamburgerBtn.classList.toggle('open');
            mobileMenuOverlay.classList.toggle('open');
            if (header) header.classList.toggle('menu-open');
            if (floatingLogo) floatingLogo.classList.toggle('menu-open');
        };

        hamburgerBtn.addEventListener('click', toggleMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuOverlay.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        // Close menu on scroll
        window.addEventListener('scroll', () => {
            if (mobileMenuOverlay.classList.contains('open')) {
                const currentScroll = window.scrollY;
                if (Math.abs(currentScroll - scrollPosOnOpen) > 30) {
                    toggleMenu();
                }
            }
        }, { passive: true });
    }

    // 8. Matrix Digital Rain (Canvas)
    const matrixCanvases = document.querySelectorAll('.matrix-canvas');

    matrixCanvases.forEach(canvas => {
        const context = canvas.getContext('2d');
        const parent = canvas.parentElement;

        // Use ResizeObserver to keep canvas size in sync with its container
        const resizeObserver = new ResizeObserver(() => {
            canvas.width = parent.offsetWidth;
            canvas.height = parent.offsetHeight;
            initRain();
        });
        resizeObserver.observe(parent);

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        let columns = 0;
        let rainDrops = [];

        function initRain() {
            columns = Math.floor(canvas.width / fontSize);
            rainDrops = [];
            for (let x = 0; x < columns; x++) {
                rainDrops[x] = Math.random() * -100; // Randomize start positions
            }
        }

        const draw = () => {
            // Faint trail effect
            context.fillStyle = 'rgba(2, 2, 2, 0.05)';
            context.fillRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = '#ff6c03'; // Brighter Orange
            context.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(draw, 38);
    });

    // 9. Responsive Portfolio Images
    const responsiveItems = document.querySelectorAll('.portfolio-item[data-pc-e]');

    function updatePortfolioImages() {
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1024;
        const isLandscape = window.innerWidth > window.innerHeight;

        responsiveItems.forEach(item => {
            let mainKey = 'pc-e';
            let overlayKey = 'pc-j';

            if (isMobile) {
                if (isLandscape) {
                    mainKey = 'mobile-h-e';
                    overlayKey = 'mobile-h-j';
                } else {
                    mainKey = 'mobile-p-e';
                    overlayKey = 'mobile-p-j';
                }
            } else if (isTablet) {
                if (isLandscape) {
                    mainKey = 'tablet-h-e';
                    overlayKey = 'tablet-h-j';
                } else {
                    mainKey = 'tablet-p-e';
                    overlayKey = 'tablet-p-j';
                }
            } else {
                mainKey = 'pc-e';
                overlayKey = 'pc-j';
            }

            const mainImg = item.querySelector('.main-image');
            const overlayImg = item.querySelector('.overlay-image');

            if (mainImg) mainImg.src = item.getAttribute(`data-${mainKey}`);
            if (overlayImg) overlayImg.src = item.getAttribute(`data-${overlayKey}`);
        });
    }

    if (responsiveItems.length > 0) {
        window.addEventListener('resize', updatePortfolioImages);
        updatePortfolioImages();

        responsiveItems.forEach(item => {
            item.addEventListener('click', () => {
                const isJapanese = localStorage.getItem('lang_pref') === 'ja' || window.location.pathname.includes('-j.html');
                const link = isJapanese ? item.getAttribute('data-link-j') : item.getAttribute('data-link-e');
                if (link) {
                    window.open(link, '_blank');
                }
            });
        });
    }

    // 6. About Section Card Stacking Animation
    function initAboutCardStacking() {
        const aboutSection = document.querySelector('.about');
        const aboutCards = document.querySelectorAll('.about-card');
        const aboutButton = document.querySelector('.btn-about');
        if (!aboutSection || !aboutCards.length) return;

        function updateCards() {
            const rect = aboutSection.getBoundingClientRect();
            const scrollHeight = aboutSection.offsetHeight - window.innerHeight;
            const scrollTop = Math.min(Math.max(-rect.top, 0), scrollHeight);
            const progress = scrollTop / scrollHeight;

            // Get sticky positions from CSS computed styles
            const cardWrapper = document.querySelector('.about-card-wrapper');
            const stickyTop = cardWrapper ? parseInt(window.getComputedStyle(cardWrapper).top) : 160;
            
            const aboutBtn = document.querySelector('.btn-about');
            const buttonStickyTop = aboutBtn ? parseInt(window.getComputedStyle(aboutBtn).top) : 80;

            aboutCards.forEach((card, i) => {
                // We use 5 ranges for 3 cards to create a long "pause" at the end
                // Range 0: Card 1 active
                // Range 1: Card 2 slides on top of Card 1
                // Range 2: Card 3 slides on top of Card 2
                // Range 3-4: All cards stay in place (pause)
                const numRanges = aboutCards.length + 2; 
                const start = i / numRanges;
                const end = (i + 1) / numRanges;

                let localProgress = (progress - start) / (end - start);
                localProgress = Math.min(Math.max(localProgress, 0), 1);

                // 1. Handle Active State (Color Change) and Visibility
                // Delay the transition to grey: stay white until the next card is 70% over it
                const nextStart = (i + 1) / numRanges;
                const colorThreshold = nextStart + (1 / numRanges) * 0.7; 
                const isLastCard = i === aboutCards.length - 1;
                
                if (progress >= start && (isLastCard || progress < colorThreshold)) {
                    card.classList.add('is-active');
                    card.classList.remove('is-stacked');
                    card.style.opacity = "1";
                    card.style.visibility = "visible";
                } else if (progress >= colorThreshold) {
                    // Card is now underneath the next one
                    card.classList.remove('is-active');
                    card.classList.add('is-stacked');
                    
                    // Fade out completely when the next card is fully there to prevent "peeking"
                    // We start fading at colorThreshold and finish by the time the next card is fully settled
                    const fadeOutStart = colorThreshold;
                    const fadeOutEnd = nextStart + (1 / numRanges); 
                    
                    let opacity = 1;
                    if (progress > fadeOutStart) {
                        opacity = 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
                    }
                    card.style.opacity = Math.max(0, opacity).toString();
                    card.style.visibility = opacity <= 0 ? "hidden" : "visible";
                } else {
                    // Card hasn't reached its spot yet
                    card.classList.remove('is-active');
                    card.classList.remove('is-stacked');
                    card.style.opacity = "0";
                    card.style.visibility = "hidden";
                }

                // 2. Handle Stacking Effect (Scale) and Entry (TranslateY)
                let ty = 0;
                let sc = 1;

                // Entry animation for cards 2 and 3
                if (i > 0) {
                    let entryProgress = (progress - start) / (1 / numRanges);
                    entryProgress = Math.min(Math.max(entryProgress, 0), 1);
                    ty = (1 - entryProgress) * 100; // 100vh to 0
                }

                // Scaling down when covered
                if (progress >= nextStart && !isLastCard) {
                    const scaleProgress = Math.min(1, (progress - nextStart) / (1 / numRanges));
                    sc = 1 - (0.04 * scaleProgress);
                }

                card.style.transform = `translateY(${ty}vh) scale(${sc})`;
            });

            // 3. Handle Button Disappearing
            // Fade out the ABOUT ME button as the last card scrolls up to cover it
            const lastCard = aboutCards[aboutCards.length - 1];
            if (lastCard && aboutButton) {
                const lastRect = lastCard.getBoundingClientRect();
                if (lastRect.top < stickyTop) {
                    const fadeStart = stickyTop;
                    const fadeEnd = buttonStickyTop;
                    const btnProgress = Math.max(0, Math.min(1, (fadeStart - lastRect.top) / (fadeStart - fadeEnd)));
                    aboutButton.style.opacity = (1 - btnProgress).toString();
                    aboutButton.style.visibility = btnProgress >= 1 ? 'hidden' : 'visible';
                } else {
                    aboutButton.style.opacity = '1';
                    aboutButton.style.visibility = 'visible';
                }
            }
        }

        window.addEventListener('scroll', updateCards);
        // Initial check
        updateCards();
    }
    initAboutCardStacking();

    // 10. Hero Custom Cursor ("団")
    const heroCursor = document.getElementById('hero-cursor');
    const heroSection = document.getElementById('home');
    const aboutBtn = document.querySelector('.btn-about');

    if (heroCursor && heroSection) {
        let lastTrailTime = 0;
        const trailCooldown = 30; // ms (more frequent for denser trail)

        window.addEventListener('mousemove', (e) => {
            // Disable custom cursor on mobile/tablets (respecting CSS media query threshold)
            if (window.innerWidth <= 1024) {
                heroCursor.classList.remove('visible');
                document.body.classList.remove('hero-cursor-area');
                return;
            }

            const x = e.clientX;
            const y = e.clientY;
            
            heroCursor.style.left = `${x}px`;
            heroCursor.style.top = `${y}px`;

            const aboutBtnRect = aboutBtn ? aboutBtn.getBoundingClientRect() : null;
            
            let showCursor = false;
            
            // Condition: cursor is visible if hero is partially in view 
            // AND the mouse is above the About Me button's bottom edge
            if (aboutBtnRect) {
                // Check if hero is still in view (rect.bottom > 0)
                const heroRect = heroSection.getBoundingClientRect();
                
                // Also check if we are hovering over a link or button
                const isHoveringInteractive = e.target.closest('a, button, .portfolio-item');
                
                if (heroRect.bottom > 0 && y < aboutBtnRect.bottom && !isHoveringInteractive) {
                    showCursor = true;
                }
            }

            if (showCursor) {
                heroCursor.classList.add('visible');
                document.body.classList.add('hero-cursor-area');

                // Create trail
                const now = Date.now();
                if (now - lastTrailTime > trailCooldown) {
                    createTrail(x, y);
                    lastTrailTime = now;
                }
            } else {
                heroCursor.classList.remove('visible');
                document.body.classList.remove('hero-cursor-area');
            }
        });

        function createTrail(x, y) {
            const trail = document.createElement('div');
            trail.className = 'hero-cursor-trail';
            trail.textContent = '団';
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            trail.style.opacity = '0.5'; // Start semi-visible
            document.body.appendChild(trail);

            // Animate trail
            setTimeout(() => {
                trail.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                trail.style.opacity = '0';
                trail.style.transform = 'translate(-50%, -50%) scale(0.9)';
            }, 10);

            // Remove trail
            setTimeout(() => {
                document.body.removeChild(trail);
            }, 1000);
        }

        // Hide cursor when leaving window
        window.addEventListener('mouseout', () => {
            heroCursor.classList.remove('visible');
            document.body.classList.remove('hero-cursor-area');
        });
    }
});

