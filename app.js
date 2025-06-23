// JS - main.js

// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap; // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger; // Declare ScrollTrigger variable

// Theme Management
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to "dark"
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Animate theme Toggle
    gsap.to(themeToggle, {
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
    });
});

// Mobile Menu Management
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");

    // Prevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
        body.style.overflow = "hidden";
    } else {
        body.style.overflow = "";
    }
});

// Loading Animation
function initLoader() {
    const loader = document.querySelector(".loader");
    const loaderText = document.querySelector(".loader-text");
    const loaderProgress = document.querySelector(".loader-progress");

    // Animation loader text
    gsap.to(loaderText, {
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
    });

    // Animation progress bar
    gsap.to(loaderProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    loader.style.display = "none";
                    initAnimations();  // Execute main animations after loading
                    initAboutAnimations(); // Execute About animations after loading
                }
            });
        }
    });
}

// Initialize loader on page load
window.addEventListener("load", initLoader);

// Custom cursor (only on desktop)
if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor");
    const cursorFollower = document.querySelector(".cursor-follower");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
        });

        gsap.to(cursorFollower, {
            x: e.clientX - 20,
            y: e.clientY - 20,
            duration: 0.2,
        });
    });
}

// Initialize all animations
function initAnimations() {
    // Navigation animation
    gsap.to("nav", {
        y: 0,
        duration: 1,
        ease: "power3.out",
    });

    // Gallery images animation with ScrollTrigger
    gsap.utils.toArray(".gallery-group").forEach((group) => {
        const images = group.querySelectorAll("img");
        gsap.to(images, {
            scrollTrigger: {
                trigger: group,
                start: "top 80%",
            },
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out",
            onStart: () => {
                images.forEach((img) => img.classList.add("gallery-animate"));
            }
        });
    });

    // Gallery groups animation without delay
    gsap.utils.toArray(".gallery-group").forEach((group) => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: group,
                start: "top 80%",
                toggleActions: "play none none none",
            },
        });

        tl.to(group.querySelector(".group-title"), {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            filter: "blur(0px)",
        });

        const items = group.querySelectorAll("img, .video-wrapper");

        tl.to(
            items,
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                filter: "blur(0px)",
                stagger: 0.15,
            },
            "-=0.5" // Overlap animation of items with title
        );
    });

    // Hero Animation
    const HeroTl = gsap.timeline();
    HeroTl.to(".hero-title", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        ease: "power3.out",
    })
    .to(".hero-subtitle", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    }, "-=0.5")
    .to(".hero-description", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    }, "-=0.3")
    .to(".cta-button", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    }, "-=0.3");
}

// About Hero Animation & Numbers Animation
function initAboutAnimations() {
    const tl = gsap.timeline();

    // Fade in and move up the text blocks
    tl.to(".about-title", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        ease: "power3.out",
    })
    .to(".about-subtitle, .about-text, .about-list", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
    }, "-=0.8")
    .to(".numbers-container", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
        onStart: () => {
            animateNumbers();  // Start the number animations
        }
    }, "-=0.6");
}

// Numbers count-up animation function with ScrollTrigger
function animateNumbers() {
    const numbers = document.querySelectorAll(".number");

    numbers.forEach((number) => {
        const target = +number.getAttribute("data-target");

        gsap.fromTo(number, 
            { innerText: 0 }, 
            { 
                innerText: target, 
                duration: 2, 
                ease: "power1.out", 
                snap: { innerText: 1 },
                onUpdate: function() {
                    number.innerText = Math.floor(this.targets()[0].innerText);
                },
                scrollTrigger: {
                    trigger: number,
                    start: "top 90%",
                    toggleActions: "play none none none",
                    once: true
                }
            }
        );
    });
}
