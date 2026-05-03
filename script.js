function initApp() {
    // 1. Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Floating Logo Animation
    const floatingLogo = document.getElementById('floating-logo');
    if (floatingLogo) {
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
                heroFontSizeDesign = 164; 
                heroDesignY = 85;
            }

            if (isMobilePortrait) {
                heroLogoSize = 0; // Hide logo in portrait
                heroLogoOffsetY = 0;
                if (isJapanese) {
                    heroFontSizeDan = 49;
                    heroFontSizeDesign = 83; 
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
                    heroFontSizeDesign = 101; 
                    heroDesignY = 60;
                } else {
                    heroFontSizeDan = 60;
                    heroFontSizeDesign = 112;
                    heroDesignY = 55;
                }
            } else if (isMobileLandscape) {
                heroLogoSize = 125; 
                heroLogoOffsetY = 10; 
                if (isJapanese) {
                    heroFontSizeDan = 49;
                    heroFontSizeDesign = 83; 
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

            const heroTextHeight = heroDesignY + heroFontSizeDesign * 1.1; 
            const headerTextHeight = headerFontSize;
            const currentTextHeight = heroTextHeight - (heroTextHeight - headerTextHeight) * progress;

            if (logoText) {
                logoText.style.height = `${currentTextHeight}px`;
                logoText.style.width = `${Math.max(danWidth, textDesign.offsetWidth)}px`;
            }

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

        // Recalculate on resize
        window.addEventListener('resize', updateLogoPosition);

        // After entry animation is done, allow overflow for scroll
        setTimeout(() => {
            document.querySelectorAll('.hero-entry-mask').forEach(mask => {
                mask.classList.add('animation-finished');
            });
        }, 3500);
    }

    // 3. Portfolio Animation & Services Sticky Scale
    function initPortfolioAnimation() {
        const portfolioSection = document.querySelector('.portfolio');
        const items = document.querySelectorAll('.portfolio-item');
        if (!portfolioSection || !items.length) return;

        function updatePortfolio() {
            const rect = portfolioSection.getBoundingClientRect();
            const scrollHeight = portfolioSection.offsetHeight - window.innerHeight;
            const scrollTop = Math.min(Math.max(-rect.top, 0), scrollHeight);
            const progress = scrollTop / scrollHeight;

            // Weights for phases per item
            const travelWeight = 6.2; // Entry duration (sliding in from bottom)
            const exitWeight = 4.8;   // Exit duration (sliding up to leave)
            const pauseWeight = 12.0;  // TOTAL PAUSE DURATION: Increase this to keep the card on screen longer
            const itemCycle = travelWeight + pauseWeight + exitWeight; // Total duration per item
            const overlap = 1.0;   // How much the next card's entry overlaps the current card's exit
            
            const totalWeight = (items.length * (itemCycle - overlap)) + overlap;

            items.forEach((item, index) => {
                const startWeight = index * (itemCycle - overlap);
                const enterStart = startWeight / totalWeight;
                const enterEnd = (startWeight + travelWeight) / totalWeight;
                const pauseEnd = (startWeight + travelWeight + pauseWeight) / totalWeight;
                const exitEnd = (startWeight + travelWeight + pauseWeight + exitWeight) / totalWeight;

                let y = 100; // Start below (100vh)
                let opacity = 0;
                let visibility = 'hidden';
                let imageTranslate = 0; // Internal image transition (0 to -100%)

                if (progress >= enterStart && progress < enterEnd) {
                    // Entering
                    const localP = (progress - enterStart) / (enterEnd - enterStart);
                    const eased = localP < 0.5 ? 4 * localP * localP * localP : 1 - Math.pow(-2 * localP + 2, 3) / 2;
                    y = 100 - (eased * 100);
                    opacity = Math.min(1, localP * 2);
                    visibility = 'visible';
                } else if (progress >= enterEnd && progress < pauseEnd) {
                    // Paused at top (y = 0)
                    y = 0;
                    opacity = 1;
                    visibility = 'visible';

                    // INTERNAL IMAGE SLIDE TIMING:
                    // localPause goes from 0 to 1 during the 'pauseWeight' phase.
                    const localPause = (progress - enterEnd) / (pauseEnd - enterEnd);
                    
                    // (localPause - START_TIME) / SLIDE_DURATION
                    // Start at 0.1 (10% into pause). 
                    // Duration 0.4 means it finishes at 0.5 (50% into pause).
                    // This leaves the remaining 50% of the pause for the SECOND image to stay static.
                    // Lower the 0.4 to make the slide faster/pause longer.
                    const imageProgress = Math.max(0, Math.min(1, (localPause - 0.1) / 0.8));
                    
                    // Smoother cubic ease-in-out
                    const easedImage = imageProgress < 0.5 ? 4 * imageProgress * imageProgress * imageProgress : 1 - Math.pow(-2 * imageProgress + 2, 3) / 2;
                    imageTranslate = easedImage * 100;
                } else if (progress >= pauseEnd && progress < exitEnd) {
                    // Exiting
                    const localExit = (progress - pauseEnd) / (exitEnd - pauseEnd);
                    // Smoother/slower exit curve
                    const eased = Math.pow(localExit, 1.2); 
                    y = 0 - (eased * 120);
                    opacity = 1 - Math.pow(localExit, 2);
                    visibility = 'visible';
                    imageTranslate = 100;
                } else if (progress >= exitEnd) {
                    y = -120;
                    opacity = 0;
                    visibility = 'hidden';
                } else {
                    // Waiting to enter
                    y = 100;
                    opacity = 0;
                    visibility = 'hidden';
                }

                item.style.transform = `translate3d(0, ${y}vh, 0)`;
                item.style.opacity = opacity.toString();
                item.style.visibility = visibility;
                
                const wrapper = item.querySelector('.portfolio-image-wrapper');
                if (wrapper) {
                    wrapper.style.transform = `translate3d(-${imageTranslate}%, 0, 0)`;
                }
            });
        }

        window.addEventListener('scroll', updatePortfolio);
        updatePortfolio();
    }
    initPortfolioAnimation();

    const serviceCards = document.querySelectorAll('.service-card');

    function handleScrollEffects() {
        // Services Scroll-Linked Animation
        const servicesContainer = document.querySelector('.services-container');
        if (!servicesContainer) return;

        const containerRect = servicesContainer.getBoundingClientRect();
        // How far from the top of viewport (offset by sticky point)
        const scrollOffset = -(containerRect.top - 120);
        
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

    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer) {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(handleScrollEffects);
        }, { passive: true });
        handleScrollEffects();
    }
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

    // 6. About Section Staggered Reveal Animation
    function initAboutReveal() {
        const revealElements = document.querySelectorAll('.staggered-reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }
    initAboutReveal();
}

// Start the application logic
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

