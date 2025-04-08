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

// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    let progress = 0;
    
    // Simulate faster loading progress
    const interval = setInterval(() => {
        progress += Math.random() * 25; // Increased increment
        if (progress > 100) progress = 100;
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 300); // Reduced fade-out time
            }, 100); // Reduced delay before fade-out
        }
    }, 100); // Reduced interval time
});

// Initialize when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenu = document.querySelector('.close-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeMenu.addEventListener('click', function() {
            mobileMenu.style.display = 'none';
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking on menu items
        const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.style.display = 'none';
                document.body.style.overflow = '';
            });
        });
    }
    
    // Search Toggle
    const searchToggle = document.querySelector('.search-toggle');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            // Implement search functionality here
            console.log('Search toggle clicked');
        });
    }
    
    // Filter Functionality
    const filterLinks = document.querySelectorAll('.filter-menu a');
    const cards = document.querySelectorAll('.card');
    
    if (filterLinks.length && cards.length) {
        filterLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all links
                filterLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filter cards
                cards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'flex';
                    } else {
                        const cardCategory = card.getAttribute('data-category');
                        if (cardCategory === filter) {
                            card.style.display = 'flex';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Form Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredInputs = newsletterForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    highlightInput(input, true);
                } else {
                    highlightInput(input, false);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(input.value)) {
                        isValid = false;
                        highlightInput(input, true);
                    }
                }
            });
            
            if (isValid) {
                // Form is valid, simulate submission
                console.log('Form submitted successfully');
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                
                // Clear form and append message
                newsletterForm.innerHTML = '';
                newsletterForm.appendChild(successMessage);
            }
        });
        
        // Add input event listeners for real-time validation
        const formInputs = newsletterForm.querySelectorAll('input');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    highlightInput(this, false);
                }
                
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    highlightInput(this, !emailPattern.test(this.value));
                }
            });
        });
    }
    
    // Helper function to highlight invalid inputs
    function highlightInput(input, isError) {
        if (isError) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '';
        }
    }
    
    // Smooth Scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Card Hover Animation Enhancement
    const allCards = document.querySelectorAll('.card');
    
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Scroll Animations (optional - requires IntersectionObserver support)
    if ('IntersectionObserver' in window) {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // "View More" button functionality
    const viewMoreBtn = document.querySelector('.view-more .btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Implement view more functionality here
            console.log('View more clicked');
            
            // For demonstration purposes:
            this.textContent = 'Loading...';
            
            // Simulate loading more content
            setTimeout(() => {
                this.textContent = 'No more items to load';
                this.disabled = true;
                this.style.opacity = '0.6';
            }, 1500);
        });
    }
});

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