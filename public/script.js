document.addEventListener("DOMContentLoaded", function () {
    const awardsSection = document.getElementById("awards");
    const confettiContainer = document.getElementById("confetti");
    let hasCelebrated = false; // Flag to track if confetti has been triggered

    // Function to create confetti particles
    function createConfetti() {
        for (let i = 0; i < 100; i++) {
            const particle = document.createElement("div");
            particle.classList.add("particle");
            particle.style.left = Math.random() * 100 + "vw"; // Random horizontal position
            particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
            particle.style.animationDuration = Math.random() * 1 + 1 + "s"; // Duration between 1s and 3s
            confettiContainer.appendChild(particle);
            particle.style.animationDelay = Math.random() * 2 + "s"; // Random delay
        }
    }

    // Function to trigger confetti
    function triggerConfetti() {
        if (!hasCelebrated) { // Only trigger if not already celebrated
            confettiContainer.style.display = "block"; // Show confetti container
            createConfetti();

            // Remove confetti particles after animation ends
            setTimeout(() => {
                confettiContainer.innerHTML = ""; // Clear particles
                confettiContainer.style.display = "none"; // Hide container
                hasCelebrated = true; // Set the flag to true
            }, 4000); // Adjust time as needed
        }
    }

    // Check if the awards section is in view
    window.addEventListener("scroll", () => {
        const awardsRect = awardsSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Check if the awards section is within the viewport
        if (awardsRect.top < windowHeight && awardsRect.bottom >= 0) {
            triggerConfetti();
        }

        // Reset celebration flag when scrolling back to the header (top section)
        const header = document.querySelector('header');
        const headerRect = header.getBoundingClientRect();

        // Check if the header is in the viewport
        if (headerRect.bottom >= 0) {
            hasCelebrated = false; // Reset the flag
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
/**
 * Portfolio isotope and filter
 */
window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        on('click', '#portfolio-flters li', function(e) {
            e.preventDefault();
            portfolioFilters.forEach(function(el) {
                el.classList.remove('filter-active');
            });
            this.classList.add('filter-active');

            // Arrange items based on selected filter
            portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
            });
            portfolioIsotope.on('arrangeComplete', function() {
                AOS.refresh(); // Refresh AOS animations
            });
        }, true);
    }
});

/**
 * Initiate portfolio lightbox 
 */
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});

/**
 * Initiate portfolio details lightbox 
 */
const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
});

/**
 * Portfolio details slider
 */
new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    }
});

/**
 * Utility function to select elements
 */
function select(el, all = false) {
    el = el.trim();
    if (all) {
        return [...document.querySelectorAll(el)];
    } else {
        return document.querySelector(el);
    }
}

/**
 * Utility function to add event listeners
 */
function on(type, el, listener, all = false) {
    let selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
}
