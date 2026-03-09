/* ============================================================
   Nirmal Chawla — Portfolio Website
   Interactive JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Navigation ----
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function toggleNav() {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    function closeNav() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleNav);
    navOverlay.addEventListener('click', closeNav);

    // Close nav when clicking a nav link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeNav);
    });


    // ---- Navbar Scroll Effect ----
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run on load


    // ---- Active Section Highlighting ----
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    function highlightNav() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === `#${id}`) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();


    // ---- Scroll-Triggered Animations ----
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ---- Insights Topic Filters ----
    const topicFilters = document.querySelectorAll('.topic-filter');
    const articleCards = document.querySelectorAll('.article-card');

    topicFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            // Update active filter
            topicFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            const topic = filter.dataset.topic;

            // Filter articles
            articleCards.forEach(card => {
                if (topic === 'all' || card.dataset.topic === topic) {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        });
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // ---- Copy Bio Button ----
    const copyBioBtn = document.getElementById('copyBio');
    if (copyBioBtn) {
        copyBioBtn.addEventListener('click', () => {
            const bioText = `Nirmal Chawla is an AI Strategist and Business Growth Consultant with 14+ years of experience across HP, Airtel, PwC, Cognizant, and Rajasthan Royals. An IIM Ahmedabad and Duke University alumnus, he specialises in helping organisations translate AI ambition into measurable business outcomes. His career spans four industries and ten countries, with a track record that includes launching India's first SMB Experience Centres at HP, managing $163Mn in capex at Airtel, identifying a $200Mn opportunity in cricket education, and leading Oracle Cloud transformations for Fortune 500 clients.`;

            navigator.clipboard.writeText(bioText).then(() => {
                const original = copyBioBtn.innerHTML;
                copyBioBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        `;
                setTimeout(() => {
                    copyBioBtn.innerHTML = original;
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = bioText;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);

                const original = copyBioBtn.innerHTML;
                copyBioBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Copied!
        `;
                setTimeout(() => {
                    copyBioBtn.innerHTML = original;
                }, 2000);
            });
        });
    }


    // ---- Form Validation & Handling ----
    function showFormSuccess(form, message) {
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = message;
        btn.style.background = '#059669';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
        }, 3000);
    }

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFormSuccess(newsletterForm, '✓ Subscribed!');
        });
    }

    // Speaking form
    const speakingForm = document.getElementById('speakingForm');
    if (speakingForm) {
        speakingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFormSuccess(speakingForm, '✓ Enquiry Sent!');
        });
    }

    // Connect form
    const connectForm = document.getElementById('connectForm');
    if (connectForm) {
        connectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showFormSuccess(connectForm, '✓ Message Sent!');
        });
    }


    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight;
                const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ---- Counter Animation for Stats ----
    const statValues = document.querySelectorAll('.stat-value');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent;

                // Extract numeric value
                const match = text.match(/(\$?)(\d+)(.*)/);
                if (match) {
                    const prefix = match[1];
                    const target = parseInt(match[2]);
                    const suffix = match[3];
                    let current = 0;
                    const duration = 1500;
                    const step = target / (duration / 16);

                    function animate() {
                        current += step;
                        if (current >= target) {
                            current = target;
                            el.innerHTML = `${prefix}${target}${suffix}`;
                        } else {
                            el.innerHTML = `${prefix}${Math.floor(current)}${suffix}`;
                            requestAnimationFrame(animate);
                        }
                    }

                    animate();
                }

                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(el => counterObserver.observe(el));

});
