// Driver Modal Functionality
class DriverModal {
    constructor() {
        this.modal = document.getElementById('driverModal');
        this.openButtons = document.querySelectorAll('#openModal, #openModalCTA');
        this.closeButton = document.getElementById('closeModal');
        this.typedTextElement = document.getElementById('typedText');
        this.currentTimeElement = document.getElementById('currentTime');
        this.statusCards = document.getElementById('statusCards');
        this.mainContent = document.getElementById('mainContent');
        this.jsonSection = document.getElementById('jsonSection');
        
        this.driverData = {
            driverId: "DR-9k8mQ2xR7vN3",
            name: "John Martinez",
            cdlClass: "Class A",
            experience: 8,
            safetyScore: 97.5,
            equipmentType: "53ft Dry Van",
            currentLocation: "Dallas, TX",
            latitude: 32.7767,
            longitude: -96.7970,
            status: "Available",
            preferredRoutes: ["TX → AZ", "TX → CA", "TX → FL"],
            noGoZones: ["NYC Metro", "LA Metro"]
        };

        this.loadData = [
            {
                loadId: "LOAD-8K92",
                origin: "Dallas, TX",
                destination: "Phoenix, AZ",
                commodity: "Electronics",
                rate: 3240,
                distance: 887,
                pickupDate: "Jan 31, 2025",
                matchScore: 96
            },
            {
                loadId: "LOAD-7N34",
                origin: "Dallas, TX", 
                destination: "Los Angeles, CA",
                commodity: "Auto Parts",
                rate: 3850,
                distance: 1350,
                pickupDate: "Feb 1, 2025",
                matchScore: 88
            },
            {
                loadId: "LOAD-5M67",
                origin: "Dallas, TX",
                destination: "Miami, FL",
                commodity: "Consumer Goods",
                rate: 4200,
                distance: 1170,
                pickupDate: "Feb 2, 2025",
                matchScore: 82
            }
        ];

        this.init();
    }

    init() {
        // Event listeners
        this.openButtons.forEach(button => {
            button.addEventListener('click', () => this.openModal());
        });

        this.closeButton.addEventListener('click', () => this.closeModal());
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Start real-time clock
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    openModal() {
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.startDemo();
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        this.resetDemo();
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        if (this.currentTimeElement) {
            this.currentTimeElement.textContent = timeString;
        }
    }

    async startDemo() {
        // Reset all sections
        this.resetDemo();
        
        // Start typing animation
        await this.typeText(`Hello, driver ID ${this.driverData.driverId}`, 50);
        
        // Show status cards after typing
        setTimeout(() => {
            this.statusCards.style.opacity = '1';
        }, 500);

        // Show main content
        setTimeout(() => {
            this.mainContent.style.opacity = '1';
        }, 1500);

        // Show JSON section
        setTimeout(() => {
            this.jsonSection.style.opacity = '1';
            this.displayJsonResponse();
        }, 2500);
    }

    resetDemo() {
        this.typedTextElement.textContent = '';
        this.statusCards.style.opacity = '0';
        this.mainContent.style.opacity = '0';
        this.jsonSection.style.opacity = '0';
    }

    async typeText(text, speed = 50) {
        this.typedTextElement.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            this.typedTextElement.textContent += text[i];
            await this.sleep(speed);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    displayJsonResponse() {
        const jsonResponse = {
            "products": {
                "driverIdentification": {
                    "data": {
                        "driverId": this.driverData.driverId,
                        "requestId": "1748554899371.H7W6zf",
                        "driverDetails": {
                            "name": this.driverData.name,
                            "cdlClass": this.driverData.cdlClass,
                            "experience": this.driverData.experience,
                            "equipmentType": this.driverData.equipmentType,
                            "safetyScore": this.driverData.safetyScore
                        },
                        "location": {
                            "currentLocation": this.driverData.currentLocation,
                            "latitude": this.driverData.latitude,
                            "longitude": this.driverData.longitude
                        },
                        "status": this.driverData.status,
                        "preferences": {
                            "preferredRoutes": this.driverData.preferredRoutes,
                            "noGoZones": this.driverData.noGoZones
                        },
                        "timestamp": Date.now(),
                        "confidence": {
                            "score": 0.98,
                            "revision": "v2.1"
                        }
                    }
                },
                "loadMatching": {
                    "data": {
                        "availableLoads": this.loadData.length,
                        "matches": this.loadData.map(load => ({
                            "loadId": load.loadId,
                            "matchScore": load.matchScore / 100,
                            "route": `${load.origin} → ${load.destination}`,
                            "rate": load.rate,
                            "distance": load.distance,
                            "commodity": load.commodity,
                            "pickupDate": load.pickupDate
                        })),
                        "averageMatchScore": this.loadData.reduce((sum, load) => sum + load.matchScore, 0) / this.loadData.length / 100,
                        "totalPotentialRevenue": this.loadData.reduce((sum, load) => sum + load.rate, 0)
                    }
                },
                "performanceAnalytics": {
                    "data": {
                        "monthlyStats": {
                            "loadsCompleted": 47,
                            "revenue": 127000,
                            "brokerRating": 4.9,
                            "daysAvailable": 12
                        },
                        "efficiency": {
                            "onTimeDelivery": 0.985,
                            "fuelEfficiency": 7.2,
                            "routeOptimization": 0.94
                        }
                    }
                }
            }
        };

        const jsonString = JSON.stringify(jsonResponse, null, 2);
        // Basic highlighting for demonstration
        const highlightedJson = jsonString
            .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:') // Keys
            .replace(/"([^"]*)"/g, '<span class="json-string">"$1"</span>') // Strings
            .replace(/\b(\d+(\.\d+)?)\b/g, '<span class="json-number">$1</span>') // Numbers
            .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>') // Booleans
            .replace(/\b(null)\b/g, '<span class="json-null">$1</span>'); // Null

        const jsonElement = document.getElementById('jsonResponse');
        if (jsonElement) {
            jsonElement.innerHTML = highlightedJson; // Use innerHTML for spans
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
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
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate in
    document.querySelectorAll('.feature-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Load card hover effects
function initLoadCardEffects() {
    document.addEventListener('DOMContentLoaded', () => {
        const loadCards = document.querySelectorAll('.load-card');
        
        loadCards.forEach(card => {
            const bookButton = card.querySelector('.book-button');
            
            card.addEventListener('mouseenter', () => {
                if (bookButton) {
                    bookButton.style.opacity = '1';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (bookButton) {
                    bookButton.style.opacity = '0';
                }
            });
        });
    });
}

// Handle responsive navigation
function initResponsiveNav() {
    const navMenu = document.querySelector('.nav-menu');
    const navButtons = document.querySelector('.nav-buttons');
    const navContent = document.querySelector('.nav-content'); // The parent containing logo, toggle, menu, buttons

    // Remove any existing nav-toggle button to prevent duplicates
    const existingNavToggle = document.querySelector('.nav-toggle');
    if (existingNavToggle) {
        existingNavToggle.remove();
    }

    const navToggle = document.createElement('button');
    navToggle.innerHTML = '☰'; // Hamburger icon
    navToggle.className = 'nav-toggle'; // Class for styling

    // Add toggle button after logo section (or where appropriate in your header structure)
    const logoSection = document.querySelector('.logo-section');
    if (logoSection && logoSection.parentNode) {
        // Insert navToggle directly into navContent, after logo-section
        navContent.insertBefore(navToggle, navContent.querySelector('.nav-menu') || navContent.querySelector('.nav-buttons'));
    }


    // Function to close the mobile menu
    function closeMobileMenu() {
        navContent.classList.remove('is-open');
        document.body.style.overflow = 'auto'; // Re-enable scrolling on body
        // Give a slight delay before removing 'mobile-nav-active' for transition
        setTimeout(() => {
            navContent.classList.remove('mobile-nav-active');
            // Explicitly hide elements after transition completes if still on mobile
            if (window.matchMedia('(max-width: 767px)').matches) {
                navMenu.style.display = 'none';
                navButtons.style.display = 'none';
            }
        }, 400); // Match CSS transition duration
    }

    // Toggle navigation on mobile
    navToggle.addEventListener('click', () => {
        const isOpen = navContent.classList.contains('is-open');
        if (isOpen) {
            closeMobileMenu();
        } else {
            navContent.classList.add('mobile-nav-active');
            document.body.style.overflow = 'hidden'; // Disable scrolling on body when menu is open
            // Ensure menu and buttons are visible for animation
            navMenu.style.display = 'flex';
            navButtons.style.display = 'flex';
            // Use a timeout to allow 'mobile-nav-active' styles to apply before 'is-open' for transition
            setTimeout(() => {
                navContent.classList.add('is-open');
            }, 50); // Small delay
        }
    });

    // Close mobile menu when a nav link or button is clicked
    document.querySelectorAll('.nav-link, .nav-buttons .btn').forEach(linkOrBtn => {
        linkOrBtn.addEventListener('click', () => {
            if (window.matchMedia('(max-width: 767px)').matches) {
                closeMobileMenu();
            }
        });
    });

    // Handle media query changes
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    function handleMediaQuery(e) {
        if (e.matches) { // If mobile
            navToggle.style.display = 'block'; // Show hamburger
            closeMobileMenu(); // Ensure menu is closed and hidden
        } else { // If desktop
            navToggle.style.display = 'none'; // Hide hamburger
            navContent.classList.remove('mobile-nav-active', 'is-open'); // Remove mobile classes
            document.body.style.overflow = 'auto'; // Ensure body scrolling is enabled on desktop
            navMenu.style.display = 'flex'; // Ensure menu is visible
            navButtons.style.display = 'flex'; // Ensure buttons are visible
        }
    }
    
    mediaQuery.addListener(handleMediaQuery);
    handleMediaQuery(mediaQuery); // Call on load to set initial state
}


// Header scroll effect functionality
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    // Set scrollThreshold to the exact height of the hero section.
    const scrollThreshold = heroSection ? heroSection.offsetHeight : 200; 

    function toggleHeaderBackground() {
        if (window.scrollY >= scrollThreshold) { // Use >= to ensure it triggers exactly at the threshold
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }

    // Call on initial load in case page is already scrolled
    toggleHeaderBackground();

    // Add scroll event listener
    window.addEventListener('scroll', toggleHeaderBackground);
}


// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modal
    new DriverModal();
    
    // Initialize other features
    initSmoothScrolling();
    initAnimations();
    initLoadCardEffects();
    initResponsiveNav();
    initHeaderScrollEffect();
    
    // Add loading states for buttons (optional, but good for UX)
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled) {
                this.style.opacity = '0.8';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 200);
            }
        });
    });
});