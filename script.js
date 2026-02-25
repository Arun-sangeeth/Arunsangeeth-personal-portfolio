document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // close mobile menu if opened
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Navbar Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlight
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href') === `#${current}`) {
                li.classList.add('active');
            }
        });
    });

    // Typing Effect Logic (Hero section)
    const typeContainer = document.getElementById('type-container');
    const textOriginal = "SOC Analyst Detecting Threats Before They Escalate_";
    const highlightTarget = "SOC Analyst";

    let i = 0;

    // Create the wrapper span with the typing blink effect
    const typingElement = document.createElement('span');
    typingElement.className = 'typing-text';
    typeContainer.appendChild(typingElement);

    const typeWriter = () => {
        if (i < textOriginal.length) {
            // Check if we are typing the 'SOC Analyst' part
            if (i < highlightTarget.length) {
                typingElement.innerHTML += `<span style="color: var(--text-main); font-weight: 700;">${textOriginal.charAt(i)}</span>`;
            } else {
                typingElement.innerHTML += textOriginal.charAt(i);
            }
            i++;
            setTimeout(typeWriter, Math.random() * 50 + 30); // Random typing speed between 30-80ms
        }
    };

    // Start typing after short delay
    setTimeout(typeWriter, 500);

    // Projects Toggle Logic
    const toggleProjectsBtn = document.getElementById('toggle-projects-btn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');

    if (toggleProjectsBtn && hiddenProjects.length > 0) {
        let isExpanded = false;

        toggleProjectsBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            hiddenProjects.forEach(project => {
                if (isExpanded) {
                    project.classList.add('show');
                } else {
                    project.classList.remove('show');
                }
            });

            if (isExpanded) {
                toggleProjectsBtn.innerHTML = 'Show Less <i class="fa-solid fa-chevron-up"></i>';
            } else {
                toggleProjectsBtn.innerHTML = 'More Projects <i class="fa-solid fa-chevron-down"></i>';

                // Optional: Scroll back up slightly to the projects section start
                const projectsSection = document.getElementById('projects');
                const yOffset = -70; // Header offset
                const y = projectsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }

    // Form submission to Google Forms
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('show');
        });

        // Close when clicking outside content
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('show');
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';
            submitBtn.style.pointerEvents = 'none';

            const formData = new FormData(contactForm);

            fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSfLbt3b9aiUPq7zt1_POw5qnTaqpSZdnKR_QfHDzgWnp-Y-9Q/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).then(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Packet Delivered';
                submitBtn.style.backgroundColor = 'var(--accent-green)';
                submitBtn.style.color = 'var(--bg-dark)';
                contactForm.reset();

                if (successModal) {
                    successModal.classList.add('show');
                }

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = 'transparent';
                    submitBtn.style.color = 'var(--accent-green)';
                    submitBtn.style.pointerEvents = 'auto';
                }, 3000);
            }).catch((error) => {
                console.error('Error submitting form', error);
                submitBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Transmission Failed';
                submitBtn.style.backgroundColor = '#ff4d4d';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = 'transparent';
                    submitBtn.style.pointerEvents = 'auto';
                }, 3000);
            });
        });
    }
});
