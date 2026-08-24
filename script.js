document.addEventListener("DOMContentLoaded", function () {
    // 1. Reveal Elements Intersection Observer + Card Image Sliders trigger
    const revealElements = document.querySelectorAll(".reveal");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");

                // Trigger slider initialization if it's a card container
                if (entry.target.classList.contains("card") && !entry.target.dataset.sliderInitialized) {
                    initCardSlider(entry.target);
                    entry.target.dataset.sliderInitialized = "true";
                }
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
    revealElements.forEach(element => scrollObserver.observe(element));

    // Handle card elements directly with data attributes
    const cardSliders = document.querySelectorAll("[data-card-slider]");
    cardSliders.forEach(card => {
        scrollObserver.observe(card);
    });

    // Function to handle the 5-image reciprocal automatic slider sequence
    function initCardSlider(cardElement) {
        const slides = cardElement.querySelectorAll(".slide-img");
        const dots = cardElement.querySelectorAll(".card-dot");
        if (slides.length === 0) return;

        let currentIndex = 0;
        let direction = 1; // 1 = forward, -1 = backward

        function updateSlider() {
            slides.forEach(s => s.classList.remove("active"));
            dots.forEach(d => d.classList.remove("active"));

            slides[currentIndex].classList.add("active");
            if (dots[currentIndex]) dots[currentIndex].classList.add("active");

            if (currentIndex === slides.length - 1) {
                direction = -1; // Hit the 5th image, reverse direction
            } else if (currentIndex === 0) {
                direction = 1;  // Hit the 1st image, go forward again
            }

            currentIndex += direction;
        }

        // 5-second interval loop once scrolled into view
        setInterval(updateSlider, 5000);
    }

    // 2. Automated Hero Banner Slider Logic
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".slider-dots .dot");
    let currentHeroSlide = 0;

    function goToHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove("active"));
        heroDots.forEach(dot => dot.classList.remove("active"));

        currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
        
        heroSlides[currentHeroSlide].classList.add("active");
        heroDots[currentHeroSlide].classList.add("active");
    }

    function nextHeroSlide() {
        goToHeroSlide(currentHeroSlide + 1);
    }

    let heroInterval = setInterval(nextHeroSlide, 5000);

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            goToHeroSlide(index);
            clearInterval(heroInterval);
            heroInterval = setInterval(nextHeroSlide, 5000);
        });
    });

    // 3. Parallax Scrolling Effect for Badges
    const badge1 = document.querySelector(".card-1");
    const badge2 = document.querySelector(".card-2");

    window.addEventListener("scroll", () => {
        let scrollY = window.pageYOffset;
        if (badge1) badge1.style.transform = `translateY(${scrollY * 0.4}px)`;
        if (badge2) badge2.style.transform = `translateY(${scrollY * 0.15}px)`;
    });

    // 4. Mobile Navigation Toggle Logic
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-links a");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navLinks.classList.toggle("active");
        document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "";
    });

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            menuToggle.classList.remove("active");
            navLinks.classList.remove("active");
            document.body.style.overflow = "";
        });
    });

    // 5. Dynamic navbar shadow on scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            nav.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.06)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
});