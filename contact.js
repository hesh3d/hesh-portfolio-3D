// GSAP plugins are already loaded via CDN in the HTML file
const gsap = window.gsap // Declare gsap variable
const ScrollTrigger = window.ScrollTrigger // Declare ScrollTrigger variable

// Theme Managment
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme perference or default to "dark"
const currentTheme = localStorage.getItem("theme") || "dark";
body.setAttribute("data-theme", currentTheme)

themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Animate theme Toggle
    gsap.to(themeToggle, {
        scale: 0.9,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
    })
})


// Mobile Menu Managment
const menuToggle = document.getElementById("menuToggle")
const mobileMenu = document.getElementById("mobileMenu")

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")

    // Pevent body scroll when menu is open
    if (mobileMenu.classList.contains("active")) {
        body.style.overflow = "hidden"
    } else {
        body.style.overflow = ""
    }
})


// loading Animation
function initLoader() {
    const loader = document.querySelector(".loader")
    const loaderText = document.querySelector(".loader-text")
    const LoaderProgress = document.querySelector(".loader-progress")

    //animation loader text
    gsap.to(loaderText,{
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
    })

    // animation progress bar
    gsap.to(LoaderProgress, {
        width: "100%",
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.7,
                onComplete: () => {
                    loader.style.display = "none"
                    initAnimations()  // ننفذ الأنيميشن الرئيسية بعد التحميل
                    initAboutAnimations() // ننفذ أنيميشن الاباوت أيضا
                }
            })
        }
    })
}

// initialize loader on page load
window.addEventListener("load", initLoader)


// Custom cursor ( only on desktop )
if (window.innerWidth > 768) {
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX - 10,
            y: e.clientY - 10,
            duration: 0.1,
        })

        gsap.to(cursorFollower, {
            x: e.clientX -20,
            y: e.clientY -20,
            duration: 0.2,
        })
    })
}


//initialize all animations
function initAnimations() {
    // Navigation animation
    gsap.to("nav", {
        y: 0,
        duration: 1,
        ease: "power3.out",
    });

    // Gallery images animation
    gsap.utils.toArray(".gallery-group").forEach(group => {
      const images = group.querySelectorAll("img")
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
          images.forEach(img => img.classList.add("gallery-animate"))
        }
      })
    })

    // Gallery groups animation بدون delay، زي مجموعات الصور
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
          "-=0.5" // تداخل أنيميشن العناصر مع العنوان
        );
      });

    // Contact Animation
const contactTl = gsap.timeline();
contactTl
    .to(".contact-title", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .to(".contact-subtitle", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "-=0.5") // يبدأ بعد نصف ثانية من الأنيميشن السابق
    .to(".contact-description", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "-=0.3") // يبدأ بعد 0.3 ثانية من الأنيميشن السابق
    .to(".contact-buttons", {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1,
        ease: "power3.out",
    }, "-=0.3"); // يبدأ بعد 0.3 ثانية من الأنيميشن السابق

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
      animateNumbers();  // تشغيل العدادات مع ظهور الـ Numbers container
    }
  }, "-=0.6");
}

// Numbers count-up animation function with ScrollTrigger
function animateNumbers() {
  const numbers = document.querySelectorAll(".number");

  numbers.forEach(number => {
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
