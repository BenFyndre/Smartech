document.addEventListener("DOMContentLoaded", function () {
    // === DARK MODE PREFERENCE ===
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }

            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
                if (event.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            });

            // === SECTION NAVIGATION ===

            window.showSection = function (sectionId) {
            // Only hide/show main-section divs
                document.querySelectorAll('.main-section').forEach(section => {
                    section.style.display = 'none';
                });
                const target = document.getElementById(sectionId);
                if (target) {
                    target.style.display = '';
                    // Re-render products if products section is shown
                    if (sectionId === 'products' && typeof renderProducts === 'function') {
                        renderProducts();
                    }
                }
            };

            // === MOBILE MENU TOGGLE ===
            const mobileMenuBtn = document.getElementById('mobile-menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');

            if (mobileMenuBtn && mobileMenu) {
                mobileMenuBtn.addEventListener('click', function () {
                    mobileMenu.classList.toggle('open');
                });

            }

            // === SMOOTH SCROLL FOR NAV LINKS ===

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        // Close the mobile menu if open
                        if (mobileMenu && mobileMenu.classList.contains('open')) {
                            mobileMenu.classList.remove('open');
                        }
                    }
                });
            });

            // === ANIMATIONS ON SCROLL ===
            const animateElements = document.querySelectorAll('.animate-on-scroll');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animateElements.forEach(element => {
                observer.observe(element);
            });

        
            // === AJAX CONTACT FORM SUBMISSION ===
            const contactForm = document.getElementById("contactForm");
            if (contactForm) {
                contactForm.addEventListener("submit", function (event) {
                    event.preventDefault();

                    const form = this;
                    const formData = new FormData(form);
                    const submitBtn = document.getElementById("submitBtn");
                    const formStatus = document.getElementById("formStatus");

                    submitBtn.disabled = true;
                    submitBtn.innerText = "Sending...";

                    fetch(form.action, {
                        method: "POST",
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                formStatus.innerHTML = "✅ Your message has been sent successfully!";
                                formStatus.className = "mb-4 p-4 rounded-lg bg-green-500 text-white font-medium";
                                formStatus.classList.remove("hidden");

                                form.reset();
                                submitBtn.disabled = false;
                                submitBtn.innerText = "Send Message";

                                setTimeout(() => {
                                    formStatus.classList.add("hidden");
                                }, 5000);
                            } else {
                                throw new Error("Form submission failed");
                            }
                        })
                        .catch(error => {
                            console.error("Error:", error);
                            formStatus.innerHTML = "❌ There was an error sending your message. Please try again later.";
                            formStatus.className = "mb-4 p-4 rounded-lg bg-red-500 text-white font-medium";
                            formStatus.classList.remove("hidden");

                            submitBtn.disabled = false;
                            submitBtn.innerText = "Send Message";
                        });
                });
            }
        });         