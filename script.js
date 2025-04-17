// Countdown Timer
function updateCountdown() {
    const eventDate = new Date('October 4, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Performance optimization: Use passive event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = `${progress}%`;
    }, 100);

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-navigation');
    
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-menu a');
    const cards = document.querySelectorAll('.card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            // Filter cards
            cards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Debounced scroll event for header
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    }, { passive: true });

    // Performance optimization: Use requestAnimationFrame for animations
    const animateElements = document.querySelectorAll('.animated');
    
    const animate = () => {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
        
        requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Error:', e.message);
    // You can add error reporting here
}, true);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page load time:', pageLoadTime, 'ms');
        }, 0);
    });
}

// Function to fetch NASA news
async function fetchNASANews() {
    try {
        const response = await fetch('https://www.nasa.gov/api/2/news/items?page=1&per_page=1');
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const latestNews = data.items[0];
            
            // Update the news card with NASA data
            document.getElementById('nasa-news-title').textContent = latestNews.title;
            document.getElementById('nasa-news-description').textContent = latestNews.excerpt;
            document.getElementById('nasa-news-date').textContent = new Date(latestNews.pubDate).toLocaleDateString();
            document.getElementById('nasa-news-date').setAttribute('datetime', latestNews.pubDate);
            document.getElementById('nasa-news-link').href = latestNews.link;
            
            // Update image if available
            if (latestNews.image) {
                document.getElementById('nasa-news-image').src = latestNews.image;
                document.getElementById('nasa-news-image').alt = latestNews.title;
            }
        }
    } catch (error) {
        console.error('Error fetching NASA news:', error);
        document.getElementById('nasa-news-title').textContent = 'Error loading NASA news';
        document.getElementById('nasa-news-description').textContent = 'Please try again later';
    }
}

// Fetch NASA news when the page loads
document.addEventListener('DOMContentLoaded', fetchNASANews);

// Refresh news every 30 minutes
setInterval(fetchNASANews, 30 * 60 * 1000); 