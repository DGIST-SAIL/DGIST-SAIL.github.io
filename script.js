document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Link Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(li => {
            li.classList.remove('active');
            if (li.getAttribute('href').includes(current)) {
                li.classList.add('active');
            }
        });
    });

    // Recruitment Modal Logic
    const modal = document.getElementById('recruitModal');
    if (modal) {
        const closeModalBtn = document.getElementById('closeModal');
        const hideTodayCheckbox = document.getElementById('hideToday');
        
        // Check local storage for hidden state
        const hideModalDate = localStorage.getItem('hideRecruitModalDate');
        const today = new Date().toDateString();

        if (hideModalDate !== today) {
            // Show modal with a slight delay for better UX
            setTimeout(() => {
                modal.classList.add('active');
            }, 500);
        }

        // Close modal function
        const closeModal = () => {
            modal.classList.remove('active');
            if (hideTodayCheckbox.checked) {
                localStorage.setItem('hideRecruitModalDate', new Date().toDateString());
            }
        };

        // Event listeners
        closeModalBtn.addEventListener('click', closeModal);
        
        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});
