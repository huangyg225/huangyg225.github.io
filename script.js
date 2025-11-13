document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initNavigation();
    initScrollProgress();
    initBackToTop();
    initSmoothScroll();
    initCTAButtons();
    initCardAnimations();
    initTagFiltering();
    initHeroAnimation();
});

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        html.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            if (newTheme === 'dark') {
                html.setAttribute('data-theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                html.removeAttribute('data-theme');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }
}

function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    }
    
    let navTicking = false;
    window.addEventListener('scroll', function() {
        if (!navTicking) {
            window.requestAnimationFrame(function() {
                const navbar = document.querySelector('.navbar');
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                        navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.15)';
                    } else {
                        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
                    }
                }
                navTicking = false;
            });
            navTicking = true;
        }
    }, { passive: true });
}

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    let ticking = false;
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    const scrolled = (winScroll / height) * 100;
                    progressBar.style.width = scrolled + '%';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
}

function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    let ticking = false;
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    if (window.scrollY > 500) {
                        backToTopBtn.classList.add('visible');
                    } else {
                        backToTopBtn.classList.remove('visible');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 70;
                const targetPosition = target.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initCTAButtons() {
    const primaryCTA = document.querySelector('.cta-button.primary');
    const secondaryCTA = document.querySelector('.cta-button.secondary');
    
    if (primaryCTA) {
        primaryCTA.addEventListener('click', function() {
            const blogPosts = document.querySelector('.blog-posts');
            if (blogPosts) {
                blogPosts.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    if (secondaryCTA) {
        secondaryCTA.addEventListener('click', function() {
            const about = document.getElementById('about');
            if (about) {
                about.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }
}

function initCardAnimations() {
    const observeCards = () => {
        const cards = document.querySelectorAll('.post-card');
        const widgets = document.querySelectorAll('.widget');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        [...cards, ...widgets].forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    };
    
    observeCards();
}

function initTagFiltering() {
    const tags = document.querySelectorAll('.tag[data-filter]');
    const postCards = document.querySelectorAll('.post-card');
    
    if (tags.length > 0 && postCards.length > 0) {
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                const filterValue = this.getAttribute('data-filter');
                
                tags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                postCards.forEach(card => {
                    card.style.transition = 'all 0.5s ease';
                    
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, 10);
                    } else {
                        const cardTags = Array.from(card.querySelectorAll('.mini-tag')).map(t => t.textContent);
                        const cardCategory = card.getAttribute('data-category');
                        
                        if (cardTags.includes(filterValue) || cardCategory === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0) scale(1)';
                            }, 10);
                        } else {
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(20px) scale(0.95)';
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 500);
                        }
                    }
                });
                
                const blogPosts = document.querySelector('.blog-posts');
                if (blogPosts) {
                    blogPosts.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        const allTag = document.querySelector('.tag[data-filter="all"]');
        if (allTag) {
            allTag.classList.add('active');
        }
    }
}

function initHeroAnimation() {
    window.addEventListener('load', function() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
        }
    });
}

if (typeof window !== 'undefined' && !window.observeCardsInitialized) {
    window.observeCardsInitialized = true;
}
