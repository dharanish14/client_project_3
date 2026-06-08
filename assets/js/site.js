(() => {
  const navData = [
    { label: 'Home', href: '/', key: 'home' },
    { label: 'About', href: '/about/', key: 'about' },
    {
      label: 'Programs',
      href: '/programs/',
      key: 'programs',
      dropdown: [
        { label: 'Youth Leadership Fellowship', href: '/programs/youth-leadership-fellowship/', key: 'youth-leadership-fellowship' },
        { label: 'Volunteer Saturdays', href: '/programs/volunteer-saturdays/', key: 'volunteer-saturdays' },
        { label: 'Business Documentation Campaign', href: '/programs/business-documentation/', key: 'business-documentation' },
        { label: 'Community Projects', href: '/programs/community-projects/', key: 'community-projects' },
      ],
    },
    { label: 'Impact', href: '/impact/', key: 'impact' },
    { label: 'Blog', href: '/blog/', key: 'blog' },
    { label: 'Gallery', href: '/gallery/', key: 'gallery' },
    { label: 'Join', href: '/join/', key: 'join' },
    { label: 'Contact', href: '/contact/', key: 'contact' },
  ];

  const footerLinks = [
    'Home', 'About', 'Programs', 'Impact', 'Blog', 'Gallery', 'Join', 'Contact'
  ];

  const iconMarkup = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;

  const formEndpoints = window.NUNP_FORM_ENDPOINTS || {};

  const sendViaEndpoint = async (endpoint, form) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }
  };

  const header = `
    <header class="site-header">
      <div class="container site-header-inner">
        <a class="brand" href="/" aria-label="NUNP home">
          <img class="brand-logo" src="/NUNP_Logo.png" alt="NUNP logo" data-logo>
          <span class="brand-copy">
            <span class="brand-wordmark">NUNP</span>
            <span class="brand-tagline">Connect · Share · Empower</span>
          </span>
        </a>

        <button class="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="primary-navigation">
          ${iconMarkup('menu')}
        </button>

        <div class="nav-shell" id="primary-navigation">
          <nav class="site-nav" aria-label="Primary">
            ${navData.map(item => item.dropdown ? `
              <div class="nav-dropdown" data-dropdown>
                <a class="nav-trigger" href="${item.href}" data-nav="${item.key}" data-dropdown-trigger>
                  ${item.label}
                  ${iconMarkup('chevron-down')}
                </a>
                <div class="nav-dropdown-menu" role="menu">
                  ${item.dropdown.map(sub => `<a href="${sub.href}" data-nav="${sub.key}">${sub.label}</a>`).join('')}
                </div>
              </div>
            ` : `<a class="nav-link" href="${item.href}" data-nav="${item.key}">${item.label}</a>`).join('')}
          </nav>
        </div>
      </div>
    </header>
  `;

  const footer = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="stack">
            <a class="brand" href="/" aria-label="NUNP home">
              <img class="brand-logo" src="/NUNP_Logo.png" alt="NUNP logo" data-logo>
              <span class="brand-copy">
                <span class="brand-wordmark">NUNP</span>
                <span class="brand-tagline">Connect · Share · Empower</span>
              </span>
            </a>
            <p>NUNP is a citizen-led movement building stronger neighbourhoods through service, collaboration, and responsible action.</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <ul class="footer-links">
              ${footerLinks.map(item => {
                const path = item === 'Home' ? '/' : `/${item.toLowerCase()}/`;
                return `<li><a href="${path}">${item}</a></li>`;
              }).join('')}
            </ul>
          </div>

          <div class="stack">
            <h4>Contact</h4>
            <ul class="footer-contact">
              <li><a href="mailto:nunp.chennai@gmail.com">nunp.chennai@gmail.com</a></li>
              <li><a href="https://www.nunp.org" target="_blank" rel="noreferrer">www.nunp.org</a></li>
            </ul>
            <div class="social-row" aria-label="Social media">
              <a class="social-icon" href="#" aria-label="Instagram placeholder"><span class="social-initial">IG</span></a>
              <a class="social-icon" href="#" aria-label="LinkedIn placeholder"><span class="social-initial">IN</span></a>
              <a class="social-icon" href="#" aria-label="YouTube placeholder"><span class="social-initial">YT</span></a>
              <a class="social-icon" href="#" aria-label="WhatsApp placeholder"><span class="social-initial">WA</span></a>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-inner">
            <span>© 2025 NUNP. All Rights Reserved.</span>
            <span>நம்ம ஊர். நம்ம பொறுப்பு. நம்ம செயல்.</span>
          </div>
        </div>
      </div>
    </footer>
  `;

  const injectCommonLayout = () => {
    const headerTarget = document.querySelector('[data-site-header]');
    const footerTarget = document.querySelector('[data-site-footer]');
    if (headerTarget) headerTarget.innerHTML = header;
    if (footerTarget) footerTarget.innerHTML = footer;
  };

  const setActiveNav = () => {
    const page = document.body.dataset.page || '';
    const programPages = new Set([
      'youth-leadership-fellowship',
      'volunteer-saturdays',
      'business-documentation',
      'community-projects',
    ]);
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const key = link.getAttribute('data-nav');
      const isActive = key === page || (page === 'programs' && key === 'programs');
      link.classList.toggle('is-active', isActive);
    });

    if (programPages.has(page) || page === 'volunteer') {
      document.querySelectorAll('[data-nav="programs"]').forEach((link) => link.classList.add('is-active'));
    }
  };

  const enhanceMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const shell = document.querySelector('.nav-shell');
    const dropdownTrigger = document.querySelector('[data-dropdown-trigger]');
    const dropdown = document.querySelector('[data-dropdown]');

    toggle?.addEventListener('click', () => {
      const open = shell.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      const icon = toggle.querySelector('[data-lucide]');
      if (icon) icon.setAttribute('data-lucide', open ? 'x' : 'menu');
      if (window.lucide) window.lucide.createIcons();
    });

    dropdownTrigger?.addEventListener('click', (event) => {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        dropdown?.classList.toggle('open');
      }
    });
  };

  const enhanceReveal = () => {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    items.forEach((item) => observer.observe(item));
  };

  const enhanceCounters = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const countUp = window.CountUp;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        if (target.dataset.countStarted === 'true') return;
        target.dataset.countStarted = 'true';
        const endValue = Number(target.dataset.counter || '0');
        if (countUp) {
          const instance = new countUp.CountUp(target, endValue, { duration: 2.1, separator: ',' });
          if (!instance.error) instance.start();
          else target.textContent = `${endValue.toLocaleString()}+`;
        } else {
          target.textContent = `${endValue.toLocaleString()}+`;
        }
        observer.unobserve(target);
      });
    }, { threshold: 0.35 });

    counters.forEach((counter) => observer.observe(counter));
  };

  const enhanceRoleSelector = () => {
    const cards = document.querySelectorAll('[data-role-card]');
    const output = document.querySelector('[data-role-output]');
    if (!cards.length || !output) return;

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        const role = card.dataset.roleCard;
        cards.forEach((item) => item.classList.toggle('selected', item === card));
        output.textContent = `You selected: ${role}`;
        const select = document.querySelector('[data-role-select]');
        if (select) select.value = role;
      });
    });
  };

  const enhanceFormMailto = () => {
    document.querySelectorAll('form[data-mailto]').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formKey = form.dataset.formKey || '';
        const endpoint = form.dataset.formEndpoint || formEndpoints[formKey] || '';

        if (endpoint) {
          sendViaEndpoint(endpoint, form)
            .then(() => {
              form.reset();
              window.alert('Thanks. Your message has been sent.');
            })
            .catch(() => {
              window.alert('The form endpoint is unavailable right now. Please try again or email nunp.chennai@gmail.com directly.');
            });
          return;
        }

        const recipient = form.dataset.mailto;
        const subject = encodeURIComponent(form.dataset.mailtoSubject || 'NUNP website enquiry');
        const formData = new FormData(form);
        const bodyLines = [];
        formData.forEach((value, key) => {
          bodyLines.push(`${key}: ${value}`);
        });
        const body = encodeURIComponent(bodyLines.join('\n'));
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
      });
    });
  };

  const fixBrokenLogos = () => {
    document.querySelectorAll('[data-logo]').forEach((img) => {
      img.addEventListener('error', () => {
        if (img.dataset.fallbackApplied === 'true') return;
        img.dataset.fallbackApplied = 'true';
        const fallback = document.createElement('div');
        fallback.className = 'brand-logo placeholder-logo';
        fallback.innerHTML = '<span>NUNP</span>';
        img.replaceWith(fallback);
      }, { once: true });
    });
  };

  const setCurrentYear = () => {
    document.querySelectorAll('[data-current-year]').forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  };

  const init = () => {
    injectCommonLayout();
    setActiveNav();
    enhanceMobileNav();
    enhanceReveal();
    enhanceCounters();
    enhanceRoleSelector();
    enhanceFormMailto();
    fixBrokenLogos();
    setCurrentYear();
    if (window.lucide) window.lucide.createIcons();
    if (window.AOS) window.AOS.init({ once: true, duration: 700, offset: 80 });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
