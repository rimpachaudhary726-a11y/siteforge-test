document.addEventListener('DOMContentLoaded', function() {
    // Smooth Scroll for navigation links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Form handling
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            try {
                let response = await fetch(form.action, {
                    method: form.method,
                    body: formData
                });
                if (!response.ok) throw new Error('Network response was not ok');
                alert('Form submitted successfully!');
            } catch (error) {
                alert('There was a problem with your submission: ' + error.message);
            }
        });
    }

    // Toggle menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Section entrance animations
    const sections = document.querySelectorAll('section');
    const options = {
        root: null,
        threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, options);
    sections.forEach(section => {
        observer.observe(section);
    });

    // Optional: Add a counter
    const counters = document.querySelectorAll('.counter');
    const countOptions = {
        root: null,
        threshold: 0.1,
    };

    const counterObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                let count = 0;
                const targetCount = parseInt(counter.getAttribute('data-count'));
                const interval = setInterval(() => {
                    count += Math.ceil(targetCount / 100);
                    if (count >= targetCount) {
                        count = targetCount;
                        clearInterval(interval);
                    }
                    counter.textContent = count;
                }, 50);
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(counterObserverCallback, countOptions);
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});