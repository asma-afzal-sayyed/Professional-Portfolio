
document.addEventListener("DOMContentLoaded", function () {

    // ===== SCROLL REVEAL ANIMATION =====

    const elements = document.querySelectorAll(
        ".section, .skill-card, .project-card, .education-card"
    );

    elements.forEach(function (element) {
        element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }

            });

        },
        {
            threshold: 0.08
        }
    );

    elements.forEach(function (element) {
        observer.observe(element);
    });



    // ===== DARK MODE WITH LOCAL STORAGE =====

    const themeToggle = document.querySelector(".theme-toggle");
    const themeLabel = document.querySelector("#theme-label");
    const toggleCircle = document.querySelector(".toggle-circle");

    // First visit par Dark Mode default rahega
    const savedTheme = localStorage.getItem("portfolioTheme");

    const isDarkMode = savedTheme === null
        ? true
        : savedTheme === "dark";

    // Apply selected theme
    function applyTheme(dark) {
        document.body.classList.toggle("dark-mode", dark);

        if (themeLabel) {
            themeLabel.textContent = dark ? "Light Mode" : "Dark Mode";
        }

        if (toggleCircle) {
            toggleCircle.style.left = dark ? "29px" : "3px";
        }
    }

    // Page load par saved theme apply karo
    applyTheme(isDarkMode);

    // Button click par theme change aur save karo
    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            const dark = !document.body.classList.contains("dark-mode");

            applyTheme(dark);

            localStorage.setItem(
                "portfolioTheme",
                dark ? "dark" : "light"
            );
        });
    }


    // ===== TYPING ANIMATION =====

    const typingText = document.getElementById("typing-text");

    if (typingText) {

        const words = [
            "Data Analyst",
            "Python Developer",
            "AI/ML Enthusiast"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (deleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentWord.substring(0, charIndex);

            let speed = deleting ? 50 : 100;

            if (!deleting && charIndex === currentWord.length) {
                deleting = true;
                speed = 1200;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 400;
            }

            setTimeout(typeEffect, speed);
        }

        typeEffect();
    }

    // ===== BACK TO TOP BUTTON =====

    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

    // ===== ANIMATED COUNTERS =====

    const counters = document.querySelectorAll(".counter");

    const counterObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            const counter = entry.target;

            if (entry.isIntersecting) {

                let current = 0;

                const target = Number(counter.getAttribute("data-target"));

                counter.textContent = "0";

                const increment = Math.max(1, Math.ceil(target / 50));

                const timer = setInterval(function () {

                    current += increment;

                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }

                    counter.textContent = current;

                }, 180);

                counter.dataset.timer = timer;

            } else {

                if (counter.dataset.timer) {
                    clearInterval(Number(counter.dataset.timer));
                }

                counter.textContent = "0";

            }

        });

    }, {
        threshold: 0.5
    });

    counters.forEach(function (counter) {
        counterObserver.observe(counter);
    });

    // ===== ACTIVE NAVBAR HIGHLIGHT =====

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function () {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop - 150 &&
                window.scrollY < sectionTop + sectionHeight - 150) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    });

    // ===== MOBILE MENU TOGGLE =====

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.querySelector(".nav-links");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            navMenu.classList.toggle("active");

            if (navMenu.classList.contains("active")) {
                menuToggle.textContent = "✕";
            } else {
                menuToggle.textContent = "☰";
            }

        });

        navMenu.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");
                menuToggle.textContent = "☰";

            });

        });

    }

    console.log("Asma's Portfolio Loaded Successfully!");

});



// PROJECT IMAGE LIGHTBOX

document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(".project-gallery img");
    const lightbox = document.getElementById("image-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const closeLightbox = document.getElementById("lightbox-close");

    if (!lightbox || !lightboxImage || !closeLightbox) {
        console.error("Lightbox HTML elements not found!");
        return;
    }

    galleryImages.forEach(function (image) {

        image.addEventListener("click", function () {

            lightboxImage.src = image.src;
            lightbox.classList.add("active");

        });

    });

    closeLightbox.addEventListener("click", function () {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            lightbox.classList.remove("active");
        }
    });

});
