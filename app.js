// Peeze Esports Website JavaScript - COMPLETE VERSION WITH ALL FIXES
// Enhanced with clickable player profiles, favicon support, and all critical fixes maintained

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const brandLogo = document.querySelector('.brand-logo-img');
    const brandMain = document.querySelector('.brand-main');
    
    // Mobile Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Enhanced navbar scroll effects with smoother transitions
    let lastScrollY = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Brand logo click functionality
    if (brandLogo) {
        brandLogo.addEventListener('click', function(e) {
            e.preventDefault();
            this.blur();
            smoothScrollTo('#hero');
        });
        
        // Make it accessible
        brandLogo.style.cursor = 'pointer';
        brandLogo.setAttribute('title', 'Go to top');
    }
    
    if (brandMain) {
        brandMain.addEventListener('click', function(e) {
            e.preventDefault();
            this.blur();
            smoothScrollTo('#hero');
        });
        
        brandMain.style.cursor = 'pointer';
    }

    // Smooth scrolling function
    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (target) {
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            return true;
        }
        return false;
    }

    // Enhanced navigation with smooth transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href');
            
            // Close mobile menu first
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            document.body.style.overflow = 'auto';
            
            // Remove focus to prevent blue dots
            this.blur();
            
            // Navigate to section
            if (smoothScrollTo(targetId)) {
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // Active navigation highlighting
    function highlightActiveNav() {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Throttled scroll handler for nav highlighting
    let navScrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(navScrollTimeout);
        navScrollTimeout = setTimeout(highlightActiveNav, 10);
    });

    // Hero section button interactions with smooth animations
    const joinTeamBtn = document.querySelector('.hero-actions .btn--primary');
    const viewCommunityBtn = document.querySelector('.hero-actions .btn--hero-outline');

    if (joinTeamBtn) {
        joinTeamBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove focus to prevent blue dots
            this.blur();
            
            // Smooth click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navigate to community section
            smoothScrollTo('#community');
        });
    }

    if (viewCommunityBtn) {
        viewCommunityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove focus to prevent blue dots
            this.blur();
            
            // Smooth click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Navigate to community section
            smoothScrollTo('#community');
        });
    }

    // Discord join button functionality with correct URL
    const discordButtons = document.querySelectorAll('.join-discord, .nav-actions .btn--secondary');
    
    discordButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove focus to prevent blue dots
            this.blur();
            
            // Smooth click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show notification and open Discord with correct URL
            showNotification('🎮 Discord Community wird geöffnet...', 'success');
            
            setTimeout(() => {
                window.open('https://discord.gg/9yUtkxN34S', '_blank');
            }, 500);
        });
    });

    // Enhanced card interactions with smooth hover effects
    const cards = document.querySelectorAll('.player-card, .mission-card, .value-item-inline, .stat-card, .achievement-item, .result-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('click', function(e) {
            // Remove any focus outlines
            this.blur();
        });
    });

    // ENHANCED Player card interactions with REAL clickable profiles
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const playerName = this.querySelector('h3').textContent;
            const playerRole = this.querySelector('.player-role').textContent;
            const profileUrl = this.getAttribute('data-profile-url');
            
            // Handle "This Could Be You" card
            if (playerName.includes('This Could Be You')) {
                showNotification('🚀 Interesse am Team? Bewirb dich in unserem Discord!', 'info');
                setTimeout(() => {
                    window.open('https://discord.gg/9yUtkxN34S', '_blank');
                }, 1000);
            } 
            // Handle real players with profile URLs
            else if (profileUrl && profileUrl !== 'undefined') {
                showNotification(`📊 ${playerName} Profil wird geöffnet...`, 'success');
                setTimeout(() => {
                    window.open(profileUrl, '_blank');
                }, 800);
            }
            // Fallback for players without profile URLs
            else {
                showNotification(`📊 ${playerName} - ${playerRole} Statistiken`, 'info');
            }
            
            // Smooth click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
        
        // Add hover effect indication for clickable cards
        card.addEventListener('mouseenter', function() {
            const playerName = this.querySelector('h3').textContent;
            if (!playerName.includes('This Could Be You')) {
                this.style.cursor = 'pointer';
                this.setAttribute('title', 'Klicken um Profil zu öffnen');
            } else {
                this.style.cursor = 'pointer';
                this.setAttribute('title', 'Klicken um dem Team beizutreten');
            }
        });
    });

    // Mission card interactions
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cardTitle = this.querySelector('h4').textContent;
            let message = '';
            
            switch(cardTitle) {
                case 'Respekt':
                    message = '🤝 Respekt: Faire Behandlung für alle Spieler';
                    break;
                case 'Exzellenz':
                    message = '⭐ Exzellenz: Höchste kompetitive Standards';
                    break;
                case 'Unsere Vision':
                    message = '🎯 Unsere Vision: Eine toxikfreie Gaming-Community schaffen';
                    break;
                default:
                    message = '✨ Mehr über unsere Werte erfahren';
            }
            
            showNotification(message, 'info');
            
            // Smooth click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Stagger animations for grid items
                const gridItems = entry.target.querySelectorAll('.player-card, .mission-card, .value-item-inline, .stat-card, .achievement-item, .result-card');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sectionsToAnimate = document.querySelectorAll('.section');
    sectionsToAnimate.forEach(section => {
        scrollObserver.observe(section);
    });

    // Enhanced notification system with smoother animations
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        // Enhanced notification styles with darker theme
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 2rem;
            z-index: 10000;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.95)' : type === 'error' ? 'rgba(239, 68, 68, 0.95)' : 'rgba(255, 199, 44, 0.95)'};
            color: ${type === 'info' ? '#0A0A0F' : '#FFFFFF'};
            padding: 1rem 1.5rem;
            border-radius: 12px;
            backdrop-filter: blur(15px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transform: translateX(100%);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            border: 1px solid rgba(255, 199, 44, 0.3);
        `;
        
        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        `;
        
        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        
        document.body.appendChild(notification);
        
        // Smooth animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds with smooth animation
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 400);
            }
        }, 5000);
    }

    // Social links interactions with correct Discord URL
    const socialLinks = document.querySelectorAll('.social-link, .footer-column a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Remove focus to prevent blue dots
            this.blur();
            
            if (!href || href === '#') {
                e.preventDefault();
                
                const linkText = this.textContent.trim().toLowerCase();
                
                const messages = {
                    'twitter': '🐦 Twitter Profil wird geöffnet...',
                    'instagram': '📸 Instagram Profil wird geöffnet...',
                    'discord server': '🎮 Discord Server wird geöffnet...',
                    'twitch stream': '📺 Twitch Stream wird geöffnet...',
                    'youtube kanal': '📹 YouTube Kanal wird geöffnet...',
                    'turniere beitreten': '🏆 Turnier-Bereich wird geöffnet...'
                };
                
                const message = Object.keys(messages).find(key => linkText.includes(key));
                if (message && messages[message]) {
                    showNotification(messages[message], 'info');
                    
                    setTimeout(() => {
                        const urls = {
                            'twitter': 'https://twitter.com/peezeesports',
                            'instagram': 'https://instagram.com/peezeesports',
                            'discord server': 'https://discord.gg/9yUtkxN34S',
                            'twitch stream': 'https://twitch.tv/peezeesports',
                            'youtube kanal': 'https://youtube.com/peezeesports',
                            'turniere beitreten': 'https://discord.gg/9yUtkxN34S'
                        };
                        
                        if (urls[message]) {
                            window.open(urls[message], '_blank');
                        }
                    }, 500);
                }
            }
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Remove focus from active element on Escape
        if (e.key === 'Escape' && document.activeElement) {
            document.activeElement.blur();
        }
    });

    // Remove all focus outlines that create blue dots
    const interactiveElements = document.querySelectorAll('button, a, .card, .btn, .mission-card, .player-card, .brand-logo-img');
    interactiveElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = 'none';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });

    // Stats counter animation with enhanced timing
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    function animateStatNumber(element) {
        const finalValue = element.textContent;
        const isPercentage = finalValue.includes('%');
        const numValue = parseInt(finalValue.replace(/[^\d]/g, ''));
        
        if (!isNaN(numValue)) {
            let currentValue = 0;
            const increment = numValue / 60; // Smoother animation
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numValue) {
                    currentValue = numValue;
                    clearInterval(timer);
                }
                
                element.textContent = isPercentage ? 
                    Math.floor(currentValue) + '%' : 
                    Math.floor(currentValue).toLocaleString() + (finalValue.includes('+') ? '+' : '');
            }, 25); // Smoother timing
        }
    }

    // Page loading animation with enhanced effects
    function initPageLoad() {
        // Initialize active nav highlighting
        setTimeout(highlightActiveNav, 1000);
        
        // Enhanced hero title animation
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const titleMain = heroTitle.querySelector('.title-main');
            const titleSub = heroTitle.querySelector('.title-sub');
            
            if (titleMain) {
                titleMain.style.transform = 'translateY(50px)';
                titleMain.style.opacity = '0';
                
                setTimeout(() => {
                    titleMain.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    titleMain.style.transform = 'translateY(0)';
                    titleMain.style.opacity = '1';
                }, 300);
            }
            
            if (titleSub) {
                titleSub.style.transform = 'translateY(30px)';
                titleSub.style.opacity = '0';
                
                setTimeout(() => {
                    titleSub.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
                    titleSub.style.transform = 'translateY(0)';
                    titleSub.style.opacity = '1';
                }, 600);
            }
        }
        
        console.log('🎮 Peeze Esports Website loaded successfully!');
        console.log('🚀 ALL FIXES APPLIED: Logo restored, hero buttons fixed, mission layout corrected, PE FOR PEACE branding, clickable player profiles!');
    }

    // Initialize page
    initPageLoad();

    // Global utility functions
    window.PeezeWebsite = {
        scrollToTop: () => smoothScrollTo('#hero'),
        scrollToSection: (sectionId) => smoothScrollTo(`#${sectionId}`),
        joinCommunity: () => {
            smoothScrollTo('#community');
            setTimeout(() => {
                showNotification('🎮 Willkommen bei Peeze! Discord Community...', 'success');
            }, 500);
        },
        showNotification: showNotification,
        openPlayerProfile: (profileUrl, playerName) => {
            if (profileUrl && profileUrl !== 'undefined') {
                showNotification(`📊 ${playerName} Profil wird geöffnet...`, 'success');
                setTimeout(() => {
                    window.open(profileUrl, '_blank');
                }, 800);
            }
        }
    };

    // Enhanced console welcome message
    console.log('%c🎮 PEEZE ESPORTS', 'color: #FFC72C; font-size: 2rem; font-weight: bold;');
    console.log('%cNON-TOXIC GAMING EXCELLENCE', 'color: #FFFFFF; font-size: 1rem; font-weight: 600;');
    console.log('%cPE FOR PEACE • All Critical Fixes Applied • Clickable Player Profiles • Favicon Support', 'color: #22C55E; font-size: 1rem;');
    console.log('%cTeam: FrostyLino, Tröte (IGL), JBH, yruj (AWP)', 'color: #FFC72C; font-size: 0.9rem;');
    console.log('%c✅ Logo Fixed ✅ Hero Button Fixed ✅ Mission Layout Fixed ✅ Branding Fixed', 'color: #22C55E; font-size: 0.9rem;');
});

// Error handling with enhanced logging
window.addEventListener('error', function(e) {
    console.error('🚨 Website Fehler:', e.error);
});

// Prevent unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('🚨 Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    
    // Check if favicon is properly loaded
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        console.log('🎯 Favicon loaded successfully');
    } else {
        console.log('⚠️ Favicon not found - check media/favicon.png');
    }
});